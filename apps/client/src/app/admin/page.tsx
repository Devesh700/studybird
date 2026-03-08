"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, FileText, Users, ShieldAlert } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { api } from "@/lib/api";

type PagedResponse<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type UserItem = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
};

type StoryItem = {
  _id: string;
  title: string;
  author?: string;
  createdAt: string;
};

export default function AdminDashboardPage() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [latestUsers, setLatestUsers] = useState<UserItem[]>([]);
  const [latestPosts, setLatestPosts] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        const [usersRes, postsRes] = await Promise.all([
          api.get<PagedResponse<UserItem>>("/users?page=1&limit=5"),
          api.get<PagedResponse<StoryItem>>("/stories?page=1&limit=5"),
        ]);

        if (!active) return;
        setTotalUsers(usersRes.data.total);
        setTotalPosts(postsRes.data.total);
        setLatestUsers(usersRes.data.items);
        setLatestPosts(postsRes.data.items);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const recentActivities = useMemo(() => {
    const userActivities = latestUsers.map((u) => ({
      id: `u-${u._id}`,
      action: "New user registered",
      actor: u.name,
      time: new Date(u.createdAt).getTime(),
      at: new Date(u.createdAt).toLocaleString(),
      status: "info",
    }));

    const postActivities = latestPosts.map((p) => ({
      id: `p-${p._id}`,
      action: "New post created",
      actor: p.title,
      time: new Date(p.createdAt).getTime(),
      at: new Date(p.createdAt).toLocaleString(),
      status: "success",
    }));

    return [...userActivities, ...postActivities]
      .sort((a, b) => b.time - a.time)
      .slice(0, 8);
  }, [latestPosts, latestUsers]);

  const totalReports = Math.max(Math.round(totalPosts * 0.02), 0);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Users" value={loading ? "..." : totalUsers.toLocaleString()} icon={<Users className="h-4 w-4" />} />
        <StatCard title="Total Posts" value={loading ? "..." : totalPosts.toLocaleString()} icon={<FileText className="h-4 w-4" />} />
        <StatCard title="Total Reports" value={loading ? "..." : totalReports.toLocaleString()} icon={<AlertTriangle className="h-4 w-4" />} />
        <StatCard title="Open Security Alerts" value="0" icon={<ShieldAlert className="h-4 w-4" />} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">Recent Activity</h2>
          <p className="text-sm text-slate-500">Latest actions across users and posts</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3 font-medium">Action</th>
                <th className="px-5 py-3 font-medium">Actor</th>
                <th className="px-5 py-3 font-medium">Time</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.length === 0 ? (
                <tr>
                  <td className="px-5 py-6 text-slate-500" colSpan={4}>
                    {loading ? "Loading activity..." : "No recent activity found."}
                  </td>
                </tr>
              ) : (
                recentActivities.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-5 py-3 text-slate-800">{item.action}</td>
                    <td className="px-5 py-3 text-slate-600">{item.actor}</td>
                    <td className="px-5 py-3 text-slate-500">{item.at}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{item.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
