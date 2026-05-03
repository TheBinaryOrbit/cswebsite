"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedHeadline from "../AnimatedHeadline";
import { FaChartPie, FaUsers, FaBriefcase, FaPercentage, FaBuilding, FaChartLine } from "react-icons/fa";

/* ─── Variants ─────────────────────────────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

/* ─── Data ─────────────────────────────────────────────────── */
const placementData = [
  {
    id: "2018-2022",
    label: "2018-2022",
    total: 68,
    placed: 60,
    avg: "5.12 LPA",
    rate: 88.2,
    desc: "This batch established the baseline with strong early conversion and consistent internship-to-placement movement.",
  },
  {
    id: "2019-2023",
    label: "2019-2023",
    total: 136,
    placed: 121,
    avg: "5.74 LPA",
    rate: 89.0,
    desc: "This cycle shows healthy growth in hiring volume while maintaining strong placement conversion.",
  },
  {
    id: "2020-2024",
    label: "2020-2024",
    total: 199,
    placed: 172,
    avg: "5.96 LPA",
    rate: 86.4,
    desc: "The 2020-2024 cycle demonstrates consistent placement momentum with broad participation from product and service-based recruiters.",
  },
  {
    id: "2021-2025",
    label: "2021-2025",
    total: 210,
    placed: 185,
    avg: "6.14 LPA",
    rate: 88.1,
    desc: "The 2021-2025 cycle reflects one of the strongest conversion trends, supported by repeated recruiter engagement and interview readiness training.",
  },
  {
    id: "2022-2026",
    label: "2022-2026 Ongoing",
    total: 210,
    placed: 165,
    avg: "5.96 LPA",
    rate: 78.6,
    desc: "The current 2022-2026 cycle is ongoing with active recruiter participation and continued support in the final stages.",
  },
];

