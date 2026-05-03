import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { clubsData } from "../../data/clubsData";
import AnimatedHeadline from "../AnimatedHeadline";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function MemberCard({ member, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      whileHover={{ scale: 1.03, y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden bg-[#ebebeb] h-70 cursor-pointer"
    >
      <motion.img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
        animate={{
          filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
          scale: hovered ? 1.08 : 1.02,
        }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: hovered ? 0.28 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <AnimatePresence>
          {hovered && (
            <>
              {member.email && (
                <motion.a
                  key="gmail"
                  href={`mailto:${member.email}`}
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
              )}

              {member.linkedin && (
                <motion.a
                  key="linkedin"
                  href={member.linkedin}
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
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute left-2 right-2 sm:left-3 sm:right-3 bottom-2 sm:bottom-3 bg-white rounded-2xl border border-slate-200 shadow-lg px-3 sm:px-4 py-2.5 sm:py-3"
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate leading-tight">{member.name}</h3>
        <p className="text-xs sm:text-sm font-medium text-slate-600 truncate">{member.role}</p>
        <p className="text-[11px] sm:text-xs font-medium text-slate-500 truncate">{member.year}</p>
      </motion.div>
    </motion.div>
  );
}

const ClubDetails = () => {
  const { clubSlug } = useParams();
  const club = clubsData.find((item) => item.slug === clubSlug);

  if (!club) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="w-full bg-slate-50 min-h-screen">
      {/* Full Screen Image at Top */}
      <motion.div
        className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
      >
        <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Back Button - Positioned on Image */}
        <Link
          to="/"
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#f15b20] bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-black/60 transition-all"
        >
          <FaArrowLeft size={12} />
          Back to clubs
        </Link>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Club Info Header */}
        <motion.section
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 -mt-16 relative z-10"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.08}
        >
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-slate-500">{club.tagline}</p>
          <AnimatedHeadline
            highlight={club.name.split(" ")[0]}
            className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2 leading-tight"
          >
            {club.name}
          </AnimatedHeadline>
          <div className="mt-6 grid grid-cols-2 gap-4 max-w-sm">
            <div className="rounded-xl bg-slate-100 px-4 py-3">
              <p className="text-xs text-slate-500">Members</p>
              <p className="text-lg font-bold text-slate-900">{club.membersSummary}</p>
            </div>
            <div className="rounded-xl bg-slate-100 px-4 py-3">
              <p className="text-xs text-slate-500">Impact</p>
              <p className="text-lg font-bold text-[#f15b20]">{club.impact}</p>
            </div>
          </div>
        </motion.section>

        {/* About & Benefits */}
        <section className="mt-8 grid lg:grid-cols-5 gap-6">
          <motion.article
            className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            custom={0.12}
          >
            <AnimatedHeadline as="h2" highlight="About" className="text-xl font-bold text-slate-900">
              About
            </AnimatedHeadline>
            <p className="mt-3 text-slate-600 leading-relaxed">{club.about}</p>
          </motion.article>

          <motion.article
            className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            custom={0.16}
          >
            <AnimatedHeadline as="h2" highlight="Benefits" className="text-xl font-bold text-slate-900">
              Benefits
            </AnimatedHeadline>
            <ul className="mt-3 space-y-2">
              {club.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-slate-600">
                  <FaCheckCircle className="text-[#f15b20] mt-1 shrink-0" size={13} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </section>

        {/* Members Section */}
        <section className="mt-8">
          <AnimatedHeadline as="h2" highlight="Members" className="text-xl font-bold text-slate-900">
            Members
          </AnimatedHeadline>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {club.members.map((member, index) => (
              <MemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ClubDetails;
