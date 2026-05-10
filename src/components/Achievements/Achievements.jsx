// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { motion, useInView } from "framer-motion";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// import AnimatedHeadline from "../AnimatedHeadline";
// import achievementsData from "../../data/achievementsData.json";

// const fromLeft = {
//   hidden: { opacity: 0, x: -80 },
//   visible: (delay = 0) => ({
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
//   }),
// };

// const fromRight = {
//   hidden: { opacity: 0, x: 80 },
//   visible: (delay = 0) => ({
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
//   }),
// };

// function AnimatedSection({ children, variants, custom, className = "" }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <motion.div
//       ref={ref}
//       className={className}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       variants={variants}
//       custom={custom}
//     >
//       {children}
//     </motion.div>
//   );
// }

// const getBackgroundColor = (achievementType) => {
//   switch (achievementType) {
//     case "Winner":
//       return "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
//     case "First Runner Up":
//       return "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)";
//     case "Second Runner Up":
//       return "linear-gradient(135deg, #f97316 0%, #ea580c 100%)";
//     case "PARTICIPATION":
//       return "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)";
//     default:
//       return "linear-gradient(135deg, #10b981 0%, #059669 100%)";
//   }
// };

// function AchievementCard({ achievement, variants, custom }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <motion.a
//       ref={ref}
//       href={achievement.proof_link}
//       target="_blank"
//       rel="noopener noreferrer"
//       tabIndex={0}
//       className="group relative h-[340px] basis-[82vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-slate-200 outline-none transition-[flex-basis,transform,box-shadow] duration-500 ease-out hover:basis-[560px] hover:shadow-2xl focus-visible:basis-[560px] focus-visible:shadow-2xl sm:h-[400px] sm:basis-[420px] lg:basis-[460px]"
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       variants={variants}
//       custom={custom}
//       whileHover={{ scale: 1.015, transition: { duration: 0.35, ease: "easeOut" } }}
//       style={{ 
//         background: getBackgroundColor(achievement.achievement_type),
//       }}
//     >
//       {/* Background overlay */}
//       <div className="absolute inset-0" style={{ background: getBackgroundColor(achievement.achievement_type) }} />

//       <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />

//       <div className="absolute inset-x-0 bottom-0 translate-y-6 p-5 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-7">
//         <motion.p
//           className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/80"
//           initial={{ opacity: 0, y: 16 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.55, delay: (custom || 0) + 0.1, ease: "easeOut" }}
//         >
//           {achievement.achievement_type} • {achievement.category}
//         </motion.p>
//         <motion.h2
//           className="mb-2 text-xl font-bold sm:text-2xl line-clamp-2"
//           initial={{ opacity: 0, y: 16 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.55, delay: (custom || 0) + 0.2, ease: "easeOut" }}
//         >
//           {achievement.title}
//         </motion.h2>
//         <motion.p
//           className="max-w-[34rem] text-sm leading-relaxed sm:text-base line-clamp-2"
//           initial={{ opacity: 0, y: 16 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.55, delay: (custom || 0) + 0.32, ease: "easeOut" }}
//         >
//           By: {achievement.name}
//         </motion.p>
//       </div>
//     </motion.a>
//   );
// }

// const Achievements = () => {
//   const scrollRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);

//   const scrollAchievements = (direction) => {
//     if (!scrollRef.current) return;

//     const scrollAmount = scrollRef.current.clientWidth * 0.75;
//     scrollRef.current.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   useEffect(() => {
//     if (isPaused) return undefined;

//     const interval = window.setInterval(() => {
//       const track = scrollRef.current;
//       if (!track) return;

//       const maxScroll = track.scrollWidth - track.clientWidth;
//       const isAtEnd = track.scrollLeft >= maxScroll - 8;

//       track.scrollTo({
//         left: isAtEnd ? 0 : track.scrollLeft + track.clientWidth * 0.75,
//         behavior: "smooth",
//       });
//     }, 3500);

//     return () => window.clearInterval(interval);
//   }, [isPaused]);

//   return (
//     <section className="w-full overflow-hidden bg-white">
//       <div className="mx-auto max-w-7xl p-4 py-5 sm:py-10">
//         <AnimatedHeadline
//           highlight="Achievements"
//           className="font-serif text-3xl font-bold leading-snug tracking-wide text-[#113959] md:text-5xl"
//         >
//           Student Achievements & Awards
//         </AnimatedHeadline>

//         <AnimatedSection variants={fromRight} custom={0.15}>
//           <p className="ml-1 mt-2 max-w-5xl leading-snug text-slate-500">
//             Celebrating our students' remarkable accomplishments in hackathons, competitions, internships, research, and excellence across all domains
//           </p>
//         </AnimatedSection>

//         <div className="mt-6 flex justify-end gap-3">
//           <button
//             type="button"
//             aria-label="Scroll achievements left"
//             onClick={() => scrollAchievements("left")}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-[#113959] shadow-sm transition hover:bg-[#113959] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113959]"
//           >
//             <FaChevronLeft aria-hidden="true" />
//           </button>
//           <button
//             type="button"
//             aria-label="Scroll achievements right"
//             onClick={() => scrollAchievements("right")}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-[#113959] shadow-sm transition hover:bg-[#113959] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113959]"
//           >
//             <FaChevronRight aria-hidden="true" />
//           </button>
//         </div>

//         <div
//           ref={scrollRef}
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//           onFocus={() => setIsPaused(true)}
//           onBlur={() => setIsPaused(false)}
//           className="scrollbar-hide mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth pb-5 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//         >
//           {achievementsData.map((achievement, index) => (
//             <AchievementCard
//               key={index}
//               achievement={achievement}
//               variants={index % 2 === 0 ? fromLeft : fromRight}
//               custom={(index % 5) * 0.08}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Achievements;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import AnimatedHeadline from "../AnimatedHeadline";
import achievementsData from "../../data/achievementsData.json";

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

function AchievementCard({ achievement, variants, custom }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
      {/* Local Achievement Thumbnail */}
      <motion.img
        src={achievement.thumbnail}
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
          className="max-w-[34rem] text-sm leading-relaxed sm:text-base line-clamp-2"
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

const Achievements = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollAchievements = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
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
  }, [isPaused]);

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl p-4 py-5 sm:py-10">
        <AnimatedHeadline
          highlight="Achievements"
          className="font-serif text-3xl font-bold leading-snug tracking-wide text-[#113959] md:text-5xl"
        >
          Student Achievements & Awards
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
            onClick={() => scrollAchievements("left")}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-[#113959] shadow-sm transition hover:bg-[#113959] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113959]"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Scroll achievements right"
            onClick={() => scrollAchievements("right")}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
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
    </section>
  );
};

export default Achievements;