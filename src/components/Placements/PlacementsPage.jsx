import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimatedHeadline from "../AnimatedHeadline";
import SimplePieChart from "./SimplePieChart";
import { FaChartLine, FaUsers, FaBriefcase, FaEnvelope, FaWallet } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const companies = [
  { name: "Cisco", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpN6aBizk7tcnKkgX8_JDOLEl8KjnoHg4kwQ&s" },
  { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
  { name: "ServiceNow", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/ServiceNow_logo.svg/3840px-ServiceNow_logo.svg.png" },
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name: "Capgemini", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9R4TOuPk3d0ohT9KoG2fiSjaDgAHi9XIJHXVw&s" },
  { name: "Cognizant", logo: "https://1000logos.net/wp-content/uploads/2021/09/Cognizant-Logo.jpg" },
  { name: "HCL", logo: "https://1000logos.net/wp-content/uploads/2021/09/HCL-Logo.png" },
];

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
    id: "2020-2024",
    label: "2020-2024",
    totalStudents: 200,
    placedStudents: 173,
    avgPackage: "5.77 LPA",
    placementRate: "86.4%",
    description:
      "The 2020-2024 cycle demonstrates consistent placement momentum with broad participation from product and service-based recruiters.",
    purpleValue: 200,
    greenValue: 173,
    dremeOffers: 19,
    dreamAvgPackage: "14.84 LPA",
    highestPlacement: "60 LPA",
    totalOffers: 247,
  },
  {
    id: "2021-2025",
    label: "2021-2025",
    totalStudents: 206,
    placedStudents: 190,
    avgPackage: "5.88 LPA",
    placementRate: "88.1%",
    description:
      "The 2021-2025 cycle reflects one of the strongest conversion trends, supported by repeated recruiter engagement and interview readiness training.",
    purpleValue: 206,
    greenValue: 190,
    dremeOffers: 39,
    dreamAvgPackage: "11.49 LPA",
    highestPlacement: "13.5 LPA",
    totalOffers: 271,
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
    dremeOffers: 22,
    dreamAvgPackage: "14.52 LPA",
    highestPlacement: "45 LPA",
    totalOffers: 226,
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

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
    <div className="w-full bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <SectionHeading
          eyebrow="Placements"
          title="Placement Performance, Readiness, and Opportunities"
          highlight="Performance"
          description="A consolidated view of internship pathways, student readiness tracking, year-wise outcomes, salary highlights, and parent-faculty support for stronger industry preparation."
        />

        <section className="mb-12 md:mb-16">
          <div className="rounded-4xl bg-[#0a2840] p-6 md:p-8 lg:p-12 shadow-2xl">
            {/* Header */}
            <div className="mb-8 md:mb-12 text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[#f15b20] uppercase tracking-widest text-xs sm:text-sm font-bold mb-3"
              >
                Career Outcomes
              </motion.p>
              <AnimatedHeadline as="h2" highlight="Overview" className="text-white text-2xl sm:text-4xl md:text-5xl font-serif font-semibold">
                Placement Data Overview
              </AnimatedHeadline>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-white/70 mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4 leading-relaxed"
              >
                Year-wise average package data gives a quick view of progress across recent batches.
              </motion.p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
              {outcomeTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveOutcomeId(tab.id)}
                  className={`px-4 py-2 rounded-full border text-sm md:text-base font-semibold transition ${
                    activeOutcomeId === tab.id
                      ? "bg-white text-[#113959] border-white"
                      : "bg-transparent text-white border-white/40 hover:border-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start">

              {/* Left: Snapshot Card */}
              <motion.div
                key={activeOutcomeId + "left"}
                initial="hidden" animate="visible" variants={fadeInUp}
                className="col-span-1 md:col-span-1 lg:col-span-5 bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-md border border-slate-200 w-full"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0a2840] mb-2 text-center sm:text-left">
                  Batch Snapshot: <span className="text-[#f15b20]">{activeOutcome.label}</span>
                </h3>
                <p className="text-slate-500 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm leading-relaxed text-center sm:text-left">
                  {activeOutcome.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { label: "Highest Placement", val: activeOutcome.highestPlacement, icon: <FaChartLine />, color: "text-orange-500" },
                    { label: "Avg Package", val: activeOutcome.avgPackage, icon: <FaWallet />, color: "text-blue-600" },
                    { label: "Placed", val: activeOutcome.placedStudents, icon: <FaBriefcase />, color: "text-green-600" },
                    { label: "Total Offers", val: activeOutcome.totalOffers, icon: <FaEnvelope />, color: "text-purple-600" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
                      <div className={`text-lg sm:text-xl md:text-2xl sm:mb-1 md:mb-2 ${stat.color} shrink-0`}>{stat.icon}</div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 truncate">{stat.label}</span>
                        <span className="text-base sm:text-lg md:text-2xl font-extrabold text-[#0a2840]">{stat.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Chart & Recruiters */}
              <div className="col-span-1 md:col-span-1 lg:col-span-7 flex flex-col gap-4 sm:gap-6 md:gap-8 w-full">

                {/* Pie Chart Card */}
                <motion.div
                  key={activeOutcomeId + "right"}
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-md border border-slate-200 flex flex-col md:flex-row lg:flex-row items-center justify-between gap-4 sm:gap-6"
                >
                  <div className="flex-1 text-center md:text-left lg:text-left w-full md:w-auto">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0a2840] mb-1">Placement Rate</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">A visual representation of the placement success for the {activeOutcome.label} batch.</p>
                    <div className="flex justify-center md:justify-start lg:justify-start">
                      <div className="scale-75 sm:scale-90 md:scale-100 origin-top">
                        <SimplePieChart percentage={coveredPercent} inView={inView} />
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-56 lg:w-56 space-y-3 sm:space-y-4 self-stretch flex flex-col">
                    <div className="flex-1 p-4 border border-blue-200 bg-white rounded-2xl shadow-sm flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-blue-700">
                        <FaChartLine className="text-xs sm:text-sm md:text-base shrink-0" />
                        <p className="text-[10px] sm:text-xs font-bold uppercase">Avg Package (Dream Offers)</p>
                      </div>
                      <p className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-600 mt-1">{activeOutcome.dreamAvgPackage || activeOutcome.avgPackage}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500">Of Our best Students</p>
                    </div>
                    <div className="flex-1 p-4 border border-purple-200 bg-white rounded-2xl shadow-sm flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-purple-700">
                        <FaBriefcase className="text-xs sm:text-sm md:text-base shrink-0" />
                        <p className="text-[10px] sm:text-xs font-bold uppercase">Dream Offers</p>
                      </div>
                      <p className="text-lg sm:text-2xl md:text-3xl font-bold text-purple-600 mt-1">{activeOutcome.dremeOffers}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500">Premium Companies</p>
                    </div>
                  </div>
                </motion.div>

                {/* Recruiter Section */}
                <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-100 overflow-x-auto shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0a2840]">Top Recruiters</h3>
                    <span className="bg-orange-100 text-[#f15b20] text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                      300+ Companies
                    </span>
                  </div>

                  <div className="relative h-10 sm:h-12 md:h-16 flex items-center overflow-hidden">
                    <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-r from-white via-transparent to-white" />
                    <motion.div
                      className="flex gap-6 sm:gap-8 md:gap-12 items-center w-max"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        ease: "linear",
                        duration: 20,
                        repeat: Infinity,
                      }}
                    >
                      {[...companies, ...companies].map((brand, i) => (
                        <div
                          key={`company-${i}`}
                          className="shrink-0 w-20 sm:w-24 md:w-32 h-8 sm:h-10 md:h-12 flex items-center justify-center"
                        >
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <div className="rounded-4xl bg-[#0a2840] text-white p-6 md:p-8 shadow-2xl">
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
          <div className="rounded-4xl bg-[#0a2840] text-white p-6 md:p-8 shadow-2xl">
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
            <AnimatedHeadline as="h2" highlight="Readiness" className="text-2xl md:text-4xl font-serif font-semibold leading-tight text-[#0a2840] mb-4">
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
            <AnimatedHeadline as="h2" highlight="Synergy" className="text-2xl md:text-4xl font-serif font-semibold leading-tight text-[#0a2840] mb-4">
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
          <div className="rounded-4xl bg-[#0a2840] text-white p-6 md:p-8 shadow-2xl mb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70 mb-3">Placement snapshots</p>
            <AnimatedHeadline as="h2" highlight="Salary" className="text-2xl md:text-4xl font-serif font-semibold leading-tight mb-4">
              Recent Salary Offers
            </AnimatedHeadline>
            <p className="text-white/80 leading-7 max-w-3xl">
              A quick look at recent high-value offers across the program.
            </p>
          </div>
          <div className="space-y-8">
            <OfferBoard title="Recent Salary Offers" rows={[...salaryOffersLeft, ...salaryOffersRight]} />
            {/* <OfferBoard title="Recent Salary Offers" rows={} /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlacementsPage;
