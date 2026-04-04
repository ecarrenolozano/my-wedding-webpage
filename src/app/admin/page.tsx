import { redirect } from "next/navigation";

import { getAdminContext } from "@/lib/admin-auth";

export default async function AdminIndexPage() {
  const context = await getAdminContext();

  if (!context.hasEnv) {
    redirect("/admin/login");
  }

  if (context.canAccessAdmin) {
    redirect("/admin/respuestas");
  }

  redirect("/admin/login");
}
