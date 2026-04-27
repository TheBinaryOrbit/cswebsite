import { Link, Navigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { facultyData } from "../../data/facultyData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const FacultyDetails = () => {
  const { facultySlug } = useParams();
  const faculty = facultyData.find((item) => item.slug === facultySlug);

  if (!faculty) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="w-full bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#a30b13]"
          >
            <FaArrowLeft size={12} />
            Back to faculty
          </Link>
        </motion.div>

        <motion.section
          className="mt-5 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.08}
        >
          <div className="grid md:grid-cols-2">
            <div className="p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{faculty.name}</h1>
              <p className="mt-2 text-base sm:text-lg font-semibold text-[#002855]">{faculty.position}</p>

              <div className="mt-5 rounded-2xl bg-slate-100 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500 font-semibold">Qualification</p>
                <p className="mt-1 text-slate-800 font-medium">{faculty.qualification}</p>
              </div>

              <div className="mt-4 rounded-2xl bg-slate-100 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500 font-semibold">Message</p>
                <p className="mt-1 text-slate-700 italic">{faculty.message}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {faculty.email && (
                  <a
                    href={`mailto:${faculty.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#a30b13]"
                  >
                    <MdEmail size={16} />
                    {faculty.email}
                  </a>
                )}
                {faculty.linkedin && (
                  <a
                    href={faculty.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#a30b13]"
                  >
                    <FaLinkedinIn size={14} />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            <div className="relative min-h-72">
              <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={0.15}
        >
          <h2 className="text-xl font-bold text-slate-900">More About Faculty</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{faculty.about}</p>
        </motion.section>
      </div>
    </main>
  );
};

export default FacultyDetails;
