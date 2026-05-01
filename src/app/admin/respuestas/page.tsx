import Link from "next/link";
import { redirect } from "next/navigation";

import { DeleteResponseButton } from "@/components/admin/delete-response-button";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function formatBoolean(value: boolean | null) {
  if (value === null) {
    return "—";
  }

  return value ? "Sí" : "No";
}

function formatAttendance(value: string) {
  if (value === "yes") return "Sí";
  if (value === "no") return "No";
  return "Aún no";
}

function formatLocale(value: string) {
  return value === "en" ? "EN" : "ES";
}

export default async function AdminResponsesPage() {
  const context = await requireAdmin();

  if (!context.hasEnv) {
    redirect("/admin/login");
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("rsvp_responses")
    .select("*")
    .order("created_at", { ascending: false });

  const responses = data ?? [];
  const attendingCount = responses.filter(
    (response) => response.attendance === "yes",
  ).length;
  const pendingCount = responses.filter(
    (response) => response.attendance === "unsure",
  ).length;
  const accommodationCount = responses.filter(
    (response) => response.needs_accommodation,
  ).length;

  return (
    <main className="admin-shell">
      <section className="admin-card p-8 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label text-[color:var(--color-accent)]">Admin</p>
            <h1 className="section-title mt-4 font-serif text-[color:var(--color-foreground)]">
              Respuestas RSVP
            </h1>
            <p className="section-intro mt-4 max-w-3xl text-stone-700">
              Este panel es privado. Aquí pueden revisar confirmaciones, datos de
              contacto y necesidades logísticas antes de la boda.
            </p>
            {context.profile ? (
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="admin-pill">
                  Rol actual:{" "}
                  <strong className="text-[color:var(--color-wine)]">
                    {context.profile.role === "admin" ? "admin" : "collaborator"}
                  </strong>
                </span>
                <span className="admin-pill">
                  Permiso para eliminar:{" "}
                  <strong className="text-[color:var(--color-wine)]">
                    {context.canDeleteData ? "sí" : "no"}
                  </strong>
                </span>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              className="btn-action btn-action-soft btn-action-md"
              href="/admin/respuestas/nueva"
            >
              Nueva respuesta
            </Link>
            <Link
              className="btn-action btn-action-soft btn-action-md"
              href="/admin/respuestas/export"
            >
              Exportar CSV
            </Link>
            <Link
              className="btn-action btn-action-soft btn-action-md"
              href="/admin/cerrar-sesion"
            >
              Cerrar sesión
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="admin-metric">
            <p className="meta-label text-[color:var(--color-accent)]">Total</p>
            <p className="mt-3 font-serif text-[2.2rem] leading-none text-[color:var(--color-foreground)]">
              {responses.length}
            </p>
            <p className="mt-3 text-[1rem] text-stone-600">Respuestas registradas</p>
          </article>

          <article className="admin-metric">
            <p className="meta-label text-[color:var(--color-accent)]">Asistencia</p>
            <p className="mt-3 font-serif text-[2.2rem] leading-none text-[color:var(--color-foreground)]">
              {attendingCount}
            </p>
            <p className="mt-3 text-[1rem] text-stone-600">Invitados confirmados</p>
          </article>

          <article className="admin-metric">
            <p className="meta-label text-[color:var(--color-accent)]">Pendientes</p>
            <p className="mt-3 font-serif text-[2.2rem] leading-none text-[color:var(--color-foreground)]">
              {pendingCount}
            </p>
            <p className="mt-3 text-[1rem] text-stone-600">Aún por confirmar</p>
          </article>

          <article className="admin-metric">
            <p className="meta-label text-[color:var(--color-accent)]">Alojamiento</p>
            <p className="mt-3 font-serif text-[2.2rem] leading-none text-[color:var(--color-foreground)]">
              {accommodationCount}
            </p>
            <p className="mt-3 text-[1rem] text-stone-600">Solicitudes recibidas</p>
          </article>
        </div>
      </section>

      <section className="admin-card mt-10 overflow-hidden">
        <div className="border-b border-[color:var(--color-accent)]/12 bg-[#f6ece4]/70 px-6 py-5">
          <p className="subsection-title font-serif text-[color:var(--color-foreground)]">
            Lista de respuestas
          </p>
          <p className="mt-2 text-[1rem] text-stone-600">
            Consulta y administra cada confirmación desde una sola vista.
          </p>
        </div>

        {error ? (
          <div className="p-8">
            <p className="subsection-title font-serif text-rose-700">
              No pudimos cargar las respuestas
            </p>
            <p className="body-elegant mt-4 text-stone-700">
              Verifica la configuración de Supabase, las políticas RLS y que la
              tabla `rsvp_responses` exista.
            </p>
          </div>
        ) : responses.length > 0 ? (
          <div className="px-4 py-4 sm:px-6 sm:pb-6">
            <div className="grid gap-4 lg:hidden">
              {responses.map((response) => (
                <article
                  key={response.id}
                  className="admin-card-soft overflow-hidden p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[1.08rem] font-medium text-stone-900">
                        {response.full_name}
                      </p>
                      <p className="mt-1 text-[0.98rem] text-stone-600">
                        {response.email}
                      </p>
                    </div>
                    <span className="admin-status-pill">
                      {formatAttendance(response.attendance)}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="meta-label text-[color:var(--color-accent)]">
                        Fecha
                      </p>
                      <p className="mt-1 text-[1rem] leading-7 text-stone-700">
                        {new Date(response.created_at).toLocaleString("es-CO", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="meta-label text-[color:var(--color-accent)]">
                        Teléfono
                      </p>
                      <p className="mt-1 text-[1rem] leading-7 text-stone-700">
                        {response.phone_country_code} {response.phone_number}
                      </p>
                    </div>
                    <div>
                      <p className="meta-label text-[color:var(--color-accent)]">
                        Acompañante
                      </p>
                      <p className="mt-1 text-[1rem] leading-7 text-stone-700">
                        {formatBoolean(response.has_companion)}
                        {response.companion_name
                          ? ` · ${response.companion_name}`
                          : ""}
                      </p>
                    </div>
                    <div>
                      <p className="meta-label text-[color:var(--color-accent)]">
                        Viaje y alojamiento
                      </p>
                      <p className="mt-1 text-[1rem] leading-7 text-stone-700">
                        Viaja: {formatBoolean(response.travel_from_outside)} ·
                        Alojamiento: {formatBoolean(response.needs_accommodation)}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="meta-label text-[color:var(--color-accent)]">
                        Restricciones
                      </p>
                      <p className="mt-1 text-[1rem] leading-7 text-stone-700">
                        {response.dietary_restrictions || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="meta-label text-[color:var(--color-accent)]">
                        Idioma
                      </p>
                      <p className="mt-1 text-[1rem] leading-7 text-stone-700">
                        {formatLocale(response.locale)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      className="btn-action btn-action-soft btn-action-md"
                      href={`/admin/respuestas/${response.id}/editar`}
                    >
                      Editar
                    </Link>
                    {context.canDeleteData ? (
                      <DeleteResponseButton responseId={response.id} />
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="min-w-[1760px] table-auto border-separate border-spacing-0">
                <colgroup>
                  <col className="w-[170px]" />
                  <col className="w-[220px]" />
                  <col className="w-[260px]" />
                  <col className="w-[170px]" />
                  <col className="w-[140px]" />
                  <col className="w-[130px]" />
                  <col className="w-[220px]" />
                  <col className="w-[150px]" />
                  <col className="w-[150px]" />
                  <col className="w-[290px]" />
                  <col className="w-[100px]" />
                  <col className="w-[180px]" />
                </colgroup>
                <thead className="bg-[#f5ebe2]">
                  <tr>
                    {[
                      "Fecha",
                      "Nombre",
                      "Correo",
                      "Teléfono",
                      "Asistencia",
                      "Acompañante",
                      "Nombre acompañante",
                      "Viaja desde fuera",
                      "Alojamiento",
                      "Restricciones",
                      "Idioma",
                      "Acciones",
                    ].map((label, index) => (
                      <th
                        key={label}
                        className={`admin-table-head border-b border-r border-[color:var(--color-accent)]/12 bg-[#f5ebe2] ${
                          index === 0 ? "rounded-tl-[1rem]" : ""
                        } ${
                          index === 11 ? "rounded-tr-[1rem]" : ""
                        }`}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {responses.map((response, index) => (
                    <tr
                      key={response.id}
                      className={`${
                        index % 2 === 0 ? "bg-white/72" : "bg-[#fcf7f1]/75"
                      }`}
                    >
                      <td className="admin-table-cell border-b border-r border-[color:var(--color-accent)]/10 leading-7">
                        {new Date(response.created_at).toLocaleString("es-CO", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="admin-table-cell border-b border-r border-[color:var(--color-accent)]/10 font-medium text-stone-900">
                        <div className="max-w-[210px] whitespace-normal leading-7">
                          {response.full_name}
                        </div>
                      </td>
                      <td className="admin-table-cell border-b border-r border-[color:var(--color-accent)]/10">
                        <div className="max-w-[250px] whitespace-normal break-words leading-7">
                          {response.email}
                        </div>
                      </td>
                      <td className="admin-table-cell border-b border-r border-[color:var(--color-accent)]/10 leading-7">
                        {response.phone_country_code} {response.phone_number}
                      </td>
                      <td className="admin-table-cell border-b border-r border-[color:var(--color-accent)]/10">
                        <span className="admin-status-pill">
                          {formatAttendance(response.attendance)}
                        </span>
                      </td>
                      <td className="admin-table-cell border-b border-r border-[color:var(--color-accent)]/10 leading-7">
                        {formatBoolean(response.has_companion)}
                      </td>
                      <td className="admin-table-cell border-b border-r border-[color:var(--color-accent)]/10">
                        <div className="max-w-[210px] whitespace-normal leading-7">
                          {response.companion_name || "—"}
                        </div>
                      </td>
                      <td className="admin-table-cell border-b border-r border-[color:var(--color-accent)]/10 leading-7">
                        {formatBoolean(response.travel_from_outside)}
                      </td>
                      <td className="admin-table-cell border-b border-r border-[color:var(--color-accent)]/10 leading-7">
                        {formatBoolean(response.needs_accommodation)}
                      </td>
                      <td className="admin-table-cell border-b border-r border-[color:var(--color-accent)]/10">
                        <div className="max-w-[280px] whitespace-normal leading-7 text-stone-700">
                          {response.dietary_restrictions || "—"}
                        </div>
                      </td>
                      <td className="admin-table-cell border-b border-r border-[color:var(--color-accent)]/10 uppercase leading-7">
                        {formatLocale(response.locale)}
                      </td>
                      <td className="admin-table-cell border-b border-[color:var(--color-accent)]/10">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            className="btn-action btn-action-soft btn-action-md"
                            href={`/admin/respuestas/${response.id}/editar`}
                          >
                            Editar
                          </Link>
                          {context.canDeleteData ? (
                            <DeleteResponseButton responseId={response.id} />
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="admin-empty-state">
            <p className="subsection-title font-serif text-[color:var(--color-foreground)]">
              Aún no hay respuestas
            </p>
            <p className="body-elegant mt-4 max-w-2xl text-stone-700">
              Cuando las personas empiecen a confirmar su asistencia, sus
              respuestas aparecerán aquí junto con sus datos logísticos.
            </p>
            <div className="mt-6">
              <Link
                className="btn-action btn-action-soft btn-action-md"
                href="/admin/respuestas/nueva"
              >
                Crear primera respuesta
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
