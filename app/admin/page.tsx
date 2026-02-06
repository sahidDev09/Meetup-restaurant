import { redirect } from "next/navigation";

export default function AdminPage() {
  // Redirect to dashboard, which will handle auth check
  redirect("/admin/dashboard");
}
