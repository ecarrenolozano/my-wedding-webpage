import Link from "next/link";

import { LoginForm } from "@/components/admin/login-form";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const envReady = hasSupabaseEnv();

  return (
    <main className="admin-shell flex items-center">
      <section className="admin-card mx-auto w-full max-w-5xl overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-[color:var(--color-accent)]/10 p-8 sm:p-10 lg:border-b-0 lg:border-r">
            <p className="section-label text-[color:var(--color-accent)]">Admin</p>
            <h1 className="section-title mt-4 font-serif text-[color:var(--color-foreground)]">
              Panel de respuestas
            </h1>
            <p className="section-intro mt-6 max-w-2xl text-stone-700">
              Este acceso es privado para ustedes y su wedding planner. Desde
              aquí podrán revisar confirmaciones, editar datos, exportar la
              lista y mantener toda la logística en un solo lugar.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="admin-card-soft p-5">
                <p className="meta-label text-[color:var(--color-accent)]">Acceso</p>
                <p className="mt-3 text-[1.04rem] leading-7 text-stone-700">
                  Ingreso privado con cuentas autorizadas.
                </p>
              </article>
              <article className="admin-card-soft p-5">
                <p className="meta-label text-[color:var(--color-accent)]">Roles</p>
                <p className="mt-3 text-[1.04rem] leading-7 text-stone-700">
                  Admin puede eliminar. Collaborator puede consultar y editar.
                </p>
              </article>
            </div>

            {!envReady ? (
              <div className="admin-card-soft mt-8 p-6 text-stone-700">
                <p className="subsection-title font-serif text-[color:var(--color-foreground)]">
                  Falta configurar Supabase
                </p>
                <p className="body-elegant mt-4">
                  Antes de iniciar sesión, agrega las variables de entorno en tu
                  despliegue y en tu archivo local `.env.local`.
                </p>
                <p className="body-elegant mt-4">
                  Necesitarás: `NEXT_PUBLIC_SUPABASE_URL`,
                  `NEXT_PUBLIC_SUPABASE_ANON_KEY` y
                  `SUPABASE_SERVICE_ROLE_KEY`.
                </p>
              </div>
            ) : null}
          </div>

          <div className="p-8 sm:p-10">
            <p className="meta-label text-[color:var(--color-accent)]">
              Iniciar sesión
            </p>
            <LoginForm disabled={!envReady} errorCode={params?.error} />

            <div className="mt-8 border-t border-[color:var(--color-accent)]/10 pt-6">
              <Link className="body-elegant text-[color:var(--color-accent)]" href="/">
                Volver al sitio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
