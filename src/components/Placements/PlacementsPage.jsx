"use client";
import { useState } from "react";
import AnimatedHeadline from "../AnimatedHeadline";

const internshipHighlights = [
  {
    company: "Sense as Software Engineering Intern",
    role: "SDE Intern",
    highlights: "Real-world projects at a global scale",
  },
  {
    company: "CloudSEK as SDE Intern",
    role: "SDE Intern",
    highlights: "Focus on real-world projects & innovation",
  },
  {
    company: "DecodeX 2026 - 24-hour national-level hackathon",
    role: "Hackathon",
    highlights: "Prizepool upto 1.75 lakhs",
  },
  {
    company: "Kintsugi AI - Engineering Intern",
    role: "Engineering Intern",
    highlights: "Exclusive mentorship for women learners",
  },
  {
    company: "CISCO as Software Engineer Intern",
    role: "SE Intern",
    highlights: "Exclusive mentorship for women learners, stipend: 90K - 1.2 Lakhs /month",
  },
  {
    company: "Lowe's Internship as Software Engineering Intern",
    role: "SE Intern",
    highlights: "Stipend: 35,000 - 60,000 per month",
  },
  {
    company: "Zorvyn as SDE Interns",
    role: "SDE Intern",
    highlights: "Stipend: 40K per month",
  },
];

const recruiterHighlights = [
  {
    company: "PayPal Internship Opportunities as AI ML Intern",
    role: "SDE Intern",
    highlights: "Stipend: INR 1 Lakh",
  },
  {
    company: "IBM as Software Developer Intern",
    role: "SD Intern",
    highlights: "Stipend: 60,000 - 90,000 /month",
  },
  {
    company: "Google as Associate Software Developer Intern",
    role: "SD Intern",
    highlights: "Stipend: INR 1.25 Lacs approx",
  },
  {
    company: "Microsoft as Software Engineering Explore Intern",
    role: "SE Intern",
    highlights: "Stipend: 1 - 1.5 lacs approx",
  },
  {
    company: "Flipkart <Girls Wanna Code/> 7.0",
    role: "SE Intern",
    highlights: "Stipend: INR 1 Lacs per month with 32 LPA",
  },
  {
    company: "Microsoft as Cloud Network Engineering INTERN",
    role: "Cloud Network Engineering Intern",
    highlights: "Stipend: 1 Lakh /month",
  },
  {
    company: "Microsoft as Software Engineering Intern",
    role: "SE Intern",
    highlights: "Expected stipend: INR 1.25 Lacs per month",
  },
];

const readinessMetrics = [
  {
    metric: "GitHub Profile",
    purpose: "Proof of coding & technical logic",
    mandatoryFor: "All CS students",
  },
  {
    metric: "Project Portfolio",
    purpose: "Showcasing real-world applications",
    mandatoryFor: "All CS students",
  },
  {
    metric: "LinkedIn Profile",
    purpose: "Professional networking & brand building",
    mandatoryFor: "All CS students",
  },
  {
    metric: "Internal Assessment",
    purpose: "Linked to internship readiness scores",
    mandatoryFor: "All CS students",
  },
];

const studentSupport = [
  {
    action: "Skill Building",
    department: "Technical training & hackathons",
    support: "Encourage consistent practice",
  },
  {
    action: "Applications",
    department: "Curating & sharing verified links",
    support: "Monitor application deadlines",
  },
  {
    action: "Soft Skills",
    department: "Interview prep & resume reviews",
    support: "Motivate for hybrid opportunities",
  },
];

