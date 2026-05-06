"use client";

import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import ResearchTabs from "./ResearchTabs";
import AnimatedHeadline from "../AnimatedHeadline";

// ─── LIVE DATA from R&D Excel files (2025-26 actual) ──────────────────────
// Journals: 27 | Conferences: 61 | Book Chapters: 4 | Books: 18 | Patents: 54
// Journal SCI: 10, Scopus: 4

const THEME = {
  primary: "#113959",
  accent: "#f15b20",
};

// ─── Stats cards (2025-26 current session) ─────────────────────────────────
const statCards = [
  { label: "Journals",               value: 23 },
  { label: "Conferences & Chapters", value: 51 },
  { label: "Books Published",        value: 7  },
  { label: "Patents",                value: 45 },
];

// ─── Research output across 3 sessions (from actual file counts) ────────────
const researchOutput = [
  { session: "2025-26", journals: 23,  conferences: 51, patents: 45 },
  { session: "2024-25", journals: 14,  conferences: 52, patents: 82 },
  { session: "2023-24", journals: 24,  conferences: 63, patents: 103 },
];

// ─── Journal indexing across 3 sessions ────────────────────────────────────
const journalIndexing = [
  { session: "2025-26", journals: 23, sci: 10, scopus: 4 },
  { session: "2024-25", journals: 14, sci: 9,  scopus: 4 },
  { session: "2023-24", journals: 24, sci: 6,  scopus: 8 },
];

const maxOutputTotal = Math.max(
  ...researchOutput.map((item) => item.journals + item.conferences + item.patents)
);

