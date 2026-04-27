"use client";

import React, { useRef, useState } from "react";
import { FiUser } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { researchPublications } from "../../data/researchData";

const researchOutput = [
  { session: "2025-26", journals: 13, conferences: 25, patents: 30 },
  { session: "2024-25", journals: 13, conferences: 10, patents: 67 },
  { session: "2023-24", journals: 14, conferences: 26, patents: 95 },
];

const journalIndexing = [
  { session: "2025-26", journals: 13, sci: 10, scopus: 3 },
  { session: "2024-25", journals: 13, sci: 9, scopus: 4 },
  { session: "2023-24", journals: 14, sci: 6, scopus: 8 },
];

const insightCards = [
  {
    title: "Publication Momentum",
    description:
      "Sustained journal and conference output reflects a strong and consistent research culture in the department.",
  },
  {
    title: "Innovation Through Patents",
    description:
      "The patent trend shows active technology transfer and increasing focus on practical and industry-ready ideas.",
  },
  {
    title: "Global Journal Visibility",
    description:
      "A balanced SCI and Scopus footprint indicates broader indexing quality and high discoverability of research work.",
  },
  {
    title: "Conference Collaboration",
    description:
      "Growing conference participation demonstrates active collaboration with external institutions and research groups.",
  },
  {
    title: "Applied Research Focus",
    description:
      "A strong patent pipeline confirms that research outcomes are being translated into practical innovation opportunities.",
  },
  {
    title: "Session Stability",
    description:
      "Journal output remains stable across sessions, indicating continuity in faculty research engagement.",
  },
  {
    title: "SCI Performance",
    description:
      "High SCI percentages in recent sessions point to quality-driven publication strategies and rigorous peer review success.",
  },
  {
    title: "Scopus Expansion",
    description:
      "Scopus-indexed publications reinforce broader accessibility and citation potential for departmental research.",
  },
  {
    title: "Research Quality Mix",
    description:
      "The SCI and Scopus distribution shows a healthy mix of high-impact and globally indexed publications.",
  },
  {
    title: "Future Growth Outlook",
    description:
      "Current trends suggest strong potential for improved output, stronger indexing, and broader innovation impact.",
  },
];

const maxOutputTotal = Math.max(
  ...researchOutput.map((item) => item.journals + item.conferences + item.patents)
);

const insightCardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: i * 0.06,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

