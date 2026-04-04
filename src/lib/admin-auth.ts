import { redirect } from "next/navigation";

import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { AdminRole } from "@/types/supabase";

import { createSupabaseServerClient } from "./supabase/server";

function normalizeRole(role: unknown): AdminRole | null {
  if (typeof role !== "string") {
    return null;
  }

  const normalizedRole = role.trim().toLowerCase();

  if (normalizedRole === "admin" || normalizedRole === "collaborator") {
    return normalizedRole;
  }

  return null;
}

export async function getAdminContext() {
  if (!hasSupabaseEnv()) {
    return {
      hasEnv: false,
      canAccessAdmin: false,
      canDeleteData: false,
      profile: null,
      user: null,
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      hasEnv: true,
      canAccessAdmin: false,
      canDeleteData: false,
      profile: null,
      user: null,
    };
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id, display_name, email, role")
    .eq("id", user.id)
    .maybeSingle();

  const normalizedRole = normalizeRole(profile?.role);
  const canAccessAdmin = Boolean(profile && normalizedRole);
  const canDeleteData = normalizedRole === "admin";

  return {
    hasEnv: true,
    canAccessAdmin,
    canDeleteData,
    profile: profile
      ? {
          ...profile,
          role: normalizedRole ?? profile.role,
        }
      : null,
    user,
  };
}

export async function requireAdmin() {
  const context = await getAdminContext();

  if (!context.hasEnv) {
    return context;
  }

  if (!context.user) {
    redirect("/admin/login");
  }

  if (!context.canAccessAdmin) {
    redirect("/admin/login?error=no-admin");
  }

  return context;
}
