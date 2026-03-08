"use client";

import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";

type MeResponse = {
  _id: string;
  name: string;
  email: string;
};

function getErrorMessage(error: unknown, fallback: string) {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { error?: string } } }).response;
    return response?.data?.error ?? fallback;
  }
  return fallback;
}

export default function AdminSettingsPage() {
  const [userId, setUserId] = useState("");
  const [siteName, setSiteName] = useState("Storybird");
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadSettings() {
      try {
        setLoading(true);
        setError(null);

        const storedSiteName = typeof window !== "undefined" ? localStorage.getItem("admin_site_name") : null;
        if (storedSiteName && active) setSiteName(storedSiteName);

        const { data } = await api.get<MeResponse>("/auth/me");
        if (!active) return;
        setUserId(data._id);
        setAdminEmail(data.email);
      } catch (error) {
        if (active) setError(getErrorMessage(error, "Failed to load settings"));
      } finally {
        if (active) setLoading(false);
      }
    }

    loadSettings();
    return () => {
      active = false;
    };
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError(null);

      if (typeof window !== "undefined") {
        localStorage.setItem("admin_site_name", siteName.trim());
      }

      if (userId) {
        await api.patch(`/users/${userId}`, { email: adminEmail.trim() });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      setError(getErrorMessage(error, "Failed to save settings"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-slate-900">Settings</h2>
        <p className="text-sm text-slate-500">Update site-level admin configuration</p>
      </div>

      <form className="space-y-5" onSubmit={onSubmit}>
        {error ? <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}
        <div className="space-y-2">
          <label htmlFor="siteName" className="block text-sm font-medium text-slate-700">
            Site Name
          </label>
          <input
            id="siteName"
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            disabled={loading || saving}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 transition focus:ring"
            placeholder="Enter site name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="adminEmail" className="block text-sm font-medium text-slate-700">
            Admin Email
          </label>
          <input
            id="adminEmail"
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            disabled={loading || saving}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 transition focus:ring"
            placeholder="Enter admin email"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || saving}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow hover:from-indigo-600 hover:to-cyan-600"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          {saved ? <span className="text-sm text-emerald-600">Saved successfully.</span> : null}
        </div>
      </form>
    </section>
  );
}
