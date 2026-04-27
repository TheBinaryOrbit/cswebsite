import React, { useMemo, useState } from "react";

const TAB_THEME = {
  primary: "#113959",
  accent: "#f15b20",
};

const TAB_CONFIG = {
  journals: {
    title: "Journals",
    // hide raw link column; title will be the clickable link
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
  conferences: {
    title: "Conferences",
    // hide raw DOI/link column; title will navigate to provided link if available
    columns: ["Title", "Proceedings", "Date", "Faculty", "Level", "Status"],
    mapRow: (item) => [
      item.title,
      item.proceedingsTitle || item.volumeIssuePage,
      item.date,
      item.faculty,
      item.level,
      item.status,
    ],
  },
  books: {
    title: "Book Published",
    // hide raw DOI/link column; title clickable when link present
    columns: ["Book", "Chapter/Article", "Publisher", "Date", "Faculty", "Indexing"],
    mapRow: (item) => [
      item.book,
      item.title,
      item.publisher,
      item.date,
      item.faculty,
      item.indexing || item.category,
    ],
  },
};

function RowLink({ item, value }) {
  if (!item.link || item.link === "NA") {
    return <span className="line-clamp-2">{value}</span>;
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="line-clamp-2 font-semibold hover:underline"
      style={{ color: TAB_THEME.primary }}
    >
      {value}
    </a>
  );
}

export default function ResearchTabs({ data, showAll = false, recentLimit = 8 }) {
  const [activeTab, setActiveTab] = useState("journals");

  const tabs = useMemo(
    () => [
      { key: "journals", label: "Journals", count: data.journals.length },
      { key: "conferences", label: "Conferences", count: data.conferences.length },
      { key: "books", label: "Book Published", count: data.books.length },
    ],
    [data.books.length, data.conferences.length, data.journals.length]
  );

  const activeRows = useMemo(() => {
    const rows = data[activeTab] || [];
    if (showAll) {
      return rows;
    }

    return rows.slice(0, recentLimit);
  }, [activeTab, data, recentLimit, showAll]);

  const config = TAB_CONFIG[activeTab];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6">
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
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>

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

            {activeRows.map((item) => {
              const cells = config.mapRow(item);

              return (
                <tr key={`${activeTab}-${item.id}`} className="border-b border-slate-100 hover:bg-slate-50">
                  {cells.map((value, index) => (
                    <td key={`${item.id}-${index}`} className="py-3 px-2 sm:px-4 align-top text-slate-700">
                      {index === 0 ? <RowLink item={item} value={value} /> : <span>{value || "NA"}</span>}
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
          Showing recent entries only. Use the Research Details page to view complete data.
        </p>
      )}
    </div>
  );
}
