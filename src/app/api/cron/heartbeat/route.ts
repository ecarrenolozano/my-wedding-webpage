import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  const expectedSecret = process.env.CRON_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { error: "El cron heartbeat no está configurado." },
      { status: 503 },
    );
  }

  if (authorization !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "El backend de Supabase no está configurado." },
      { status: 503 },
    );
  }

  const supabase = createSupabaseAdminClient();
  const today = new Date().toISOString().slice(0, 10);
  const now = new Date().toISOString();

  const { error } = await supabase.from("project_heartbeat").upsert(
    {
      day: today,
      source: "github-actions",
      last_seen_at: now,
    },
    { onConflict: "day" },
  );

  if (error) {
    return NextResponse.json(
      { error: "No pudimos registrar el heartbeat." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    day: today,
    source: "github-actions",
    lastSeenAt: now,
  });
}
