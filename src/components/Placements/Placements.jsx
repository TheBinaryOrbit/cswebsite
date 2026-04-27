"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

/* ─── Variants ─────────────────────────────────────────────── */
const fromLeft = {
  hidden: { opacity: 0, x: -70 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};
const fromRight = {
  hidden: { opacity: 0, x: 70 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};
const fromBottom = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

const companies = [
  { name: "Cisco", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpN6aBizk7tcnKkgX8_JDOLEl8KjnoHg4kwQ&s" },
  { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
  { name: "ServiceNow", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/ServiceNow_logo.svg/3840px-ServiceNow_logo.svg.png" },
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name: "Capgemini", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4TOuPk3d0ohT9KoG2fiSjaDgAHi9XIJHXVw&s" },
  { name: "Cognizant", logo: "https://1000logos.net/wp-content/uploads/2021/09/Cognizant-Logo.jpg" },
  { name: "Airtel", logo: "https://download.logo.wine/logo/Bharti_Airtel/Bharti_Airtel-Logo.wine.png" },
  { name: "UKG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/UKG_%28Ultimate_Kronos_Group%29_logo.svg/3840px-UKG_%28Ultimate_Kronos_Group%29_logo.svg.png" },
  { name: "Josh Technology", logo: "https://www.google.com/s2/favicons?domain=joshtechnologygroup.com&sz=128" },
];

const companies2 = [
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name: "Capgemini", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4TOuPk3d0ohT9KoG2fiSjaDgAHi9XIJHXVw&s" },
  { name: "Cognizant", logo: "https://1000logos.net/wp-content/uploads/2021/09/Cognizant-Logo.jpg" },
  { name: "HCL Technology", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqg0KtMMH4RREUA6kPgf13HtwKENOL2O8MVQ&s" },
  { name: "Tech Mahindra", logo: "https://www.logo.wine/a/logo/Tech_Mahindra/Tech_Mahindra-Logo.wine.svg" },
  { name: "Airtel", logo: "https://download.logo.wine/logo/Bharti_Airtel/Bharti_Airtel-Logo.wine.png" },
  { name: "UKG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/UKG_%28Ultimate_Kronos_Group%29_logo.svg/3840px-UKG_%28Ultimate_Kronos_Group%29_logo.svg.png" },
  { name: "GeeksforGeeks", logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg" },
  { name: "MAQ Software", logo: "https://www.google.com/s2/favicons?domain=maqsoftware.com&sz=128" },
  { name: "Josh Technology", logo: "https://www.google.com/s2/favicons?domain=joshtechnologygroup.com&sz=128" },
  { name: "LambdaTest", logo: "https://www.google.com/s2/favicons?domain=lambdatest.com&sz=128" },
  { name: "Fyle Technologies", logo: "https://www.google.com/s2/favicons?domain=fylehq.com&sz=128" },
  { name: "RateGain", logo: "https://www.google.com/s2/favicons?domain=rategain.com&sz=128" },
  { name: "PlanetSpark", logo: "https://www.google.com/s2/favicons?domain=planetspark.in&sz=128" },
  { name: "Rapipay", logo: "https://www.google.com/s2/favicons?domain=rapipay.com&sz=128" },
  { name: "MyOperator", logo: "https://www.google.com/s2/favicons?domain=myoperator.com&sz=128" },
  { name: "Axtria", logo: "https://www.google.com/s2/favicons?domain=axtria.com&sz=128" },
  { name: "Unthinkable Solutions", logo: "https://www.google.com/s2/favicons?domain=unthinkable.co&sz=128" },
  { name: "Staqu Technologies", logo: "https://www.google.com/s2/favicons?domain=staqu.com&sz=128" },
  { name: "ProcDNA", logo: "https://www.google.com/s2/favicons?domain=procdna.com&sz=128" },
  { name: "Mirketa", logo: "https://www.google.com/s2/favicons?domain=mirketa.com&sz=128" },
  { name: "Keywords Studios", logo: "https://www.google.com/s2/favicons?domain=keywordsstudios.com&sz=128" },
  { name: "Bosscoder Academy", logo: "https://www.google.com/s2/favicons?domain=bosscoderacademy.com&sz=128" },
  { name: "Appinventiv", logo: "https://www.google.com/s2/favicons?domain=appinventiv.com&sz=128" },
  { name: "App Squadz", logo: "https://www.google.com/s2/favicons?domain=appsquadz.com&sz=128" },
  { name: "Turing", logo: "https://www.google.com/s2/favicons?domain=turing.com&sz=128" },
  { name: "Samagra", logo: "https://www.google.com/s2/favicons?domain=samagragovernance.in&sz=128" },
  { name: "Ministry of Culture", logo: "https://www.google.com/s2/favicons?domain=indiaculture.gov.in&sz=128" },
  { name: "WPIL Limited", logo: "https://www.google.com/s2/favicons?domain=wpil.co.in&sz=128" },
  { name: "Gemini Solutions", logo: "https://www.google.com/s2/favicons?domain=geminisolutions.com&sz=128" },
  { name: "RtCamp Solutions", logo: "https://www.google.com/s2/favicons?domain=rtcamp.com&sz=128" },
  { name: "Diverselynx", logo: "https://www.google.com/s2/favicons?domain=diverselynx.com&sz=128" },
  { name: "Eicore Technologies", logo: "https://www.google.com/s2/favicons?domain=eicore.com&sz=128" },
  { name: "Infinisync Consulting", logo: "https://www.google.com/s2/favicons?domain=infinisync.com&sz=128" },
  { name: "Conqt Technologies", logo: "https://www.google.com/s2/favicons?domain=conqt.com&sz=128" },
  { name: "Agile Growth Tech", logo: "https://www.google.com/s2/favicons?domain=agilegrowthtech.com&sz=128" },
  { name: "Carbon6 (KhetAI)", logo: "https://www.google.com/s2/favicons?domain=carbon6.io&sz=128" },
  { name: "Nirwana.ai", logo: "https://www.google.com/s2/favicons?domain=nirwana.ai&sz=128" },
  { name: "PVR Aqua", logo: "https://www.google.com/s2/favicons?domain=pvraqua.com&sz=128" },
  { name: "Webkalakaar Software", logo: "https://www.google.com/s2/favicons?domain=webkalakaar.com&sz=128" },
  { name: "Razorse Software", logo: "https://www.google.com/s2/favicons?domain=razorse.com&sz=128" },
  { name: "Skepsi Software", logo: "https://www.google.com/s2/favicons?domain=skepsisoftware.com&sz=128" },
  { name: "GRX Pixel", logo: "https://www.google.com/s2/favicons?domain=grxpixel.com&sz=128" },
  { name: "Chaosclozet", logo: "https://www.google.com/s2/favicons?domain=chaosclozet.com&sz=128" },
  { name: "Decologi", logo: "https://www.google.com/s2/favicons?domain=decologi.com&sz=128" },
  { name: "DfreeNovelish", logo: "https://www.google.com/s2/favicons?domain=dfreenovelish.com&sz=128" },
  { name: "Bridge Group Solutions", logo: "https://www.google.com/s2/favicons?domain=bridgegroupsolutions.com&sz=128" },
  { name: "Aeroqube", logo: "https://www.google.com/s2/favicons?domain=aeroqube.com&sz=128" },
  { name: "Narayana Frumos", logo: "https://www.google.com/s2/favicons?domain=narayanafrumos.com&sz=128" },
  { name: "Codegnan IT Solutions", logo: "https://www.google.com/s2/favicons?domain=codegnan.com&sz=128" },
  { name: "Optimus", logo: "https://www.google.com/s2/favicons?domain=optimus.com&sz=128" },
];


/* ─── AnimatedSection ───────────────────────────────────────── */
function AnimatedSection({ children, variants, custom, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
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

/* ─── Stat Card ─────────────────────────────────────────────── */
function StatCard({ value, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={scaleIn}
      custom={delay}
      whileHover={{ scale: 1.06, y: -4, transition: { duration: 0.22 } }}
      className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/60 text-center"
    >
      <span className="text-3xl md:text-4xl font-extrabold text-[#113959] leading-none mb-1">
        {value}
      </span>
      <span className="text-xs sm:text-sm font-medium text-slate-600 mt-1 leading-tight">
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Feature Item ──────────────────────────────────────────── */
function FeatureItem({ title, desc, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fromLeft}
      custom={delay}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
    >
      <motion.p
        initial={{ rotate: -10, opacity: 0 }}
        animate={inView ? { rotate: 0, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay }}
      >
      </motion.p>
      <h2 className="font-bold text-lg text-white/90">{title}</h2>
      <p className="text-sm sm:w-full text-justify w-[90%] text-slate-200">{desc}</p>
    </motion.div>
  );
}


function TrustedByScroller() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-8 sm:mt-10"
    >
      <h2 className="font-bold text-xl mb-3 text-white">Our Recruiters</h2>
      <div className="overflow-hidden w-full relative">
        {/* fade edges */}

        <motion.div
          className="flex gap-5 w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        >
          {companies.map((brand, i) => (
            <span
              key={i}
              className="rounded-xl px-4 py-2.5 h-14 min-w-32 flex items-center justify-center  select-none"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 w-auto object-contain"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Right Side Cards ──────────────────────────────────────── */
function RightCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:p-4 rounded-2xl h-full"
    >
      {/* 🔥 Card 1 — Highlight */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fromRight}
        custom={0.1}
        whileHover={{ scale: 1.04 }}
        className="col-span-2 flex items-center justify-between bg-white shadow-xl rounded-2xl p-5"
      >
        <div>
          <p className="text-sm opacity-80">Highest Package</p>
          <h1 className="text-2xl font-bold text-[#113959]">CS & CSE-DS</h1>
        </div>

        <div className="text-right">
          <h1 className="text-3xl font-extrabold text-[#f15b20]">
            45 LPA
          </h1>
          <p className="text-xs opacity-80">Top Recruiter Offer</p>
        </div>
      </motion.div>

      {/* 📊 Card 2 — Placement Rate */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fromBottom}
        custom={0.2}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center col-span-2"
      >
        <p className="font-semibold text-gray-700 mb-3">
          Placement Rate 2026
        </p>

        <div className="relative w-36 h-20">
          <svg className="absolute inset-0" viewBox="0 0 44 24">
            <path
              d="M2 22a20 20 0 0 1 40 0"
              fill="none"
              stroke="#113959"
              strokeWidth="4"
            />
            <motion.path
              d="M2 22a20 20 0 0 1 40 0"
              fill="none"
              stroke="#113959"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0,100" }}
              animate={inView ? { strokeDasharray: "96,100" } : {}}
              transition={{ duration: 1.2 }}
            />
          </svg>

          <motion.p
            className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[#113959]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            96%
          </motion.p>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Consistent growth over years
        </p>
      </motion.div>

      {/* 🏢 Card 3 — Recruiters Grid */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fromRight}
        custom={0.25}
        whileHover={{ scale: 1.04 }}
        className="bg-white shadow-lg rounded-2xl flex flex-col p-5 col-span-2"
      >
        <p className="font-semibold text-gray-700 mb-4 text-center">
          Top Recruiters
        </p>

        <div className="grid grid-cols-3 gap-4 place-items-center">
          {companies.map((company, index) => (
            <motion.img
              key={company.name}
              src={company.logo}
              alt={company.name}
              className="w-16 h-16 object-contain  transition"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.08 }}
            />
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          300+ Companies visited
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
const Placements = () => {
  const features = [
    {
      title: "Early Intervention",
      desc: "We focus on career development from the very first year, helping students build strong foundations, explore domains, and prepare early for industry demands."
    },
    {
      title: "Digital Identity",
      desc: "Students are guided to build a strong digital presence through mandatory portfolios, GitHub projects, and LinkedIn optimization to showcase their skills effectively."
    },
    {
      title: "Industry Tie-ups",
      desc: "We connect students with global tech companies and innovative startups, enabling real-world exposure, mentorship opportunities, and career growth."
    },
    {
      title: "Skill Mapping",
      desc: "Student skills and projects are aligned with current market trends and industry requirements, ensuring better employability and practical knowledge."
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-7xl mx-auto p-4">
        <div className="h-fit  rounded-2xl flex lg:flex-row flex-col border-2 border-[#113959] shadow-lg bg-[#113959]">

          {/* ── LEFT SIDE ── */}
          <div className="lg:w-1/2 lg:h-full h-1/2 w-full md:p-10 p-5 flex flex-col justify-between">

            {/* Heading */}
            <AnimatedSection variants={fromLeft} custom={0}>
              <h1 className="text-2xl md:text-[44px] text-white font-serif leading-tight font-medium mb-6 sm:mb-8">
                The <span className="text-[#f15b20]">Carrer </span> Outcomes & Industry Connections
              </h1>
            </AnimatedSection>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-6 mb-8">
              {features.map((f, i) => (
                <FeatureItem key={i} title={f.title} desc={f.desc} delay={0.1 + i * 0.1} />
              ))}
            </div>
            <Link
              to="/placements"
              className="self-start bg-[#f15b20] hover:bg-[#f15b20]/90 text-white font-semibold px-5 py-2 rounded-lg transition cursor-pointer"
            >
              <span className="text-white font-bold">View All Placements</span>
            </Link>
          </div>

          {/* ── RIGHT SIDE ── */}
          <div className="lg:w-1/2 lg:h-full h-1/2 w-full p-5 md:p-10 flex flex-col gap-6">
            <RightCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placements;