function ProgressBar({ value, color }) {
  return (
    <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
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
      const animation = animate(count, value, {
        duration: 1.35,
        ease: "easeOut",
      });
      return () => animation.stop();
    }
    count.set(0);
    return undefined;
  }, [count, inView, value]);

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl border p-5 shadow-lg ${
        isAccent
          ? "border-[#f15b20]/25 bg-[#f15b20] text-white"
          : "border-[#113959]/15 bg-[#113959] text-white"
      }`}
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.55 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
        {label}
      </p>
      <p className="mt-4 text-4xl font-extrabold leading-none md:text-5xl">
        {displayValue}
        <span className="align-top text-2xl md:text-3xl">+</span>
      </p>
      <div className="mt-5 h-1.5 rounded-full bg-white/20">
        <motion.div
          className="h-full rounded-full bg-white"
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

// ─── researchRecords for ResearchTabs ────────────────────────────────────────
// Import your generated researchData.ts and pass researchRecords here.
// Below is the shape expected by ResearchTabs — populate from your data file.
import { researchRecords } from "../../data/researchData";

const Research = () => {
  return (
    <section className="w-full py-8 sm:py-10" id="research-section">
      <div className="max-w-7xl mx-auto p-4">
        {/* ── Header ── */}
        <div className="flex justify-center items-center h-fit">
          <p
            className="flex items-center px-3 rounded-lg text-xs gap-1 mb-4 py-1 font-semibold"
            style={{ border: `1px solid ${THEME.primary}33`, color: THEME.primary }}
          >
            <FiUser size={12} />
            <span className="text-xs font-semibold">Our Research</span>
          </p>
        </div>

        <AnimatedHeadline
          highlight="Research"
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold capitalize mb-2 leading-tight"
          style={{ color: THEME.primary }}
        >
          Research Data Overview
        </AnimatedHeadline>
        <p className="max-w-3xl mx-auto text-sm md:text-lg text-center text-slate-600 mb-6 md:mb-8">
          Recent Journals, Conferences &amp; Book Chapters, Books and Patents from the department (Session 2025-26).
        </p>

        {/* ── Stat Cards (2025-26) ── */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <ResearchStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              index={index}
            />
          ))}
        </div>

        {/* ── Two analysis cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Research Output Card */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
            <AnimatedHeadline as="h2" highlight="Output" className="text-lg sm:text-xl font-bold mb-1" style={{ color: THEME.primary }}>
              Research Output
            </AnimatedHeadline>
            <p className="text-xs text-slate-500 mb-3">Journals + Conferences/Chapters + Patents across sessions</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200" style={{ color: THEME.primary }}>
                    <th className="text-left py-2">Session</th>
                    <th className="text-left py-2">Journals</th>
                    <th className="text-left py-2">Conf+Chap</th>
                    <th className="text-left py-2">Patents</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {researchOutput.map((row) => {
                    const total = row.journals + row.conferences + row.patents;
                    const pct = Math.round((total / maxOutputTotal) * 100);
                    return (
                      <tr key={row.session} className="border-b border-slate-100">
                        <td className="py-2 font-medium">{row.session}</td>
                        <td className="py-2">{row.journals}</td>
                        <td className="py-2">{row.conferences}</td>
                        <td className="py-2">{row.patents}</td>
                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-3">
              {researchOutput.map((row) => {
                const total = row.journals + row.conferences + row.patents;
                const pct = Math.round((total / maxOutputTotal) * 100);
                return (
                  <div key={`${row.session}-bar`}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1 text-slate-600">
                      <span>{row.session}</span>
                      <span className="font-semibold text-slate-900">
                        {total} 
                      </span>
                    </div>
                    <ProgressBar value={pct} color={THEME.primary} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Journal Indexing Card */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
            <AnimatedHeadline as="h2" highlight="Indexing" className="text-lg sm:text-xl font-bold mb-1" style={{ color: THEME.primary }}>
              Journal Indexing
            </AnimatedHeadline>
            <p className="text-xs text-slate-500 mb-3">SCI &amp; Scopus indexed journals per session</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200" style={{ color: THEME.primary }}>
                    <th className="text-left py-2">Session</th>
                    <th className="text-left py-2">Journals</th>
                    <th className="text-left py-2">SCI/SCIE</th>
                    <th className="text-left py-2">Scopus</th>
                    <th className="text-left py-2">Indexed %</th>
                  </tr>
                </thead>
                <tbody>
                  {journalIndexing.map((row) => {
                    const indexedPct = Math.round(((row.sci + row.scopus) / row.journals) * 100);
                    return (
                      <tr key={row.session} className="border-b border-slate-100">
                        <td className="py-2 font-medium">{row.session}</td>
                        <td className="py-2">{row.journals}</td>
                        <td className="py-2">{row.sci}</td>
                        <td className="py-2">{row.scopus}</td>
                        <td className="py-2 font-semibold" style={{ color: THEME.primary }}>
                          {indexedPct}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-3">
              {journalIndexing.map((row) => {
                const sciPct = Math.round((row.sci / row.journals) * 100);
                const scopusPct = Math.round((row.scopus / row.journals) * 100);
                return (
                  <div key={`${row.session}-index`}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1 text-slate-600">
                      <span className="font-medium text-slate-700">{row.session}</span>
                      <span className="font-semibold text-slate-900">
                        SCI {sciPct}% | Scopus {scopusPct}%
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div className="h-2.5 rounded-full overflow-hidden" style={{ width: `${sciPct + scopusPct}%`, flex: "none" }}>
                        <div className="h-full flex">
                          <div style={{ width: `${(sciPct / (sciPct + scopusPct || 1)) * 100}%`, backgroundColor: THEME.primary }} className="h-full rounded-l-full" />
                          <div style={{ width: `${(scopusPct / (sciPct + scopusPct || 1)) * 100}%`, backgroundColor: THEME.accent }} className="h-full rounded-r-full" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full" style={{backgroundColor: THEME.primary}}/>
                        SCI/SCIE: {row.sci}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full" style={{backgroundColor: THEME.accent}}/>
                        Scopus: {row.scopus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Tabbed Records ── */}
        <ResearchTabs data={researchRecords} showAll />
      </div>
    </section>
  );
};

export default Research;