const outcomeTabs = [
  {
    id: "2018-2022",
    label: "2018-2022",
    totalStudents: 68,
    placedStudents: 60,
    avgPackage: "5.12 LPA",
    placementRate: "88.2%",
    description:
      "This batch established the baseline with strong early conversion and consistent internship-to-placement movement.",
    purpleValue: 68,
    greenValue: 60,
    dremeOffers: 8,
  },
  {
    id: "2019-2023",
    label: "2019-2023",
    totalStudents: 136,
    placedStudents: 121,
    avgPackage: "5.74 LPA",
    placementRate: "89.0%",
    description:
      "This cycle shows healthy growth in hiring volume while maintaining strong placement conversion.",
    purpleValue: 136,
    greenValue: 121,
    dremeOffers: 12,
  },
  {
    id: "2020-2024",
    label: "2020-2024",
    totalStudents: 200,
    placedStudents: 173,
    avgPackage: "5.96 LPA",
    placementRate: "86.4%",
    description:
      "The 2020-2024 cycle demonstrates consistent placement momentum with broad participation from product and service-based recruiters.",
    purpleValue: 200,
    greenValue: 173,
    dremeOffers: 27,
  },
  {
    id: "2021-2025",
    label: "2021-2025",
    totalStudents: 206,
    placedStudents: 190,
    avgPackage: "6.14 LPA",
    placementRate: "88.1%",
    description:
      "The 2021-2025 cycle reflects one of the strongest conversion trends, supported by repeated recruiter engagement and interview readiness training.",
    purpleValue: 206,
    greenValue: 190,
    dremeOffers : 21
  },
  {
    id: "2022-2026",
    label: "2022-2026 Ongoing",
    totalStudents: 210,
    placedStudents: 168,
    avgPackage: "5.81 LPA",
    placementRate: "80.0%",
    description:
      "The current 2022-2026 cycle is ongoing with active recruiter participation and continued support in the final stages.",
    purpleValue: 210,
    greenValue: 168,
    dremeOffers : 8
  },
];

const salaryOffersLeft = [
  ["KUMARI CHETANA", "Amazon", "45 LPA"],
  ["STUTI AGRAWAL", "Razorpay", "35 LPA"],
  ["PRAVEEN KAUSHIK", "AMD", "32 LPA"],
  ["YASHASVI SAXENA", "Groww", "19 LPA"],
  ["SHREYA CHOPRA", "Myntra", "18 LPA"],
  ["ANKIT SINGH", "Accely", "14 LPA"],
  ["NIKHIL SAXENA", "Josh Technology", "12.93 LPA"],
];

const salaryOffersRight = [
  ["DEEKSHA DHAKA", "UKG", "12.19 LPA"],
  ["GURBANI KAUR", "UKG", "12.19 LPA"],
  ["ADITYA BISWARI GUPTA", "Infosys", "11 LPA"],
  ["ADITYA MADWAL", "Infosys", "11 LPA"],
  ["RISHIKA AGARWAL", "Infosys", "11 LPA"],
  ["SHIVAM TYAGI", "Infosys", "11 LPA"],
  ["SIDDHARTH YADAV", "MeetMux", "12.93 LPA"],
];

