"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { RsvpSubmission } from "@/types/rsvp";

type ResponseFormProps = {
  initialValues: RsvpSubmission;
  mode: "create" | "edit";
  responseId?: string;
};

const phoneCountryOptions = [
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+1", country: "Canada", flag: "🇨🇦" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+51", country: "Peru", flag: "🇵🇪" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
].sort((left, right) => left.country.localeCompare(right.country));

export function ResponseForm({
  initialValues,
  mode,
  responseId,
}: ResponseFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<RsvpSubmission>(initialValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCountry = useMemo(
    () =>
      phoneCountryOptions.find(
        (option) =>
          option.country === formState.phoneCountryName &&
          option.code === formState.phoneCountryCode,
      ) ?? phoneCountryOptions[0],
    [formState.phoneCountryCode, formState.phoneCountryName],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const url =
      mode === "create"
        ? "/api/admin/respuestas"
        : `/api/admin/respuestas/${responseId}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setErrorMessage(
          payload?.error ||
            "No fue posible guardar los cambios. Inténtalo nuevamente.",
        );
        setIsSubmitting(false);
        return;
      }

      router.push("/admin/respuestas");
      router.refresh();
    } catch {
      setErrorMessage(
        "No fue posible guardar los cambios. Inténtalo nuevamente.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-6 admin-grid" onSubmit={handleSubmit}>
      <section className="admin-fieldset">
        <h2 className="admin-fieldset-title">Datos personales</h2>
        <p className="admin-fieldset-copy">
          Información principal para identificar y contactar al invitado.
        </p>

        <div className="mt-6 grid gap-5">
          <label className="grid gap-2">
            <span className="form-label text-stone-700">Nombre completo</span>
            <input
              className="input-field"
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  guestName: event.target.value,
                }))
              }
              type="text"
              value={formState.guestName}
            />
          </label>

          <label className="grid gap-2">
            <span className="form-label text-stone-700">Correo electrónico</span>
            <input
              className="input-field"
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              type="email"
              value={formState.email}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-[minmax(0,260px)_1fr]">
            <label className="grid gap-2">
              <span className="form-label text-stone-700">Código país</span>
              <select
                className="input-field"
                onChange={(event) => {
                  const option = phoneCountryOptions.find(
                    (item) => `${item.country}|${item.code}` === event.target.value,
                  );

                  if (!option) return;

                  setFormState((current) => ({
                    ...current,
                    phoneCountryCode: option.code,
                    phoneCountryName: option.country,
                  }));
                }}
                value={`${selectedCountry.country}|${selectedCountry.code}`}
              >
                {phoneCountryOptions.map((option) => (
                  <option
                    key={`${option.country}-${option.code}`}
                    value={`${option.country}|${option.code}`}
                  >
                    {option.flag} {option.country} ({option.code})
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="form-label text-stone-700">Número telefónico</span>
              <input
                className="input-field"
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                type="tel"
                value={formState.phone}
              />
            </label>
          </div>
        </div>
      </section>

      <section className="admin-fieldset">
        <h2 className="admin-fieldset-title">Asistencia</h2>
        <p className="admin-fieldset-copy">
          Estado de confirmación y datos del acompañante, si aplica.
        </p>

        <div className="mt-6 grid gap-5">
          <label className="grid gap-2">
            <span className="form-label text-stone-700">Asistencia</span>
            <select
              className="input-field"
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  attendance: event.target.value as RsvpSubmission["attendance"],
                  hasCompanion:
                    event.target.value === "yes" ? current.hasCompanion : null,
                  companionName:
                    event.target.value === "yes" ? current.companionName : "",
                }))
              }
              value={formState.attendance}
            >
              <option value="yes">Sí</option>
              <option value="no">No</option>
              <option value="unsure">Aún no estoy seguro</option>
            </select>
          </label>

          {formState.attendance === "yes" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="form-label text-stone-700">
                  ¿Vendrá con acompañante?
                </span>
                <select
                  className="input-field"
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      hasCompanion: event.target.value as "yes" | "no",
                      companionName:
                        event.target.value === "yes" ? current.companionName : "",
                    }))
                  }
                  value={formState.hasCompanion ?? ""}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="yes">Sí</option>
                  <option value="no">No</option>
                </select>
              </label>

              {formState.hasCompanion === "yes" ? (
                <label className="grid gap-2">
                  <span className="form-label text-stone-700">
                    Nombre de acompañante
                  </span>
                  <input
                    className="input-field"
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        companionName: event.target.value,
                      }))
                    }
                    type="text"
                    value={formState.companionName}
                  />
                </label>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className="admin-fieldset">
        <h2 className="admin-fieldset-title">Logística</h2>
        <p className="admin-fieldset-copy">
          Datos útiles para acompañamiento, alojamiento y alimentación.
        </p>

        <div className="mt-6 grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="form-label text-stone-700">
                ¿Viaja desde otra ciudad o país?
              </span>
              <select
                className="input-field"
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    travelFromOutside: event.target.value as "yes" | "no",
                  }))
                }
                value={formState.travelFromOutside}
              >
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="form-label text-stone-700">
                ¿Solicita información de alojamiento?
              </span>
              <select
                className="input-field"
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    needsAccommodation: event.target.value as "yes" | "no",
                  }))
                }
                value={formState.needsAccommodation}
              >
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2">
            <span className="form-label text-stone-700">
              Restricciones alimentarias
            </span>
            <textarea
              className="input-field min-h-28 resize-y"
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  dietaryRestrictions: event.target.value,
                }))
              }
              value={formState.dietaryRestrictions}
            />
          </label>

          <label className="grid gap-2">
            <span className="form-label text-stone-700">Idioma de la respuesta</span>
            <select
              className="input-field"
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  locale: event.target.value as "es" | "en",
                }))
              }
              value={formState.locale}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>
      </section>

      {errorMessage ? (
        <p className="rounded-[1.2rem] border border-rose-200 bg-rose-50 px-4 py-3 text-[1rem] leading-7 text-rose-700">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          className="btn-action btn-action-soft btn-action-lg"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting
            ? "Guardando..."
            : mode === "create"
              ? "Crear respuesta"
              : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
