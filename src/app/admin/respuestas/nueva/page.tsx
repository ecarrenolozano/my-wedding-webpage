import Link from "next/link";
import { redirect } from "next/navigation";

import { ResponseForm } from "@/components/admin/response-form";
import { requireAdmin } from "@/lib/admin-auth";
import type { RsvpSubmission } from "@/types/rsvp";

const initialValues: RsvpSubmission = {
  guestName: "",
  email: "",
  phoneCountryName: "Colombia",
  phoneCountryCode: "+57",
  phone: "",
  attendance: "yes",
  hasCompanion: null,
  companionName: "",
  travelFromOutside: "no",
  needsAccommodation: "no",
  dietaryRestrictions: "",
  locale: "es",
};

export default async function AdminNewResponsePage() {
  const context = await requireAdmin();

  if (!context.hasEnv) {
    redirect("/admin/login");
  }

  return (
    <main className="admin-shell max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-label text-[color:var(--color-accent)]">Admin</p>
          <h1 className="section-title mt-4 font-serif text-[color:var(--color-foreground)]">
            Nueva respuesta
          </h1>
          <p className="section-intro mt-4 max-w-3xl text-stone-700">
            Usa este formulario para registrar respuestas recibidas por teléfono,
            WhatsApp o cualquier otro medio.
          </p>
        </div>

        <Link className="btn-action btn-action-soft btn-action-md" href="/admin/respuestas">
          Volver a respuestas
        </Link>
      </div>

      <section className="admin-card mt-10 p-8 sm:p-10">
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <article className="admin-card-soft p-5">
            <p className="meta-label text-[color:var(--color-accent)]">Modo</p>
            <p className="mt-3 text-[1.04rem] leading-7 text-stone-700">
              Registro manual de respuestas recibidas por otros canales.
            </p>
          </article>
          <article className="admin-card-soft p-5">
            <p className="meta-label text-[color:var(--color-accent)]">Consejo</p>
            <p className="mt-3 text-[1.04rem] leading-7 text-stone-700">
              Verifica bien el correo y el teléfono antes de guardar.
            </p>
          </article>
        </div>
        <ResponseForm initialValues={initialValues} mode="create" />
      </section>
    </main>
  );
}
