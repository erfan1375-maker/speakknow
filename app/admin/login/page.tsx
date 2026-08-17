import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { AdminLoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "ورود به پنل مدیریت",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-gradient-to-b from-brand-50 to-white px-4">
      <div className="w-full max-w-sm rounded-card border border-hairline bg-white p-8 shadow-[0_20px_45px_-30px_rgba(13,13,13,0.4)]">
        <Logo />
        <h1 className="mt-6 text-xl font-bold text-ink">ورود به پنل مدیریت</h1>
        <p className="mt-1 text-sm text-ink-muted">
          فقط برای مدیران سایت — نام کاربری و رمز عبور خود را وارد کنید.
        </p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
