"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-full border border-hairline px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-brand-300 hover:text-brand-600 disabled:opacity-60"
    >
      {loading ? "در حال خروج…" : "خروج"}
    </button>
  );
}
