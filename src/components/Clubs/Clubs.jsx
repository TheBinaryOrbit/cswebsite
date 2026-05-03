"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { clubsData } from "../../data/clubsData";
import AnimatedHeadline from "../AnimatedHeadline";

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

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
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

const Clubs = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="w-full py-5 sm:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto p-4">
        <AnimatedSection
          variants={fromLeft}
          custom={0}
          className="flex justify-center md:justify-start items-center"
        >
          <motion.p
            className="flex items-center border border-slate-300 px-3 rounded-lg text-xs gap-1 mb-4 py-1 text-slate-700 font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            <FiUser size={12} />
            <span className="text-xs -translate-y-[1px] font-semibold">Our Clubs & COE</span>
          </motion.p>
        </AnimatedSection>

        <AnimatedHeadline
          highlight="Excellence"
          className="text-center md:text-left text-2xl sm:text-3xl md:text-4xl md:text-4xl/tight font-bold capitalize mb-2 leading-tight text-[#113959]"
        >
          Center of Excellence & Clubs
        </AnimatedHeadline>

        <AnimatedSection variants={fromRight} custom={0.2}>
          <p className="text-xs sm:text-sm md:text-lg text-center md:text-left text-slate-500 mb-6 md:mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Explore student communities that drive projects, mentorship, and career growth.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {clubsData.map((club, i) => (
            <motion.article
              key={club.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm "
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className="p-4 sm:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {club.tagline}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{club.name}</h3>

                <div className="mt-4 grid grid-cols-2 divide-x divide-slate-300/70">
                  <div className="pr-2">
                    <p className="text-lg font-semibold leading-none text-slate-700">{club.membersSummary}</p>
                    <p className="text-sm text-slate-500 mt-2">Members</p>
                  </div>
                  <div className="pl-3">
                    <p className="text-3xl font-serif leading-none text-[#f15b20]">{club.impact}</p>
                    <p className="text-sm text-slate-500 mt-2">Impact score</p>
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-5 py-4">
                <Link
                  to={`/clubs/${club.slug}`}
                  className="text-sm font-semibold text-[#f15b20] inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 cursor-pointer text-serif italic"
                >
                  Explore more
                  <FaArrowRight size={12} className="-rotate-45 translate-y-0.5" />
                </Link>
              </div>

              <div className="relative">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-40 sm:h-44 object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-x-0 top-0 h-20 pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(to bottom, #fafafa 0%, rgba(250,250,250,0.86) 5%, rgba(250,250,250,0) 30%)",
                  }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clubs;
