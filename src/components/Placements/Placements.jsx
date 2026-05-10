"use client";
import { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimatedHeadline from "../AnimatedHeadline";
import { Link } from "react-router-dom";
import { FaChartPie, FaUsers, FaBriefcase, FaPercentage, FaBuilding, FaChartLine, FaDollarSign, FaWallet, FaEnvelope } from "react-icons/fa";
import { FaLetterboxd, FaMoneyBillTransfer } from "react-icons/fa6";

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
    total: 200,
    placed: 173,
    avg: "5.96 LPA",
    rate: 86.5,
    dreamOffers: 19,
    desc: "The 2020-2024 cycle demonstrates consistent placement momentum with broad participation from product and service-based recruiters.",
  },
  {
    id: "2021-2025",
    label: "2021-2025",
    total: 206,
    placed: 190,
    avg: "6.14 LPA",
    rate: 88.1,
    dreamOffers: 39,
    desc: "The 2021-2025 cycle reflects one of the strongest conversion trends, supported by repeated recruiter engagement and interview readiness training.",
  },
  {
    id: "2022-2026",
    label: "2022-2026 Ongoing",
    total: 210,
    placed: 168,
    avg: "5.81 LPA",
    rate: 80.0,
    dreamOffers: 22,
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

import SimplePieChart from "./SimplePieChart";

const Placements = () => {
  const activeTab = "2021-2025";
  const rawData = placementData.find(d => d.id === activeTab);

  const data = {
    ...rawData,
    rate: parseFloat(((rawData.placed / rawData.total) * 100).toFixed(1)),
    notPlaced: rawData.total - rawData.placed,
  };

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="w-full bg-white py-12 sm:py-20 lg:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-4xl border border-slate-200 shadow-xl">

        {/* Header Section */}
        <div className="mb-8 md:mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#f15b20] uppercase tracking-widest text-xs sm:text-sm font-bold mb-3"
          >
            Career Outcomes
          </motion.p>
          <AnimatedHeadline highlight="Success" className="text-[#113959] text-3xl sm:text-4xl md:text-5xl font-serif font-semibold">
            Placement Overview
          </AnimatedHeadline>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4 leading-relaxed"
          >
            Explore our impressive placement records, showcasing the success of our students across various industries and top companies.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start">

          {/* Left: Snapshot Card */}
          <motion.div
            key={activeTab + "left"}
            initial="hidden" animate="visible" variants={fadeInUp}
            className="col-span-1 md:col-span-1 lg:col-span-5 bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-md border border-slate-200 w-full"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#113959] mb-2 text-center sm:text-left">Batch Snapshot: <span className="text-[#f15b20]">{data.label}</span></h3>
            <p className="text-slate-500 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm leading-relaxed text-center sm:text-left">{data.desc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {([
                { label: "Highest Placement", val: "45 LPA", icon: <FaChartLine />, color: "text-orange-500", bg: "bg-white" },
                { label: "Avg Package", val: data.avg, icon: <FaWallet />, color: "text-blue-600", bg: "bg-white" },
                { label: "Placed", val: data.placed, icon: <FaBriefcase />, color: "text-green-600", bg: "bg-white" },
                { label: "Total Offers", val: 261, icon: <FaEnvelope />, color: "text-purple-600", bg: "bg-white" }
              ]).map((stat, i) => (
                <div key={i} className={`${stat.bg} p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-0`}>
                  <div className={`text-lg sm:text-xl md:text-2xl sm:mb-1 md:sm:mb-2 ${stat.color} shrink-0`}>{stat.icon}</div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 truncate">{stat.label}</span>
                    <span className="text-base sm:text-lg md:text-2xl font-extrabold text-[#113959]">{stat.val}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/placements" className="bg-[#f15b20] text-white text-sm font-semibold px-4 py-2 rounded-xl mt-6 inline-block transition hover:bg-[#d14e1a] w-full text-center ">
              View Detailed Placement Report &rarr;
            </Link>

          </motion.div>

          {/* Right: Chart & Recruiters */}
          <div className="col-span-1 md:col-span-1 lg:col-span-7 flex flex-col gap-4 sm:gap-6 md:gap-8 w-full">

            {/* Pie Chart Card */}
            <motion.div
              key={activeTab + "right"}
              initial="hidden" animate="visible" variants={fadeInUp}
              className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-md border border-slate-200 flex flex-col md:flex-row lg:flex-row items-center justify-between gap-4 sm:gap-6"
            >
              <div className="flex-1 text-center md:text-left lg:text-left w-full md:w-auto">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#113959] mb-1">Placement Rate</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">A visual representation of the placement success for the {activeTab} batch.</p>
                <div className="flex justify-center md:justify-start lg:justify-start">
                  <div className="scale-75 sm:scale-90 md:scale-100 origin-top">
                    <SimplePieChart percentage={data.rate} inView={inView} />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-56 lg:w-56 space-y-3 sm:space-y-4 self-stretch flex flex-col">
                <div className="flex-1 p-4 border border-blue-200 bg-white rounded-2xl shadow-sm flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-blue-700">
                    <FaChartLine className="text-xs sm:text-sm md:text-base shrink-0" />
                    <p className="text-[10px] sm:text-xs font-bold uppercase">Avg Package (Dream Offers)</p>
                  </div>
                  <p className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-600 mt-1">{data.avg}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500">Of Our best Students</p>
                </div>
                <div className="flex-1 p-4 border border-purple-200 bg-white rounded-2xl shadow-sm flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-purple-700">
                    <FaBriefcase className="text-xs sm:text-sm md:text-base shrink-0" />
                    <p className="text-[10px] sm:text-xs font-bold uppercase">Dream Offers</p>
                  </div>
                  <p className="text-lg sm:text-2xl md:text-3xl font-bold text-purple-600 mt-1">{data.dreamOffers || 0}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500">Premium Companies</p>
                </div>
              </div>
            </motion.div>

            {/* Recruiter Section */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-100 overflow-x-auto shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#113959]">Top Recruiters</h3>
                <span className="bg-orange-100 text-[#f15b20] text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                  300+ Companies
                </span>
              </div>

              <div className="relative h-10 sm:h-12 md:h-16 flex items-center overflow-hidden">
                {/* Fade Edges for a smoother look */}
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
    </div>
  );
};

export default Placements;