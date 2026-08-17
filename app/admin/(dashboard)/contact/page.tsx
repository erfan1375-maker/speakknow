import type { Metadata } from "next";
import { listContactRequests } from "@/lib/contact/requests";
import { contactGoalLabel } from "@/lib/site";
import { parseSqliteDatetime } from "@/lib/exam/otp";

export const metadata: Metadata = {
  title: "درخواست‌های تماس",
  robots: { index: false, follow: false },
};

function formatDate(sqlDate: string) {
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(
    parseSqliteDatetime(sqlDate),
  );
}

export default function AdminContactPage() {
  const requests = listContactRequests();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">درخواست‌های تماس</h1>
      <p className="mt-1 text-sm text-ink-muted">{requests.length} درخواست</p>

      <div className="mt-6 overflow-x-auto rounded-card border border-hairline bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-hairline text-ink-muted">
              <th className="px-4 py-3 text-right font-medium">نام</th>
              <th className="px-4 py-3 text-right font-medium">شماره</th>
              <th className="px-4 py-3 text-right font-medium">ایمیل</th>
              <th className="px-4 py-3 text-right font-medium">هدف</th>
              <th className="px-4 py-3 text-right font-medium">تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-hairline last:border-0 hover:bg-brand-50/40">
                <td className="px-4 py-3 font-medium text-ink">{r.fullName}</td>
                <td className="en px-4 py-3 text-ink-muted">{r.phone}</td>
                <td className="en px-4 py-3 text-ink-muted">{r.email ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-600">
                    {contactGoalLabel(r.goal)}
                  </span>
                </td>
                <td className="en px-4 py-3 text-ink-faint">{formatDate(r.createdAt)}</td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-faint">
                  درخواستی ثبت نشده
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
