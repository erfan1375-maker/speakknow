import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { countUnreadChatMessages } from "@/lib/chat/messages";
import { Logo } from "@/components/logo";
import { LogoutButton } from "@/components/admin/logout-button";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const chatUnreadCount = countUnreadChatMessages();

  return (
    <div className="min-h-screen flex-1 bg-brand-50/30">
      <header className="border-b border-hairline bg-white">
        <div className="shell flex h-20 flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-600">
              پنل مدیریت
            </span>
          </div>
          <AdminNav chatUnreadCount={chatUnreadCount} />
          <LogoutButton />
        </div>
      </header>
      <main className="shell py-10">{children}</main>
    </div>
  );
}
