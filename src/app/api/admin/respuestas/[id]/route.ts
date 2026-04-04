import { NextResponse } from "next/server";

import { getAdminContext } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { mapSubmissionToRow, validateRsvpSubmission } from "@/lib/rsvp-record";
import type { RsvpSubmission } from "@/types/rsvp";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteProps) {
  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Supabase no está configurado." },
      { status: 503 },
    );
  }

  const context = await getAdminContext();

  if (!context.user || !context.canAccessAdmin) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const payload = (await request.json()) as Partial<RsvpSubmission>;
  const validationError = validateRsvpSubmission(payload);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { id } = await params;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("rsvp_responses")
    .update(mapSubmissionToRow(payload as RsvpSubmission))
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "No fue posible actualizar la respuesta." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Supabase no está configurado." },
      { status: 503 },
    );
  }

  const context = await getAdminContext();

  if (!context.user || !context.canDeleteData) {
    return NextResponse.json(
      { error: "Solo los administradores pueden eliminar respuestas." },
      { status: 403 },
    );
  }

  const { id } = await params;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("rsvp_responses").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "No fue posible eliminar la respuesta." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
