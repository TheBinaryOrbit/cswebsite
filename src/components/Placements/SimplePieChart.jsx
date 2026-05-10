"use client";
import { motion } from "framer-motion";

export default function SimplePieChart({ percentage, inView }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
        <motion.circle
          cx="60" cy="60" r={radius} fill="transparent" stroke="#f15b20" strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold text-[#113959]">{percentage}<span className="text-2xl">%</span></span>
        <span className="text-xs uppercase text-gray-500 font-bold tracking-wider">Placed</span>
      </div>
    </div>
  );
}
