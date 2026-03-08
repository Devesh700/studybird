"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

type UserRow = {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  isDeleted: boolean;
};

type UsersResponse = {
  items: UserRow[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

function getErrorMessage(error: unknown, fallback: string) {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { error?: string } } }).response;
    return response?.data?.error ?? fallback;
  }
  return fallback;
}

export default function AdminUsersPage() {
  const [items, setItems] = useState<UserRow[]>([]);
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);
        const sp = new URLSearchParams();
        sp.set("page", String(page));
        sp.set("limit", "10");
        if (search) sp.set("q", search);

        const { data } = await api.get<UsersResponse>(`/users?${sp.toString()}`);
        if (!active) return;
        setItems(data.items);
        setTotalPages(data.totalPages);
      } catch (error) {
        if (active) setError(getErrorMessage(error, "Failed to load users"));
      } finally {
        if (active) setLoading(false);
      }
    }

    loadUsers();
    return () => {
      active = false;
    };
  }, [page, search]);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const summary = useMemo(() => `Page ${page} of ${Math.max(totalPages, 1)}`, [page, totalPages]);

  async function onDelete(id: string) {
    const ok = window.confirm("Delete this user?");
    if (!ok) return;

    try {
      await api.delete(`/users/${id}`);
      setItems((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      window.alert(getErrorMessage(error, "Failed to delete user"));
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Users</h2>
          <p className="text-sm text-slate-500">Manage user accounts and permissions</p>
        </div>
        <form
          className="flex w-full max-w-sm gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            setSearch(q.trim());
          }}
        >
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name/email/role"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
          />
          <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Search
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-5 py-6 text-slate-500" colSpan={5}>
                  Loading users...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="px-5 py-6 text-rose-600" colSpan={5}>
                  {error}
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="px-5 py-6 text-slate-500" colSpan={5}>
                  No users found.
                </td>
              </tr>
            ) : (
              items.map((user) => (
                <tr key={user._id} className="border-t border-slate-100">
                  <td className="px-5 py-3 font-medium text-slate-800">{user.name}</td>
                  <td className="px-5 py-3 text-slate-600">{user.email}</td>
                  <td className="px-5 py-3 text-slate-600">{user.roles.join(", ") || "user"}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {user.isDeleted ? "Deleted" : "Active"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        onClick={() => window.alert(`Name: ${user.name}\nEmail: ${user.email}\nRoles: ${user.roles.join(", ")}`)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="rounded-md border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50"
                        onClick={() => onDelete(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3">
          <p className="text-sm text-slate-500">{summary}</p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
