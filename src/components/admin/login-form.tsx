"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type LoginFormProps = {
  disabled?: boolean;
  errorCode?: string;
};

function getErrorMessage(errorCode?: string) {
  switch (errorCode) {
    case "invalid":
      return "No pudimos iniciar sesión con esos datos. Verifica el correo y la contraseña.";
    case "no-admin":
      return "Tu cuenta no tiene permisos para entrar al panel administrativo. Debe tener rol admin o collaborator.";
    default:
      return "";
  }
}

export function LoginForm({ disabled = false, errorCode }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(getErrorMessage(errorCode));
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (disabled) {
      setErrorMessage(
        "Primero debes configurar las variables de entorno de Supabase.",
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(
          "No pudimos iniciar sesión con esos datos. Verifica el correo y la contraseña.",
        );
        setIsSubmitting(false);
        return;
      }

      router.push("/admin/respuestas");
      router.refresh();
    } catch {
      setErrorMessage(
        "No fue posible iniciar sesión en este momento. Inténtalo nuevamente.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
      <label className="grid gap-2">
        <span className="form-label text-stone-700">Correo electrónico</span>
        <input
          autoComplete="email"
          className="input-field"
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          value={email}
        />
      </label>

      <label className="grid gap-2">
        <span className="form-label text-stone-700">Contraseña</span>
        <input
          autoComplete="current-password"
          className="input-field"
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
      </label>

      {errorMessage ? (
        <p className="text-[1rem] leading-7 text-rose-700">{errorMessage}</p>
      ) : null}

      <button
        className="btn-action btn-action-soft btn-action-lg justify-self-start"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Ingresando..." : "Entrar al panel"}
      </button>
    </form>
  );
}
