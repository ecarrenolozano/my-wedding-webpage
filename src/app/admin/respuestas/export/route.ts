import { NextResponse } from "next/server";

import { getAdminContext } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function escapeCsvValue(value: string | null) {
  const safeValue = value ?? "";
  return `"${safeValue.replace(/"/g, '""')}"`;
}

export async function GET() {
  const context = await getAdminContext();

  if (!context.hasEnv) {
    return NextResponse.json(
      { error: "Supabase no está configurado." },
      { status: 503 },
    );
  }

  if (!context.user || !context.canAccessAdmin) {
    return NextResponse.json(
      { error: "No autorizado." },
      { status: 401 },
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("rsvp_responses")
    .select(
      "created_at, full_name, email, phone_country_code, phone_country_name, phone_number, attendance, has_companion, companion_name, travel_from_outside, needs_accommodation, dietary_restrictions, locale",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "No fue posible exportar las respuestas." },
      { status: 500 },
    );
  }

  const header = [
    "fecha",
    "nombre_completo",
    "correo",
    "codigo_pais",
    "pais_telefono",
    "telefono",
    "asistencia",
    "acompanante",
    "nombre_acompanante",
    "viaja_desde_fuera",
    "requiere_alojamiento",
    "restricciones_alimentarias",
    "idioma",
  ];

  const rows = (data ?? []).map((row) =>
    [
      row.created_at,
      row.full_name,
      row.email,
      row.phone_country_code,
      row.phone_country_name,
      row.phone_number,
      row.attendance,
      row.has_companion === null ? "" : row.has_companion ? "sí" : "no",
      row.companion_name ?? "",
      row.travel_from_outside ? "sí" : "no",
      row.needs_accommodation ? "sí" : "no",
      row.dietary_restrictions ?? "",
      row.locale,
    ]
      .map((value) => escapeCsvValue(String(value)))
      .join(","),
  );

  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="respuestas-rsvp.csv"',
    },
  });
}
