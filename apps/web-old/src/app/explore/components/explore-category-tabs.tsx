"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TabsTrigger } from "@/components/ui/tabs";

interface Tab {
  id: string;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: "trending", label: "Trending", icon: "🔥" },
  { id: "new", label: "New", icon: "🌱" },
  { id: "staff", label: "Staff Picks", icon: "⭐" },
  { id: "kids", label: "For Kids", icon: "🧒" },
  { id: "poetry", label: "Poetry", icon: "🪶" },
];

export default function ExploreCategoryTabs({
  defaultTab = "trending",
  onChange,
}: {
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div className="relative w-full flex justify-center mt-6">
      <div className="relative inline-flex bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 p-2 rounded-full shadow-inner border border-pink-100">
        {tabs.map((t) => (
          <TabsTrigger
          value={t.id}
            key={t.id}
            onClick={() => handleTabClick(t.id)}
            className={cn(
              "relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 flex items-center gap-1",
              activeTab === t.id
                ? "text-pink-700"
                : "text-gray-500 hover:text-pink-600"
            )}
          >
            <span className="text-base">{t.icon}</span>
            {t.label}
            {activeTab === t.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-full -z-10 shadow-sm"
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
              />
            )}
          </TabsTrigger>
        ))}
      </div>
    </div>
  );
}
