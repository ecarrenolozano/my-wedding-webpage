import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { mapSubmissionToRow, validateRsvpSubmission } from "@/lib/rsvp-record";
import type { RsvpSubmission } from "@/types/rsvp";

export async function POST(request: Request) {
  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "El backend de RSVP aún no está configurado." },
      { status: 503 },
    );
  }

  const payload = (await request.json()) as Partial<RsvpSubmission>;
  const validationError = validateRsvpSubmission(payload);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("rsvp_responses")
    .insert(mapSubmissionToRow(payload as RsvpSubmission));

  if (error) {
    return NextResponse.json(
      { error: "No pudimos guardar la respuesta." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