function ProgressBar({ value, colorClass = "bg-[#002855]" }) {
  return (
    <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

const Research = () => {
  const rowRef = useRef(null);
  const [percentage, setPercentage] = useState(0);

  const handleAutoScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    const perc = Math.floor(((el.scrollLeft + el.clientWidth) / el.scrollWidth) * 100);
    setPercentage(perc);
  };

  const handleLeftScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
    setTimeout(handleAutoScroll, 400);
  };

  const handleRightScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
    setTimeout(handleAutoScroll, 400);
  };

  return (
    <section className="w-full py-8 sm:py-10">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-center md:justify-end items-center h-fit">
          <p className="flex items-center border border-slate-300 px-3 rounded-lg text-xs gap-1 mb-4 py-1 text-slate-700 font-semibold">
            <FiUser size={12} />
            <span className="text-xs font-semibold">Our Research</span>
          </p>
        </div>

        <h1 className="text-center md:text-right text-2xl sm:text-3xl md:text-4xl font-bold capitalize mb-2 leading-tight">
          Research Statistics and Insights
        </h1>
        <p className="text-sm md:text-lg text-center md:text-right  text-slate-500 mb-6 md:mb-8">
          Research Output, Journal Indexing, and trend percentages across recent sessions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Research Output</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600">
                    <th className="text-left py-2">Session</th>
                    <th className="text-left py-2">Journals</th>
                    <th className="text-left py-2">Conferences</th>
                    <th className="text-left py-2">Patents</th>
                    <th className="text-left py-2">%</th>
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
                        <td className="py-2 font-semibold text-[#002855]">{pct}%</td>
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
                      <span className="font-semibold text-slate-900">{total} ({pct}%)</span>
                    </div>
                    <ProgressBar value={pct} colorClass="bg-[#0f4c81]" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Journal Indexing</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600">
                    <th className="text-left py-2">Session</th>
                    <th className="text-left py-2">Journals</th>
                    <th className="text-left py-2">SCI</th>
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
                        <td className="py-2 font-semibold text-[#002855]">{indexedPct}%</td>
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
                      
                      <span className="font-semibold text-slate-900">SCI {sciPct}% | Scopus {scopusPct}%</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      
                      <ProgressBar value={scopusPct} colorClass="bg-[#f15b20]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* <div
          ref={rowRef}
          onScroll={handleAutoScroll}
          className="flex overflow-x-auto gap-5 pb-2 scrollbar scroll-smooth pt-4"
        >
          {insightCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="relative overflow-hidden flex-none w-[88vw] sm:w-[320px] rounded-2xl border border-slate-200 bg-white shadow-sm p-5 flex flex-col gap-3"
              variants={insightCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              custom={index}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-[#002855]/20"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: 0.08 + index * 0.05 }}
              />

              <motion.h3
                className="text-lg font-bold text-slate-900"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.35, delay: 0.12 + index * 0.05 }}
              >
                {card.title}
              </motion.h3>

              <motion.p
                className="text-sm text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.35, delay: 0.16 + index * 0.05 }}
              >
                {card.description}
              </motion.p>

              <motion.button
                type="button"
                className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#002855] hover:underline w-fit"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.35, delay: 0.2 + index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                Read This
                <FaArrowRight size={12} />
              </motion.button>
            </motion.article>
          ))}
        </div>
        <div className="sm:block hidden mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5 rounded-2xl border border-slate-200 bg-white/90 p-3 sm:p-4 shadow-sm">

            <div className="w-full sm:flex-1 sm:max-w-[700px] flex items-center gap-3">
              <div className="h-4 flex-1 bg-slate-200 rounded-full overflow-hidden border border-slate-300 shadow-inner">
                <motion.div
                  className="h-full bg-[#002855] rounded-full"
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ minWidth: percentage > 0 ? 16 : 0 }}
                />
              </div>
              <span className="w-14 text-right text-xs sm:text-sm font-semibold text-slate-600">
                {percentage}%
              </span>
            </div>

            <div className="flex gap-3 shrink-0">
              <motion.button
                type="button"
                className="p-2.5 sm:p-3 bg-[#002855] text-white rounded-full cursor-pointer"
                onClick={handleLeftScroll}
                aria-label="Scroll research cards left"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <FaArrowLeft />
              </motion.button>

              <motion.button
                type="button"
                className="p-2.5 sm:p-3 bg-gray-300 text-black rounded-full cursor-pointer"
                onClick={handleRightScroll}
                aria-label="Scroll research cards right"
                whileHover={{ scale: 1.12, backgroundColor: "#b0b0b0" }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <FaArrowRight />
              </motion.button>
            </div>
          </div>
        </div> */}

        {/* Publications Section */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Recent Publications & Patents</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 bg-slate-50">
                  <th className="text-left py-3 px-2 sm:px-4">Title</th>
                  <th className="text-left py-3 px-2 sm:px-4">Database</th>
                  <th className="text-left py-3 px-2 sm:px-4">Year</th>
                  <th className="text-left py-3 px-2 sm:px-4">Faculty</th>
                  <th className="text-left py-3 px-2 sm:px-4">Journal/Publication</th>
                </tr>
              </thead>
              <tbody>
                {researchPublications.slice(0, 10).map((pub, index) => (
                  <tr key={pub.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-2 sm:px-4">
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#002855] font-semibold hover:underline line-clamp-2"
                      >
                        {pub.title}
                      </a>
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          pub.database === "SCIE"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {pub.database}
                      </span>
                    </td>
                    <td className="py-3 px-2 sm:px-4 whitespace-nowrap">{pub.year}</td>
                    <td className="py-3 px-2 sm:px-4 text-slate-600">
                      <div className="line-clamp-1">{pub.faculty}</div>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-slate-600">
                      <div className="line-clamp-1">{pub.journal}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>

        
      </div>
    </section>
  );
};

export default Research;