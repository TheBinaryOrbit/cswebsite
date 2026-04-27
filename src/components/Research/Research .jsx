"use client";

import React from "react";
import { FiUser } from "react-icons/fi";
import ResearchTabs from "./ResearchTabs";
import { researchRecords, researchStats } from "../../data/researchData";

const THEME = {
  primary: "#113959",
  accent: "#f15b20",
};

const statCards = [
  { label: "Journals", value: researchStats.journalCount },
  { label: "Conferences", value: researchStats.conferenceCount },
  { label: "Book Published", value: researchStats.bookCount },
  { label: "Total Records", value: researchStats.total },
];

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

const Research = () => {
  return (
    <section className="w-full py-8 sm:py-10" id="research-section">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-center md:justify-end items-center h-fit">
          <p
            className="flex items-center px-3 rounded-lg text-xs gap-1 mb-4 py-1 font-semibold"
            style={{ border: `1px solid ${THEME.primary}33`, color: THEME.primary }}
          >
            <FiUser size={12} />
            <span className="text-xs font-semibold">Our Research</span>
          </p>
        </div>

        <h1 className="text-center md:text-right text-2xl sm:text-3xl md:text-4xl font-bold capitalize mb-2 leading-tight" style={{ color: THEME.primary }}>
          Research Data Overview
        </h1>
        <p className="text-sm md:text-lg text-center md:text-right text-slate-600 mb-6 md:mb-8">
          Recent Journals, Conferences, and Book Published records from the department.
        </p>

        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-bold mb-3" style={{ color: THEME.primary }}>
              Research Output
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200" style={{ color: THEME.primary }}>
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
                        <td className="py-2 font-semibold" style={{ color: THEME.primary }}>
                          {pct}%
                        </td>
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
                        {total} ({pct}%)
                      </span>
                    </div>
                    <ProgressBar value={pct} color={THEME.primary} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-bold mb-3" style={{ color: THEME.primary }}>
              Journal Indexing
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200" style={{ color: THEME.primary }}>
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
                      <span className="font-semibold text-slate-900">
                        SCI {sciPct}% | Scopus {scopusPct}%
                      </span>
                    </div>
                    <ProgressBar value={scopusPct} color={THEME.accent} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ResearchTabs data={researchRecords} showAll />
      </div>
    </section>
  );
};

export default Research;
