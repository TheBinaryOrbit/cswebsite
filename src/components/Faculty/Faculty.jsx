"use client";
import { FiUser } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { facultyData } from "../../data/facultyData";
import AnimatedHeadline from "../AnimatedHeadline";

/* ─── Variants ─────────────────────────────────────────────── */
const fromLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};
const fromRight = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};
const fromBottom = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay },
  }),
};
const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ─── AnimatedSection ───────────────────────────────────────── */
function AnimatedSection({ children, variants, custom, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      custom={custom}
    >
      {children}
    </motion.div>
  );
}

/* ─── Faculty Card ──────────────────────────────────────────── */
function FacultyCard({ faculty, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariant}
      whileHover={{ scale: 1.05, y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate(`/faculty/${faculty.slug}`)}
      className="relative flex-none w-[78vw] max-w-[220px] sm:w-[42vw] sm:max-w-[240px] md:w-[300px] h-[260px] sm:h-[300px] md:h-[300px] rounded-3xl overflow-hidden bg-[#ebebeb] cursor-pointer"
    >
      {/* Image */}
      <motion.img
        src={faculty.image}
        alt={faculty.name}
        className="w-full h-full object-cover"
        animate={{
          filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
          scale: hovered ? 1.08 : 1.02,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: hovered ? 0.28 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Social icons — top right, staggered on hover */}
      {/* <div className="absolute top-3 right-3 flex flex-col gap-2">
        <AnimatePresence>
          {hovered && (
            <>
              
              <motion.a
                key="gmail"
                href={`mailto:${faculty.email}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, x: 20, scale: 0.7 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.7 }}
                transition={{ duration: 0.22, delay: 0, ease: "easeOut" }}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ background: "#EA4335" }}
              >
                <MdEmail size={15} />
              </motion.a>

              
              <motion.a
                key="linkedin"
                href={faculty.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, x: 20, scale: 0.7 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.7 }}
                transition={{ duration: 0.22, delay: 0.08, ease: "easeOut" }}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ background: "#0077B5" }}
              >
                <FaLinkedinIn size={13} />
              </motion.a>

              <Link
                to={`/faculty/${faculty.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md bg-black/70"
                aria-label={`Explore details of ${faculty.name}`}
              >
                <FaArrowRight size={12} className="-rotate-45" />
              </Link>
            </>
          )}
        </AnimatePresence>
      </div> */}

      {/* Name badge */}
      <motion.div
        className="absolute left-2 right-2 sm:left-3 sm:right-3 bottom-2 sm:bottom-3 bg-white rounded-2xl border border-slate-200 shadow-lg px-3 sm:px-4 py-2.5 sm:py-3"
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate leading-tight">
          {faculty.name}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-slate-600 truncate">
          {faculty.position}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
const Faculty = () => {
  const rowRef = useRef(null);
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [percentage, setPercentage] = useState(0);

  const handleAutoScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    const perc = Math.floor(
      ((el.scrollLeft + el.clientWidth) / el.scrollWidth) * 100
    );
    setPercentage(perc);
  };

  const handleLeftScroll = () => {
    rowRef.current?.scrollBy({ left: -rowRef.current.clientWidth, behavior: "smooth" });
    setTimeout(handleAutoScroll, 400);
  };

  const handleRightScroll = () => {
    rowRef.current?.scrollBy({ left: rowRef.current.clientWidth, behavior: "smooth" });
    setTimeout(handleAutoScroll, 400);
  };

  const facultyList = facultyData.filter((faculty) => faculty.position !== "Dean & Professor");

  return (
    <div id="faculty-section" ref={sectionRef} className="w-full py-5 sm:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto p-4">

        {/* Badge */}
        <AnimatedSection variants={fromLeft} custom={0} className="flex justify-center md:justify-start items-center h-fit">
          <motion.p
            className="flex justify-start items-center border-[1px] border-slate-300 px-3 rounded-lg text-xs gap-1 mb-4 py-1 text-slate-700 font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            <FiUser size={12} color="#113959" />
            <span className="text-xs -translate-y-[1px] text-[#113959] font-semibold">Our Faculty</span>
          </motion.p>
        </AnimatedSection>

        {/* Heading */}
        <AnimatedHeadline
          highlight="experienced"
          className="text-center md:text-left text-2xl sm:text-3xl md:text-4xl md:text-4xl/tight font-bold capitalize mb-2 leading-tight text-[#113959]"
        >
          We have a team of experienced faculty members
        </AnimatedHeadline>

        {/* Subtext */}
        <AnimatedSection variants={fromRight} custom={0.2}>
          <p className="text-xs sm:text-sm md:text-lg text-center md:text-left text-slate-500 mb-6 md:mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Meet our team of experienced educators, researchers, and mentors dedicated to academic excellence and student success.
          </p>
        </AnimatedSection>

        {/* Dean Card */}
        <motion.div
          className="mb-8 md:mb-10 bg-white border border-slate-200 rounded-3xl shadow-md overflow-hidden flex flex-col md:flex-row"
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={fadeIn}
          custom={0.15}
        >
          {/* Text — slides from left */}
          <AnimatedSection
            variants={fromLeft}
            custom={0.3}
            className="flex-1 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center gap-4 order-2 md:order-1"
          >
            <motion.p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#002855]" variants={fromLeft} custom={0.35}>
              Dean Message
            </motion.p>
            <motion.h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-slate-900 leading-tight" variants={fromLeft} custom={0.4}>
              VISIONARY LEADERSHIP
            </motion.h2>
            <motion.p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl" variants={fromLeft} custom={0.45}>
              The Department executes 4 years B.Tech. Degree Course. It has
              state-of-the-art &amp; world class facilities, with a clear aim to be
              known as one of the best departments in Computer Science among all
              existing Indian colleges of repute.
            </motion.p>
            <motion.h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-tight" variants={fromLeft} custom={0.5}>
              COMMITMENT TO EXCELLENCE
            </motion.h3>
            <motion.p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl" variants={fromLeft} custom={0.55}>
              The department has a strong team of faculty members with high
              dedication towards their commitment in teaching and research. Our
              final-year students are excelling in placements, securing roles
              across leading organizations and bringing pride to the department. I
              am confident we will continue to achieve our vision with excellence.
            </motion.p>
            <motion.p className="text-sm sm:text-base md:text-md font-semibold text-slate-700" variants={fromBottom} custom={0.6}>
              Dr. Ajay Kr. Shrivastava <br />
              Dean CS &amp; CSE-DS
            </motion.p>
          </AnimatedSection>

          {/* Image — slides from right */}
          <AnimatedSection
            variants={fromRight}
            custom={0.3}
            className="w-full md:w-[260px] lg:w-[400px] h-72 sm:h-72 md:h-auto flex-none order-1 md:order-2"
          >
            <motion.img
              src="/cs/DEANnew.jpeg"
              alt="Dean's portrait"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={sectionInView ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.4 }}
            />
          </AnimatedSection>
        </motion.div>

        {/* Faculty Cards */}
        <div className="relative">
          <div
            ref={rowRef}
            onScroll={handleAutoScroll}
            className="flex overflow-x-auto gap-4 sm:gap-5 md:gap-6 scroll-smooth py-8 pl-2"
            style={{ scrollbarWidth: "none" }}
          >
            {facultyList.map((faculty, index) => (
              <FacultyCard key={faculty.id} faculty={faculty} index={index} />
            ))}
          </div>
        </div>

        {/* Progress Bar + Arrow Controls */}
        <div className=" sm:block hidden mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5 rounded-2xl border border-slate-200 bg-white/90 p-3 sm:p-4 shadow-sm">

            {/* Progress bar */}
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

            {/* Buttons */}
            <div className="flex gap-3 shrink-0">
              <motion.button
                type="button"
                className="p-2.5 sm:p-3 bg-[#002855] text-white rounded-full cursor-pointer"
                onClick={handleLeftScroll}
                aria-label="Scroll faculty cards left"
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
                aria-label="Scroll faculty cards right"
                whileHover={{ scale: 1.12, backgroundColor: "#b0b0b0" }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <FaArrowRight />
              </motion.button>
            </div>

              

          </div>
        </div>

      </div>
    </div>
  );
};

export default Faculty;
