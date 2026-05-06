import React, { useMemo, useState } from "react";

const TAB_THEME = {
  primary: "#113959",
  accent: "#f15b20",
};

const TAB_CONFIG = {
  journals: {
    title: "Journals",
    columns: ["Title", "Journal", "Year", "Faculty", "Category", "Status"],
    mapRow: (item) => [
      item.title,
      item.journal,
      item.year,
      item.faculty,
      item.category,
      item.status,
    ],
  },
  conferencesAndChapters: {
    title: "Conferences & Book Chapters",
    columns: ["Title", "Proceedings / Book", "Faculty", "Level / Type", "Scopus"],
    mapRow: (item) => [
      item.title,
      item.proceedingsTitle || item.book || item.volumeIssuePage || "",
      item.faculty,
      item.level || item.category || "",
      item.scopus || item.indexing || "",
    ],
  },
  book: {
    title: "Book",
    columns: ["Book Title", "Chapter / Article", "Publisher", "Date", "Faculty"],
    mapRow: (item) => [
      item.book,
      item.title,
      item.publisher,
      item.date,
      item.faculty,
      
    ],
  },
  patents: {
    title: "Patents",
    columns: ["Title", "Application No.", "Status", "Date", "Faculty", "Level"],
    mapRow: (item) => [
      item.title,
      item.appNo,
      item.status,
      item.date,
      item.faculty,
      item.level,
    ],
  },
};

function RowLink({ item, value }) {
  if (!item.link || item.link === "NA" || item.link === "") {
    return <span className="line-clamp-2">{value || "—"}</span>;
  }
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="line-clamp-2 font-semibold hover:underline"
      style={{ color: TAB_THEME.primary }}
    >
      {value || "View"}
    </a>
  );
}

export default function ResearchTabs({ data = {}, showAll = false, recentLimit = 8 }) {
  const [activeTab, setActiveTab] = useState("journals");

  // ── Safe accessors — never crash if a key is missing ──────────────────────
  const safeJournals = data?.journals || [];
  const safeConferences = data?.conferences || [];
  const safeBooks = data?.books || [];
  const safePatents = data?.patents || [];

  // Merged tab: conferences + book chapters
  const conferencesAndChapters = useMemo(() => {
    const conf = safeConferences.map((r) => ({ ...r, _type: "conference" }));
    const chap = safeBooks.map((r) => ({ ...r, _type: "chapter" }));
    return [...conf, ...chap];
  }, [safeConferences, safeBooks]);

  const tabs = useMemo(
    () => [
      { key: "journals", label: "Journals", count: safeJournals.length },
      { key: "conferencesAndChapters", label: "Conferences & Book Chapters", count: conferencesAndChapters.length },
      { key: "book", label: "Book", count: safeBooks.length },
      { key: "patents", label: "Patents", count: safePatents.length },
    ],
    [safeJournals.length, safeBooks.length, safePatents.length, conferencesAndChapters.length]
  );

  const activeRows = useMemo(() => {
    let rows;
    switch (activeTab) {
      case "conferencesAndChapters": rows = conferencesAndChapters; break;
      case "book": rows = safeBooks; break;
      case "journals": rows = safeJournals; break;
      case "patents": rows = safePatents; break;
      default: rows = [];
    }
    return showAll ? rows : rows.slice(0, recentLimit);
  }, [activeTab, safeJournals, safeConferences, safeBooks, safePatents, conferencesAndChapters, recentLimit, showAll]);

  const config = TAB_CONFIG[activeTab];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6">
      {/* ── Tab buttons ── */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold border transition-all"
              onClick={() => setActiveTab(tab.key)}
              style={{
                borderColor: isActive ? TAB_THEME.accent : "#cbd5e1",
                color: isActive ? "#ffffff" : TAB_THEME.primary,
                backgroundColor: isActive ? TAB_THEME.accent : "#ffffff",
              }}
            >
              {tab.label}{" "}
              
            </button>
          );
        })}
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b text-white" style={{ backgroundColor: TAB_THEME.primary }}>
              {config.columns.map((col) => (
                <th key={col} className="text-left py-3 px-2 sm:px-4 font-semibold whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeRows.length === 0 && (
              <tr>
                <td colSpan={config.columns.length} className="px-4 py-6 text-center text-slate-500">
                  No records available
                </td>
              </tr>
            )}
            {activeRows.map((item, rowIdx) => {
              const cells = config.mapRow(item);
              return (
                <tr
                  key={item.id || `${activeTab}-${rowIdx}`}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  {cells.map((value, colIdx) => (
                    <td key={`${item.id}-${colIdx}`} className="py-3 px-2 sm:px-4 align-top text-slate-700">
                      {colIdx === 0 ? (
                        <RowLink item={item} value={value} />
                      ) : (
                        <span>{value || "—"}</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!showAll && (
        <p className="mt-4 text-xs sm:text-sm text-slate-500">
          Showing recent {recentLimit} entries. View the Research Details page for complete data.
        </p>
      )}
    </div>
  );
}