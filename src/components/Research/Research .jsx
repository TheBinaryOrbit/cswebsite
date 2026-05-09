"use client";

import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import ResearchTabs from "./ResearchTabs";
import AnimatedHeadline from "../AnimatedHeadline";
import { researchRecords } from "../../data/researchData";

const THEME = {
  primary: "#113959",
  accent: "#f15b20",
};

// ─── Stats cards (Session 2025-26 Aggregate) ──────────────────────────────
const statCards = [
  { label: "Journals (Total)", value: 28 }, // Faculty (14) + Students (Placeholder/Verified)
  { label: "Conferences", value: 62 },      // Faculty (20) + Students (42)
  { label: "Patents Published", value: 28 }, // Faculty (2) + Students (26)
  { label: "Patents Granted", value: 2 },   // Faculty (2)
];

// ─── Data from Image 1: Faculty Publications ──────────────────────────────
const facultyPublications = [
  { session: "2025-26*", journals: 14, conferences: 20, pubPatents: 2, grantPatents: 2 },
  { session: "2024-25", journals: 14, conferences: 12, pubPatents: 24, grantPatents: 2 },
  { session: "2023-24", journals: 12, conferences: 26, pubPatents: 23, grantPatents: 3 },
];

// ─── Data from Image 2: Student Publications ──────────────────────────────
const studentPublications = [
  { session: "2025-26*", conferences: 42, patents: 26, details: "29-Published, 13-Registered" },
  { session: "2024-25", conferences: 3, patents: 52, details: "" },
  { session: "2023-24", conferences: 14, patents: 68, details: "" },
];

const maxFacultyTotal = Math.max(...facultyPublications.map(f => f.journals + f.conferences + f.pubPatents + f.grantPatents));
const maxStudentTotal = Math.max(...studentPublications.map(s => s.conferences + s.patents));

function ProgressBar({ value, color }) {
  return (
    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full" 
        style={{ backgroundColor: color }} 
      />
    </div>
  );
}

function ResearchStatCard({ label, value, index }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.55 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);
  const isAccent = index % 2 === 1;

  useEffect(() => {
    const unsubscribe = rounded.on("change", setDisplayValue);
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    if (inView) {
      count.set(0);
      const animation = animate(count, value, { duration: 1.5, ease: "easeOut" });
      return () => animation.stop();
    }
    count.set(0);
  }, [count, inView, value]);

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl border p-5 shadow-lg ${
        isAccent ? "bg-[#f15b20] text-white" : "bg-[#113959] text-white"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{label}</p>
      <p className="mt-2 text-4xl font-black">{displayValue}</p>
      <div className="mt-4 h-1 rounded-full bg-white/20 overflow-hidden">
        <motion.div 
          className="h-full bg-white" 
          initial={{ width: 0 }} 
          animate={inView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.5 }}
        />
      </div>
    </motion.div>
  );
}

const Research = () => {
  return (
    <section className="w-full py-12 bg-slate-50/50" id="research-section">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200 text-[#113959] text-xs font-bold gap-2 mb-4">
            <FiUser /> <span>RESEARCH CENTER</span>
          </div>
          <AnimatedHeadline highlight="Data" className="text-3xl md:text-5xl font-black text-[#113959] mb-4">
            Publications Overview
          </AnimatedHeadline>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Comprehensive tracking of research output for Faculty and Students across the last three academic sessions.
          </p>
        </div>

        {/* Top Summary Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {statCards.map((stat, i) => (
            <ResearchStatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* Detailed Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Faculty */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-[#113959] flex items-center gap-2 mb-4">
              <span className="w-2 h-6 bg-[#113959] rounded-full inline-block" />
              Faculty Publications
            </h3>
            <div className="overflow-hidden rounded-xl border border-slate-100 mb-6">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Session</th>
                    <th className="px-4 py-3 text-center">Journals</th>
                    <th className="px-4 py-3 text-center">Conf/Books</th>
                    <th className="px-4 py-3 text-right">Patents (P/G)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {facultyPublications.map((row) => (
                    <tr key={row.session} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-700">{row.session}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row.journals}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row.conferences}</td>
                      <td className="px-4 py-3 text-right font-bold text-[#f15b20]">{row.pubPatents} / {row.grantPatents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4">
              {facultyPublications.map(row => (
                <div key={row.session}>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                    <span>{row.session} Volume</span>
                    <span>{row.journals + row.conferences + row.pubPatents + row.grantPatents} Units</span>
                  </div>
                  <ProgressBar color={THEME.primary} value={( (row.journals + row.conferences + row.pubPatents + row.grantPatents) / maxFacultyTotal) * 100} />
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Students */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-[#113959] flex items-center gap-2 mb-4">
              <span className="w-2 h-6 bg-[#f15b20] rounded-full inline-block" />
              Student Publications
            </h3>
            <div className="overflow-hidden rounded-xl border border-slate-100 mb-6">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Session</th>
                    <th className="px-4 py-3 text-center">Conferences</th>
                    <th className="px-4 py-3 text-right">Patents</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {studentPublications.map((row) => (
                    <tr key={row.session} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-700">{row.session}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-bold text-[#113959]">{row.conferences}</span>
                        {row.details && <p className="text-[10px] text-slate-400 font-normal">{row.details}</p>}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-600">{row.patents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4">
              {studentPublications.map(row => (
                <div key={row.session}>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                    <span>{row.session} Growth</span>
                    <span>{row.conferences + row.patents} Total</span>
                  </div>
                  <ProgressBar color={THEME.accent} value={((row.conferences + row.patents) / maxStudentTotal) * 100} />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Tabbed Component for individual records */}
        <div className="mt-16">
           <ResearchTabs data={researchRecords} showAll />
        </div>
      </div>
    </section>
  );
};

export default Research;