const companies = [
  { name: "Cisco", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpN6aBizk7tcnKkgX8_JDOLEl8KjnoHg4kwQ&s" },
  { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
  { name: "ServiceNow", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/ServiceNow_logo.svg/3840px-ServiceNow_logo.svg.png" },
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name: "Capgemini", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9R4TOuPk3d0ohT9KoG2fiSjaDgAHi9XIJHXVw&s" },
  { name: "Cognizant", logo: "https://1000logos.net/wp-content/uploads/2021/09/Cognizant-Logo.jpg" },
  // { name: "TCS", logo: "https://www.tcs.com/content/dam/global-tcs/en/images/header/tcs-logo-1.svg" },
  // { name: "Wipro", logo: "https://1000logos.net/wp-content/uploads/2021/04/Wipro-Logo-1998.png" },
  { name: "HCL", logo: "https://1000logos.net/wp-content/uploads/2021/09/HCL-Logo.png" },
];

const duplicatedCompanies = [...companies, ...companies];

/* ─── Components ───────────────────────────────────────────── */

function SimplePieChart({ percentage, inView }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="transparent" stroke="hsl(210 40% 96.1%)" strokeWidth="10" />
        <motion.circle
          cx="60" cy="60" r={radius} fill="transparent" stroke="hsl(22.8 95.8% 55.5%)" strokeWidth="10"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold text-[#113959]">{percentage}<span className="text-2xl">%</span></span>
        <span className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Placed</span>
      </div>
    </div>
  );
}

const Placements = () => {
  const [activeTab, setActiveTab] = useState("2022-2026");
  const rawData = placementData.find(d => d.id === activeTab);

  const data = {
    ...rawData,
    rate: parseFloat(((rawData.placed / rawData.total) * 100).toFixed(1)),
    notPlaced: rawData.total - rawData.placed,
  };

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="w-full bg-slate-50 py-20 sm:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto bg-[#0a2840] p-8 rounded-3xl">

        {/* Header Section */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#f15b20] uppercase tracking-widest text-sm font-bold mb-3"
          >
            Career Outcomes
          </motion.p>
          <AnimatedHeadline highlight="Success" className="text-white text-4xl md:text-5xl font-serif">
            Placement Overview
          </AnimatedHeadline>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-300 mt-4 max-w-2xl mx-auto"
          >
            Explore our impressive placement records, showcasing the success of our students across various industries and top companies.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {placementData.map((year) => (
            <motion.button
              key={year.id}
              onClick={() => setActiveTab(year.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#f15b20] ${activeTab === year.id
                  ? "bg-white text-[#113959] shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
                }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
            >
              {year.label}
            </motion.button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left: Snapshot Card */}
          <motion.div
            key={activeTab + "left"}
            initial="hidden" animate="visible" variants={fadeInUp}
            className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
          >
            <h3 className="text-2xl font-bold text-[#113959] mb-2">Batch Snapshot: <span className="text-[#f15b20]">{data.label}</span></h3>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">{data.desc}</p>

            <div className="grid grid-cols-2 gap-4">
              {([
                { label: "Total Students", val: data.total, icon: <FaUsers />, color: "text-blue-600" },
                { label: "Placed", val: data.placed, icon: <FaBriefcase />, color: "text-green-600" },
                { label: "Avg. Package", val: data.avg, icon: <FaChartLine />, color: "text-orange-500" },
                { label: "Placement Rate", val: `${data.rate}%`, icon: <FaPercentage />, color: "text-purple-600" }
              ]).map((stat, i) => (
                <div key={i} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 flex flex-col items-start justify-center">
                  <div className={`text-2xl mb-2 ${stat.color}`}>{stat.icon}</div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</span>
                  <span className="text-2xl font-extrabold text-slate-800">{stat.val}</span>
                </div>
              ))}
            </div>

            <Link to="/placements" className="mt-8 flex items-center justify-center gap-2 w-full bg-[#f15b20] text-white py-3.5 rounded-xl font-bold hover:bg-[#d94f1a] transition-all duration-300 transform hover:scale-[1.02]">
              View Detailed Report
            </Link>
          </motion.div>

          {/* Right: Chart & Recruiters */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Pie Chart Card */}
            <motion.div
              key={activeTab + "right"}
              initial="hidden" animate="visible" variants={fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-[#113959] mb-1">Placement Rate</h3>
                <p className="text-sm text-slate-500 mb-4">A visual representation of the placement success for the {activeTab} batch.</p>
                <div className="flex justify-center md:justify-start">
                  <SimplePieChart percentage={data.rate} inView={inView} />
                </div>
              </div>

              <div className="w-full md:w-56 space-y-4 self-stretch flex flex-col">
                <div className="flex-1 p-4 border border-green-200 bg-green-50/50 rounded-2xl flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-green-700">
                    <FaChartPie />
                    <p className="text-xs font-bold uppercase">Placed</p>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mt-1">{data.rate}%</p>
                  <p className="text-xs text-gray-500">{data.placed} of {data.total} students</p>
                </div>
                <div className="flex-1 p-4 border border-slate-200 bg-slate-50/50 rounded-2xl flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-slate-600">
                    <FaUsers />
                    <p className="text-xs font-bold uppercase">Not Placed</p>
                  </div>
                  <p className="text-3xl font-bold text-slate-500 mt-1">{(100 - data.rate).toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">{data.notPlaced} remaining</p>
                </div>
              </div>
            </motion.div>

            {/* Recruiter Section */}
            <div className="bg-white rounded-3xl p-8 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#113959]">Top Recruiters</h3>
                <span className="bg-orange-50 text-[#f15b20] text-sm font-bold px-3 py-1 rounded-full">
                  300+ Companies
                </span>
              </div>

              <div className="relative h-16 flex items-center overflow-hidden">
                {/* Fade Edges for a smoother look */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white via-transparent to-white" />

                <motion.div
                  className="flex gap-12 items-center w-max" // w-max is crucial to keep logos in one line
                  animate={{ x: ["0%", "-50%"] }} // Animate to -50% because we doubled the content
                  transition={{
                    ease: "linear",
                    duration: 20, // Adjust speed here
                    repeat: Infinity,
                  }}
                >
                  {[...companies, ...companies].map((brand, i) => (
                    <div
                      key={`company-${i}`}
                      className="flex-shrink-0 w-32 h-12 flex items-center justify-center"
                    >
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain  transition-all"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Placements;