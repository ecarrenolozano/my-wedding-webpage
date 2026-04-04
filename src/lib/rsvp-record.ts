import type { RsvpSubmission } from "@/types/rsvp";

export function isBinaryChoice(value: unknown): value is "yes" | "no" {
  return value === "yes" || value === "no";
}

export function isAttendance(value: unknown): value is "yes" | "no" | "unsure" {
  return value === "yes" || value === "no" || value === "unsure";
}

export function validateRsvpSubmission(payload: Partial<RsvpSubmission>) {
  if (!payload.guestName?.trim()) return "Nombre inválido";
  if (!payload.email?.trim()) return "Correo inválido";
  if (!payload.phone?.trim()) return "Teléfono inválido";
  if (!isAttendance(payload.attendance)) return "Asistencia inválida";
  if (!isBinaryChoice(payload.travelFromOutside)) return "Viaje inválido";
  if (!isBinaryChoice(payload.needsAccommodation)) {
    return "Alojamiento inválido";
  }
  if (payload.attendance === "yes" && payload.hasCompanion === null) {
    return "Falta definir acompañante";
  }
  if (
    payload.attendance === "yes" &&
    payload.hasCompanion === "yes" &&
    !payload.companionName?.trim()
  ) {
    return "Falta nombre de acompañante";
  }

  return "";
}

export function mapSubmissionToRow(payload: RsvpSubmission) {
  return {
    attendance: payload.attendance,
    companion_name:
      payload.attendance === "yes" && payload.hasCompanion === "yes"
        ? payload.companionName.trim()
        : null,
    dietary_restrictions: payload.dietaryRestrictions?.trim() || null,
    email: payload.email.trim(),
    full_name: payload.guestName.trim(),
    has_companion:
      payload.attendance === "yes" ? payload.hasCompanion === "yes" : null,
    locale: payload.locale ?? "es",
    needs_accommodation: payload.needsAccommodation === "yes",
    phone_country_code: payload.phoneCountryCode.trim(),
    phone_country_name: payload.phoneCountryName.trim(),
    phone_number: payload.phone.trim(),
    travel_from_outside: payload.travelFromOutside === "yes",
  };
}
