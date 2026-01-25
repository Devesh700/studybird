// components/work-type-step.tsx
"use client";

import { motion } from "framer-motion";
import { WORK_TYPES } from "@/config/work-types";

interface WorkTypeStepProps {
  onSelect: (type: WorkType) => void;
}

export function WorkTypeStep({ onSelect }: WorkTypeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Subtle gradient background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50/80 via-purple-50/80 to-blue-50/80 p-8 sm:p-12 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-purple-500/5" />
        
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            What would you like to write?
          </h1>
          <p className="max-w-md mx-auto text-lg text-muted-foreground">
            Choose the type of work to get the perfect writing experience
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {WORK_TYPES.map((type) => (
          <motion.button
            key={type.value}
            type="button"
            onClick={() => onSelect(type.value)}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative h-48 rounded-2xl bg-white/70 backdrop-blur-sm shadow-xl border border-white/50 hover:border-rose-200 hover:shadow-2xl hover:bg-white transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center space-y-3">
              <div className="text-4xl group-hover:scale-110 transition-transform">{type.icon}</div>
              <h3 className="text-xl font-bold text-gray-900">{type.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {type.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
