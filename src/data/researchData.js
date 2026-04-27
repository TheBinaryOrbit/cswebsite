import rawResearchData from "../../data.txt?raw";

const normalizeLine = (line) => line.replace(/\r/g, "").trim();

const safeCell = (cells, index, fallback = "NA") => {
  if (!cells[index]) {
    return fallback;
  }

  const value = cells[index].trim();
  return value.length > 0 ? value : fallback;
};

const sectionBetween = (source, startLabel, endLabel) => {
  const start = source.indexOf(startLabel);
  if (start === -1) {
    return "";
  }

  const fromStart = source.slice(start + startLabel.length);
  const end = endLabel ? fromStart.indexOf(endLabel) : -1;

  return end === -1 ? fromStart : fromStart.slice(0, end);
};

const parseRows = (sectionText) => {
  const lines = sectionText.split("\n").map(normalizeLine);
  const rows = [];

  for (const line of lines) {
    if (!/^\d+\t/.test(line)) {
      continue;
    }

    const cells = line
      .split("\t")
      .map((cell) => cell.trim())
      .filter((cell, index, arr) => !(cell === "" && index === arr.length - 1));

    rows.push(cells);
  }

  return rows;
};

const journalsSection = sectionBetween(rawResearchData, "journals :", "confrences :");
const conferencesSection = sectionBetween(rawResearchData, "confrences :", "booked published :");
const booksSection = sectionBetween(rawResearchData, "booked published :", "");

const journalsData = parseRows(journalsSection).map((cells) => ({
  id: Number.parseInt(safeCell(cells, 0, "0"), 10),
  faculty: safeCell(cells, 1),
  facultyId: safeCell(cells, 2),
  affiliation: safeCell(cells, 3),
  publisher: safeCell(cells, 4),
  title: safeCell(cells, 5),
  journal: safeCell(cells, 6),
  year: safeCell(cells, 7),
  date: safeCell(cells, 8),
  issn: safeCell(cells, 9),
  link: safeCell(cells, 10, "NA"),
  doi: safeCell(cells, 11, "NA"),
  volume: safeCell(cells, 12, "NA"),
  issue: safeCell(cells, 13, "NA"),
  pages: safeCell(cells, 14, "NA"),
  category: safeCell(cells, 15),
  citeScore: safeCell(cells, 16, "NA"),
  status: safeCell(cells, 17, "NA"),
  proofLink: safeCell(cells, 18, "NA"),
  studentsInvolved: safeCell(cells, 19),
  studentNames: safeCell(cells, 20),
  allAuthors: safeCell(cells, 21),
  allAuthorsIds: safeCell(cells, 22),
  sdgs: safeCell(cells, 23),
  collaboration: safeCell(cells, 24),
  collabPersons: safeCell(cells, 25),
  collabInstitutions: safeCell(cells, 26),
  drcRecommendation: safeCell(cells, 27),
  firstPageLink: safeCell(cells, 28, "NA"),
  type: "journal",
  originalCells: cells,
}));

const conferencesData = parseRows(conferencesSection).map((cells) => ({
  id: Number.parseInt(safeCell(cells, 0, "0"), 10),
  faculty: safeCell(cells, 1),
  facultyId: safeCell(cells, 2),
  affiliation: safeCell(cells, 3),
  level: safeCell(cells, 4),
  title: safeCell(cells, 5),
  authors: safeCell(cells, 6),
  authorsFacultyIds: safeCell(cells, 7),
  proceedingsTitle: safeCell(cells, 8),
  volumeIssuePage: safeCell(cells, 9),
  publisher: safeCell(cells, 10),
  date: safeCell(cells, 11),
  isbn: safeCell(cells, 12),
  link: safeCell(cells, 13, "NA"),
  proofLink: safeCell(cells, 14, "NA"),
  studentsInvolved: safeCell(cells, 15),
  studentNames: safeCell(cells, 16),
  sdgs: safeCell(cells, 17),
  collaboration: safeCell(cells, 18),
  collabPersons: safeCell(cells, 19),
  collabInstitutions: safeCell(cells, 20),
  status: safeCell(cells, 21),
  scopusFlag: safeCell(cells, 22),
  doi: safeCell(cells, 23, "NA"),
  drcRecommendation: safeCell(cells, 24),
  firstPageLink: safeCell(cells, 25, "NA"),
  type: "conference",
  originalCells: cells,
}));

const booksPublishedData = parseRows(booksSection).map((cells) => ({
  id: Number.parseInt(safeCell(cells, 0, "0"), 10),
  faculty: safeCell(cells, 1),
  facultyId: safeCell(cells, 2),
  department: safeCell(cells, 3),
  affiliation: safeCell(cells, 4),
  category: safeCell(cells, 5),
  book: safeCell(cells, 6),
  title: safeCell(cells, 7),
  indexing: safeCell(cells, 8),
  publisher: safeCell(cells, 9),
  publisherType: safeCell(cells, 10),
  date: safeCell(cells, 11),
  isbn: safeCell(cells, 12),
  doi: safeCell(cells, 13, "NA"),
  link: safeCell(cells, 14, "NA"),
  proofLink: safeCell(cells, 15, "NA"),
  sdgs: safeCell(cells, 16),
  collaboration: safeCell(cells, 17),
  collabPersons: safeCell(cells, 18),
  collabInstitutions: safeCell(cells, 19),
  allAuthors: safeCell(cells, 20),
  allAuthorsIds: safeCell(cells, 21),
  drcRecommendation: safeCell(cells, 22),
  firstPageLink: safeCell(cells, 23, "NA"),
  type: "book",
  originalCells: cells,
}));

const sortByYearDesc = (records) => {
  return [...records].sort((a, b) => {
    const yearA = Number.parseInt(String(a.year || a.date || "0").match(/\d{4}/)?.[0] || "0", 10);
    const yearB = Number.parseInt(String(b.year || b.date || "0").match(/\d{4}/)?.[0] || "0", 10);
    return yearB - yearA;
  });
};

export const researchRecords = {
  journals: sortByYearDesc(journalsData),
  conferences: sortByYearDesc(conferencesData),
  books: sortByYearDesc(booksPublishedData),
};

export const recentResearchRecords = {
  journals: researchRecords.journals.slice(0, 6),
  conferences: researchRecords.conferences.slice(0, 6),
  books: researchRecords.books.slice(0, 6),
};

// Backward-compatible exports used by existing UI blocks.
export const researchPublications = researchRecords.journals;

export const researchStats = {
  total:
    researchRecords.journals.length +
    researchRecords.conferences.length +
    researchRecords.books.length,
  journalCount: researchRecords.journals.length,
  conferenceCount: researchRecords.conferences.length,
  bookCount: researchRecords.books.length,
  scopusCount: researchRecords.journals.filter((item) =>
    String(item.category).toLowerCase().includes("scopus")
  ).length,
  scieCount: researchRecords.journals.filter((item) =>
    String(item.category).toLowerCase().includes("scie")
  ).length,
};
