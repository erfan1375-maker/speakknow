import type { Metadata } from "next";
import Link from "next/link";
import { listExamResults, LEVELS } from "@/lib/admin/results";
import { parseSqliteDatetime } from "@/lib/exam/otp";

export const metadata: Metadata = {
  title: "نتایج آزمون‌ها",
  robots: { index: false, follow: false },
};

const LEVEL_NAME: Record<string, string> = {
  A1: "مبتدی",
  A2: "پایه",
  B1: "متوسط",
  B2: "بالا متوسط",
  C1: "پیشرفته",
  C2: "پیشرفته حرفه‌ای",
};

function formatDate(sqlDate: string) {
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(
    parseSqliteDatetime(sqlDate),
  );
}

export default async function AdminResultsPage(props: PageProps<"/admin">) {
  const sp = await props.searchParams;
  const search = typeof sp.search === "string" ? sp.search : "";
  const level = typeof sp.level === "string" ? sp.level : "";
  const sort = sp.sort === "oldest" ? "oldest" : "newest";

  const results = listExamResults({ search, level, sort });

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">نتایج تعیین سطح</h1>
      <p className="mt-1 text-sm text-ink-muted">{results.length} نتیجه</p>

      <form method="get" className="mt-6 flex flex-wrap items-end gap-3 rounded-card border border-hairline bg-white p-4">
        <div className="min-w-[200px] flex-1">
          <label htmlFor="search" className="mb-1 block text-sm text-ink-muted">
            جستجو
          </label>
          <input
            id="search"
            name="search"
            defaultValue={search}
            placeholder="نام، ایمیل یا شماره"
            className="w-full rounded-xl border border-hairline px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
        </div>
        <div>
          <label htmlFor="level" className="mb-1 block text-sm text-ink-muted">
            سطح
          </label>
          <select
            id="level"
            name="level"
            defaultValue={level}
            className="rounded-xl border border-hairline px-3 py-2 text-sm"
          >
            <option value="">همه</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l} — {LEVEL_NAME[l]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mb-1 block text-sm text-ink-muted">
            مرتب‌سازی
          </label>
          <select
            id="sort"
            name="sort"
            defaultValue={sort}
            className="rounded-xl border border-hairline px-3 py-2 text-sm"
          >
            <option value="newest">جدیدترین</option>
            <option value="oldest">قدیمی‌ترین</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-600"
        >
          اعمال فیلتر
        </button>
        {(search || level) && (
          <Link href="/admin" className="text-sm text-ink-muted underline decoration-brand-300 underline-offset-4">
            پاک کردن فیلتر
          </Link>
        )}
      </form>

      <div className="mt-6 overflow-x-auto rounded-card border border-hairline bg-white">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-hairline text-ink-muted">
              <th className="px-4 py-3 text-right font-medium">نام</th>
              <th className="px-4 py-3 text-right font-medium">ایمیل</th>
              <th className="px-4 py-3 text-right font-medium">شماره</th>
              <th className="px-4 py-3 text-right font-medium">سطح</th>
              <th className="px-4 py-3 text-right font-medium">نمره کل</th>
              <th className="px-4 py-3 text-right font-medium">تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-b border-hairline last:border-0 hover:bg-brand-50/40">
                <td className="px-4 py-3">
                  <Link href={`/admin/${r.id}`} className="font-medium text-ink hover:text-brand-600">
                    {r.fullName}
                  </Link>
                </td>
                <td className="en px-4 py-3 text-ink-muted">{r.email}</td>
                <td className="en px-4 py-3 text-ink-muted">{r.phone}</td>
                <td className="px-4 py-3">
                  <span className="en inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-600">
                    {r.level}
                  </span>
                </td>
                <td className="en px-4 py-3 text-ink-muted">{r.totalPercentage}%</td>
                <td className="en px-4 py-3 text-ink-faint">{formatDate(r.createdAt)}</td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink-faint">
                  نتیجه‌ای پیدا نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
