"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AnimatedHeadline from "../AnimatedHeadline";
import achievementsData from "../../data/achievementsData.json";
import faculty from "../../assets/Highlights/faculty.jpg";
import labs from "../../assets/Highlights/labs.jpg";
import pp from "../../assets/Highlights/pp.jpg";
import hh from "../../assets/Highlights/hh.jpg";

const fromLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

const fromRight = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

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

// Extract file ID from Google Drive link
const getGoogleDriveImageUrl = (driveLink) => {
  const fileIdMatch = driveLink.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w400`;
  }
  return null;
};

function GridCard({ src, title, description, variants, custom }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      tabIndex={0}
      className="group relative h-[340px] basis-[82vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-slate-200 outline-none transition-[flex-basis,transform,box-shadow] duration-500 ease-out hover:basis-[560px] hover:shadow-2xl focus-visible:basis-[560px] focus-visible:shadow-2xl sm:h-[400px] sm:basis-[420px] lg:basis-[460px]"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      custom={custom}
      whileHover={{ scale: 1.015, transition: { duration: 0.35, ease: "easeOut" } }}
    >
      <motion.img
        src={src}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
        initial={{ scale: 1.03, filter: "brightness(0.82)" }}
        whileHover={{ filter: "brightness(0.62)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 translate-y-6 p-5 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-7">
        <motion.h2
          className="mb-2 text-xl font-bold sm:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: (custom || 0) + 0.2, ease: "easeOut" }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="max-w-[34rem] text-sm leading-relaxed sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: (custom || 0) + 0.32, ease: "easeOut" }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}

function AchievementCard({ achievement, variants, custom }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const imageUrl = getGoogleDriveImageUrl(achievement.proof_link);

  return (
    <motion.a
      ref={ref}
      href={achievement.proof_link}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={0}
      className="group relative h-[340px] basis-[82vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-slate-900 outline-none transition-[flex-basis,transform,box-shadow] duration-500 ease-out hover:basis-[560px] hover:shadow-2xl focus-visible:basis-[560px] focus-visible:shadow-2xl sm:h-[400px] sm:basis-[420px] lg:basis-[460px]"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      custom={custom}
      whileHover={{ scale: 1.015, transition: { duration: 0.35, ease: "easeOut" } }}
    >
      {/* Drive Certificate Image */}
      <motion.img
        src={imageUrl}
        alt={achievement.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
        initial={{ scale: 1.03, filter: "brightness(0.82)" }}
        whileHover={{ filter: "brightness(0.62)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 translate-y-6 p-5 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-7">
        <motion.p
          className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/80"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: (custom || 0) + 0.1, ease: "easeOut" }}
        >
          {achievement.achievement_type} • {achievement.category}
        </motion.p>
        <motion.h2
          className="mb-2 text-xl font-bold sm:text-2xl line-clamp-2"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: (custom || 0) + 0.2, ease: "easeOut" }}
        >
          {achievement.title}
        </motion.h2>
        <motion.p
          className="max-w-[34rem] text-sm leading-relaxed sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: (custom || 0) + 0.32, ease: "easeOut" }}
        >
          By: {achievement.name}
        </motion.p>
      </div>
    </motion.a>
  );
}

const Section2 = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollHighlights = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  /* useEffect(() => {
    if (isPaused) return undefined;

    const interval = window.setInterval(() => {
      const track = scrollRef.current;
      if (!track) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      const isAtEnd = track.scrollLeft >= maxScroll - 8;

      track.scrollTo({
        left: isAtEnd ? 0 : track.scrollLeft + track.clientWidth * 0.75,
        behavior: "smooth",
      });
    }, 3500);

    return () => window.clearInterval(interval);
  }, [isPaused]); */

  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl p-4 py-5 sm:py-10">
        <AnimatedHeadline
          highlight="Achievements"
          className="font-serif text-3xl font-bold leading-snug tracking-wide text-[#113959] md:text-5xl"
        >
          Department Highlights & Achievements
        </AnimatedHeadline>

        <AnimatedSection variants={fromRight} custom={0.15}>
          <p className="ml-1 mt-2 max-w-5xl leading-snug text-slate-500">
            Celebrating our students' remarkable accomplishments in hackathons, competitions, internships, research, and excellence across all domains
          </p>
        </AnimatedSection>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            aria-label="Scroll achievements left"
            onClick={() => scrollHighlights("left")}
            className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-[#113959] shadow-sm transition hover:bg-[#113959] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113959]"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Scroll achievements right"
            onClick={() => scrollHighlights("right")}
            className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-[#113959] shadow-sm transition hover:bg-[#113959] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113959]"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="scrollbar-hide mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth pb-5 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* 4 Highlight Images First */}
          <GridCard
            src={faculty}
            title="Expert Faculty & Mentorship"
            description="Learn from experienced faculty members dedicated to teaching, research, and guiding students toward academic and professional excellence."
            variants={fromLeft}
            custom={0.1}
          />

          <GridCard
            src={labs}
            title="Industry-Oriented Curriculum"
            description="Our curriculum is regularly updated to match industry standards"
            variants={fromRight}
            custom={0.2}
          />

          <GridCard
            src={pp}
            title="Placements & Career Opportunities"
            description="Strong placement support with leading companies, internships, and career"
            variants={fromLeft}
            custom={0.15}
          />

          <GridCard
            src={hh}
            title="Hands-on Projects & Labs"
            description="Engage in real-world projects, modern labs, and collaborative learning to build strong problem-solving and development skills."
            variants={fromRight}
            custom={0.25}
          />

          {/* Then All Achievements */}
          {achievementsData.map((achievement, index) => (
            <AchievementCard
              key={index}
              achievement={achievement}
              variants={index % 2 === 0 ? fromLeft : fromRight}
              custom={(index % 5) * 0.08}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section2;