function SectionHeading({ eyebrow, title, description, highlight }) {
  return (
    <div className="mb-6 md:mb-8 text-center">
      <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-[#f15b20] mb-3">
        {eyebrow}
      </p>
      <AnimatedHeadline
        highlight={highlight}
        className="text-3xl md:text-5xl font-serif font-semibold text-[#113959] leading-tight"
      >
        {title}
      </AnimatedHeadline>
      {description ? (
        <p className="max-w-3xl mx-auto mt-4 text-sm md:text-base text-slate-600 leading-7">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function DataTable({ headers, rows, compact = false }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-[#113959] text-white">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className={`px-4 py-4 text-sm md:text-base font-semibold ${compact ? "whitespace-nowrap" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-4 align-top text-sm md:text-base text-slate-700 border-t border-slate-200"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OfferBoard({ title, rows }) {
  return (
    <div className="rounded-4xl border border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_30px_80px_rgba(90,56,180,0.12)] p-5 md:p-7">
      <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[#f15b20] text-center mb-6">
        {title}
      </h3>
      <div className="space-y-3">
        {rows.map(([student, company, packageLabel]) => (
          <div
            key={`${student}-${company}`}
            className="grid grid-cols-[1.2fr_auto_auto] gap-3 items-center rounded-2xl bg-white/80 px-4 py-3 shadow-sm"
          >
            <div className="min-w-0">
              <p className="font-bold text-slate-700 text-sm md:text-base truncate">
                {student}
              </p>
              <p className="text-xs md:text-sm text-slate-500 truncate">{company}</p>
            </div>
            <span className="rounded-full bg-[#113959]/10 px-3 py-2 text-xs md:text-sm font-semibold text-[#113959] whitespace-nowrap">
              {company}
            </span>
            <span className="rounded-full bg-[#f15b20] px-4 py-2 text-sm md:text-base font-bold text-white whitespace-nowrap">
              {packageLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PlacementsPage = () => {
  const [activeOutcomeId, setActiveOutcomeId] = useState(outcomeTabs[0].id);
  const activeOutcome = outcomeTabs.find((tab) => tab.id === activeOutcomeId) || outcomeTabs[0];
  const coveredPercent = activeOutcome.totalStudents > 0
    ? Number(((activeOutcome.placedStudents / activeOutcome.totalStudents) * 100).toFixed(1))
    : 0;
  const uncoveredPercent = Number((100 - coveredPercent).toFixed(1));
  const totalSharePercent = activeOutcome.totalStudents > 0
    ? Number(((activeOutcome.greenValue / activeOutcome.totalStudents) * 100).toFixed(1))
    : 0;
  const placementRate = activeOutcome.purpleValue > 0
    ? `${((activeOutcome.greenValue / activeOutcome.purpleValue) * 100).toFixed(1)}%`
    : "0.0%";

  return (
    <div className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <SectionHeading
          eyebrow="Placements"
          title="Placement Performance, Readiness, and Opportunities"
          highlight="Performance"
          description="A consolidated view of internship pathways, student readiness tracking, year-wise outcomes, salary highlights, and parent-faculty support for stronger industry preparation."
        />

        <section className="mb-12 md:mb-16">
          <div className="rounded-4xl bg-white border border-slate-200 p-6 md:p-8 shadow-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#f15b20] mb-3">Outcomes</p>
            <AnimatedHeadline as="h2" highlight="Overview" className="text-2xl md:text-4xl font-serif font-semibold leading-tight text-[#113959] mb-4">
              Placement Data Overview: 2022 to 2026
            </AnimatedHeadline>
            <p className="text-slate-600 leading-7 mb-6 max-w-3xl">
              Year-wise average package data gives a quick view of progress across recent batches.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
              {outcomeTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveOutcomeId(tab.id)}
                  className={`px-4 py-2 rounded-full border text-sm md:text-base font-semibold transition ${
                    activeOutcomeId === tab.id
                      ? "bg-[#113959] text-white border-[#113959]"
                      : "bg-white text-[#113959] border-slate-300 hover:border-[#113959]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-[#113959] mb-4">
                  {activeOutcome.label} Snapshot
                </h3>
                <p className="text-slate-600 leading-7 mb-5">{activeOutcome.description}</p>

                <div className="space-y-3">
                  <div className="rounded-2xl bg-[#113959]/5 border border-[#113959]/10 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Total Students</p>
                    <p className="text-2xl font-bold text-[#113959]">{activeOutcome.totalStudents}</p>
                  </div>
                  <div className="rounded-2xl bg-[#f15b20]/5 border border-[#f15b20]/15 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Placed Students</p>
                    <p className="text-2xl font-bold text-[#f15b20]">{activeOutcome.placedStudents}</p>
                  </div>
                  <div className="rounded-2xl bg-[#9ecb3c]/10 border border-[#9ecb3c]/20 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Average Package</p>
                    <p className="text-2xl font-bold text-[#2e4d0f]">{activeOutcome.avgPackage}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Placement Rate</p>
                    <p className="text-2xl font-bold text-slate-800">{placementRate}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-[#113959] mb-4">
                  Batch Trend Pie Chart ({activeOutcome.label})
                </h3>

                <div className="flex flex-col items-center justify-center py-2 md:py-6">
                  <div
                    className="h-56 w-56 md:h-64 md:w-64 rounded-full border border-slate-200"
                    style={{
                      background: `conic-gradient(#9ecb3c 0% ${coveredPercent}%, #e2e8f0 ${coveredPercent}% 100%)`,
                    }}
                    title={`${activeOutcome.label}: ${activeOutcome.placedStudents}/${activeOutcome.totalStudents} placed (${coveredPercent}%)`}
                  />

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Covered Area</p>
                      <p className="text-2xl font-bold text-[#739d1f]">{coveredPercent.toFixed(1)}%</p>
                      <p className="text-xs text-slate-500 mt-1">{activeOutcome.placedStudents} placed students</p>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-slate-500">dream offers</p>
                      <p className="text-2xl font-bold text-slate-600">{((+(activeOutcome.dremeOffers)/(activeOutcome.totalStudents)) * 100).toFixed(1)}%</p>
                      <p className="text-xs text-slate-500 mt-1">{activeOutcome.dremeOffers} dream offers</p>
                    </div>
                  </div>

                  

                
                </div>
              </div>
            </div>

            {/* <p className="mt-4 text-sm text-slate-500">{activeOutcome.label} - Ongoing Tracking</p> */}
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <div className="rounded-4xl bg-[#113959] text-white p-6 md:p-8 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70 mb-3">Career pipelines</p>
            <AnimatedHeadline as="h2" highlight="Hackathon" className="text-2xl md:text-4xl font-serif font-semibold leading-tight mb-4">
              Internship and Hackathon Highlights
            </AnimatedHeadline>
            <p className="text-white/80 leading-7 mb-6 max-w-3xl">
              These opportunities reflect the range of internships, women-focused mentoring tracks,
              and competitive hackathons available to students.
            </p>
            <h3 className="text-lg font-semibold mb-3 text-[#f9c7b1]">Selected opportunities</h3>
            <DataTable
              headers={["Company", "Role", "Highlights"]}
              rows={internshipHighlights.map((item) => [item.company, item.role, item.highlights])}
            />
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <div className="rounded-4xl bg-[#113959] text-white p-6 md:p-8 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70 mb-3">Recruitment support</p>
            <AnimatedHeadline as="h2" highlight="Internship" className="text-2xl md:text-4xl font-serif font-semibold leading-tight mb-4">
              Recruiter-Linked Internship Opportunities
            </AnimatedHeadline>
            <p className="text-white/80 leading-7 mb-6 max-w-3xl">
              A separate list of high-visibility recruiter programs and internships to keep the page easy to scan.
            </p>
            <DataTable
              headers={["Company", "Role", "Highlights"]}
              rows={recruiterHighlights.map((item) => [item.company, item.role, item.highlights])}
            />
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <div className="rounded-4xl bg-white border border-slate-200 p-6 md:p-8 shadow-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#f15b20] mb-3">Support system</p>
            <AnimatedHeadline as="h2" highlight="Readiness" className="text-2xl md:text-4xl font-serif font-semibold leading-tight text-[#113959] mb-4">
              Student Readiness & Tracking
            </AnimatedHeadline>
            <p className="text-slate-600 leading-7 mb-6 max-w-3xl">
              The readiness model focuses on proof of work, visibility, and assessment-backed preparation.
            </p>
            <DataTable
              headers={["Metric", "Purpose", "Mandatory For"]}
              rows={readinessMetrics.map((item) => [item.metric, item.purpose, item.mandatoryFor])}
            />
          </div>
        </section>

        

        <section className="mb-12 md:mb-16">
          <div className="rounded-4xl bg-white border border-[#e5d7ff] p-6 md:p-8 shadow-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#f15b20] mb-3">Mentorship</p>
            <AnimatedHeadline as="h2" highlight="Synergy" className="text-2xl md:text-4xl font-serif font-semibold leading-tight text-[#113959] mb-4">
              The Path Ahead: Parent-Faculty Synergy
            </AnimatedHeadline>
            <p className="text-slate-700 leading-7 mb-6 max-w-3xl">
              Parents and faculty can collaborate around skills, applications, and communication so students stay aligned with recruitment timelines.
            </p>
            <DataTable
              headers={["Action Item", "Department Responsibility", "Parent Support"]}
              rows={studentSupport.map((item) => [item.action, item.department, item.support])}
            />
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <div className="rounded-4xl bg-[#113959] text-white p-6 md:p-8 shadow-2xl mb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70 mb-3">Placement snapshots</p>
            <AnimatedHeadline as="h2" highlight="Salary" className="text-2xl md:text-4xl font-serif font-semibold leading-tight mb-4">
              Recent Salary Offers
            </AnimatedHeadline>
            <p className="text-white/80 leading-7 max-w-3xl">
              A quick look at recent high-value offers across the program.
            </p>
          </div>
          <div className="space-y-8">
            <OfferBoard title="Recent Salary Offers" rows={[...salaryOffersLeft , ...salaryOffersRight]} />
            {/* <OfferBoard title="Recent Salary Offers" rows={} /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlacementsPage;
