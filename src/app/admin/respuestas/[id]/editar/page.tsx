import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ResponseForm } from "@/components/admin/response-form";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { RsvpSubmission } from "@/types/rsvp";

type EditResponsePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditResponsePage({ params }: EditResponsePageProps) {
  const context = await requireAdmin();

  if (!context.hasEnv) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("rsvp_responses")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  const initialValues: RsvpSubmission = {
    guestName: data.full_name,
    email: data.email,
    phoneCountryName: data.phone_country_name,
    phoneCountryCode: data.phone_country_code,
    phone: data.phone_number,
    attendance: data.attendance as RsvpSubmission["attendance"],
    hasCompanion:
      data.has_companion === null ? null : data.has_companion ? "yes" : "no",
    companionName: data.companion_name || "",
    travelFromOutside: data.travel_from_outside ? "yes" : "no",
    needsAccommodation: data.needs_accommodation ? "yes" : "no",
    dietaryRestrictions: data.dietary_restrictions || "",
    locale: data.locale === "en" ? "en" : "es",
  };

  return (
    <main className="admin-shell max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-label text-[color:var(--color-accent)]">Admin</p>
          <h1 className="section-title mt-4 font-serif text-[color:var(--color-foreground)]">
            Editar respuesta
          </h1>
          <p className="section-intro mt-4 max-w-3xl text-stone-700">
            Ajusta los datos de esta respuesta y guarda los cambios cuando todo
            esté correcto.
          </p>
        </div>

        <Link className="btn-action btn-action-soft btn-action-md" href="/admin/respuestas">
          Volver a respuestas
        </Link>
      </div>

      <section className="admin-card mt-10 p-8 sm:p-10">
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <article className="admin-card-soft p-5">
            <p className="meta-label text-[color:var(--color-accent)]">Edición</p>
            <p className="mt-3 text-[1.04rem] leading-7 text-stone-700">
              Ajusta la información y conserva el registro actualizado.
            </p>
          </article>
          <article className="admin-card-soft p-5">
            <p className="meta-label text-[color:var(--color-accent)]">Cuidado</p>
            <p className="mt-3 text-[1.04rem] leading-7 text-stone-700">
              Si cambias la asistencia o el acompañante, revisa que el resto de
              campos siga siendo coherente.
            </p>
          </article>
        </div>
        <ResponseForm initialValues={initialValues} mode="edit" responseId={id} />
      </section>
    </main>
  );
}
