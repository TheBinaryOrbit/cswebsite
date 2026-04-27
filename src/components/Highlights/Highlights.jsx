"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import img1 from '../../assets/Highlights/faculty.jpg';
import img2 from '../../assets/Highlights/labs.jpg';
import img3 from '../../assets/Highlights/hh.jpg';
import img4 from '../../assets/Highlights/pp.jpg';

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

/* ─── AnimatedSection helper ────────────────────────────────── */
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

/* ─── Grid Card ─────────────────────────────────────────────── */
function GridCard({ src, title, description, variants, custom, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`bg-slate-200 rounded-3xl w-full h-[300px] sm:h-full overflow-hidden relative group ${className}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      custom={custom}
      whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* Image */}
      <motion.img
        src={src}
        alt={title}
        className="w-full h-full object-cover"
        initial={{ scale: 1.08, filter: "brightness(0.70)" }}
        whileHover={{ scale: 1.13, filter: "brightness(0.75)" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />

      {/* Text overlay — slides up on hover */}
      <motion.div
        className="absolute bottom-5 sm:bottom-10 left-4 text-white"
        initial={{ y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h2
          className="text-xl sm:text-2xl font-bold mb-1 px-2 md:px-5"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: (custom || 0) + 0.2, ease: "easeOut" }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-xs sm:text-lg px-2 md:px-5"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: (custom || 0) + 0.32, ease: "easeOut" }}
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────────── */
const Section2 = () => {
  return (
    <div className="w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto py-5 sm:py-10 p-4">

        {/* Heading — from left */}
        <AnimatedSection variants={fromLeft} custom={0}>
          <h1 className="text-3xl md:text-5xl leading-snug font-bold tracking-wide font-serif text-[#113959]">
            Excellence in Computer Science
          </h1>
        </AnimatedSection>

        {/* Paragraph — from right */}
        <AnimatedSection variants={fromRight} custom={0.15}>
          <p className="max-w-5xl mt-2 leading-snug ml-1 text-slate-500">
            Our department is committed to academic excellence, cutting-edge research, and industry-oriented learning that prepares students for real-world challenges
          </p>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 gap-5">

          <GridCard
            src={img1}
            title="Expert Faculty & Mentorship"
            description="Learn from experienced faculty members dedicated to teaching, research, and guiding students toward academic and professional excellence."
            variants={fromLeft}
            custom={0.1}
            className="lg:col-span-2"
          />

          {/* Row 1 — Card 2: right */}
          <GridCard
            src={img2}
            title="Industry-Oriented Curriculum"
            description="Our curriculum is regularly updated to match industry standards"
            variants={fromRight}
            custom={0.2}
          />

          {/* Row 2 — Card 3: left */}
          <GridCard
            src={img4}
            title="Placements & Career Opportunities"
            description="Strong placement support with leading companies, internships, and career"
            
            variants={fromLeft}
            custom={0.15}
          />

          {/* Row 2 — Card 4: right (col-span-2) */}
          <GridCard
            src={img3}
            title="Hands-on Projects & Labs"
            description="Engage in real-world projects, modern labs, and collaborative learning to build strong problem-solving and development skills."
            variants={fromRight}
            custom={0.25}
            className="lg:col-span-2"
          />

        </div>
      </div>
    </div>
  );
};

export default Section2;