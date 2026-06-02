"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import AnimatedHeadline from "../AnimatedHeadline";

const THEME = {
  primary: "#113959",
  accent: "#f15b20",
};

const AboutSection = ({ emoji, title, content, details }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="mb-12"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-2" style={{ color: THEME.primary }}>
        {emoji} {title}
      </h2>
      <p className="text-sm md:text-base text-slate-600 mb-6">Established since {details[0].value}</p>

      {/* Content + Video Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Description */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-3" style={{ color: THEME.accent }}>
              Course Description
            </h3>
            <p className="text-slate-700 leading-relaxed text-justify">
              {content.courseDescription}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-3" style={{ color: THEME.accent }}>
              Key Highlights:
            </h3>
            <ul className="space-y-2">
              {content.keyHighlights.map((highlight, index) => (
                <li key={index} className="flex gap-3 text-slate-700">
                  <FiArrowRight className="mt-1 flex-shrink-0" style={{ color: THEME.accent }} />
                  <span className="text-justify text-sm md:text-base">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Video + Details */}
        <div className="space-y-4">
          {/* Video */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="w-full aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${content.videoId}`}
                title="Department Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl">
            {details.map((detail, index) => (
              <div key={index} className="text-center">
                <p className="text-xs md:text-sm text-slate-600 mb-2 font-semibold uppercase">{detail.label}</p>
                <p
                  className="text-base md:text-lg font-serif font-bold"
                  style={{ color: THEME.primary }}
                >
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <h3 className="text-lg font-serif font-semibold mb-3" style={{ color: THEME.accent }}>
          Vision
        </h3>
        <p className="text-slate-700 leading-relaxed text-justify">
          {content.vision}
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <h3 className="text-lg font-serif font-semibold mb-3" style={{ color: THEME.accent }}>
          Mission
        </h3>
        <ul className="space-y-2">
          {content.mission.map((point, index) => (
            <li key={index} className="flex gap-3 text-slate-700">
              <FiArrowRight className="mt-1 flex-shrink-0" style={{ color: THEME.accent }} />
              <span className="text-justify text-sm md:text-base">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Program Outcomes */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-lg font-serif font-semibold mb-3 hover:opacity-70 transition-opacity w-full"
          style={{ color: THEME.accent }}
        >
          Program Outcomes
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiArrowRight />
          </motion.div>
        </button>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <ul className="space-y-2 pt-2">
            {content.programOutcomes.map((outcome, index) => (
              <li key={index} className="flex gap-3 text-slate-700">
                <FiArrowRight className="mt-1 flex-shrink-0" style={{ color: THEME.accent }} />
                <span className="text-justify text-sm md:text-base">{outcome}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Additional Links */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        {content.link1Text && (
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all duration-300 group flex-1">
            <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
              <div className="p-2 rounded-lg bg-orange-50 text-[#f15b20] group-hover:bg-orange-100 transition-colors flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-serif font-semibold text-slate-800 transition-colors group-hover:text-[#113959] text-sm md:text-base truncate" title={content.link1Text}>
                {content.link1Text}
              </span>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={content.link1Url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-[#113959] hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer"
                title="View PDF"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
              <a
                href={content.link1Url}
                download
                className="p-2 rounded-lg text-slate-400 hover:text-[#f15b20] hover:bg-orange-50 transition-all flex items-center justify-center cursor-pointer"
                title="Download PDF"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {content.link2Text && (
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all duration-300 group flex-1">
            <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
              <div className="p-2 rounded-lg bg-orange-50 text-[#f15b20] group-hover:bg-orange-100 transition-colors flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-serif font-semibold text-slate-800 transition-colors group-hover:text-[#113959] text-sm md:text-base truncate" title={content.link2Text}>
                {content.link2Text}
              </span>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={content.link2Url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-[#113959] hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer"
                title="View PDF"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
              <a
                href={content.link2Url}
                download
                className="p-2 rounded-lg text-slate-400 hover:text-[#f15b20] hover:bg-orange-50 transition-all flex items-center justify-center cursor-pointer"
                title="Download PDF"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const About = () => {
  const computerScienceData = {
    courseDescription: `The Department of Computer Science (CS) at KIET was established in 2018. Our core mission is to deliver quality education in Computer Science and prepare students to thrive in today's fast-evolving digital world. With a vision to become a Centre of Excellence, the department aims to provide international-standard education that shapes competent, self-disciplined, and industry-ready computer engineers for global opportunities.

A CS degree from KIET ensures strong technical skills, enhanced employability, and the ability to work independently in the tech ecosystem. The department nurtures innovative thinking, entrepreneurial abilities, ethical values, and a solid foundation for higher education in top institutions in India and abroad. Students are further supported through in-house coaching for GATE and other competitive exams, ensuring comprehensive academic growth.

This blend of technical excellence, ethical grounding, innovative mindset, and real-world application ensures that our graduates evolve into competent professionals ready to make a positive impact on the global tech landscape.`,
    keyHighlights: [
      "Strong technical foundation promoting employability and independent problem-solving",
      "Emphasis on innovation, entrepreneurship, and ethical professional values",
      "Guidance and coaching for GATE and competitive exams by qualified faculty",
      "Curriculum focused on applying technical skills to solve real-world problems",
      "Supports pathways for higher education in premier institutions in India and overseas",
      "Prepares graduates for diverse roles such as web developer, data scientist, researcher, and more",
      "Strong record of students securing key positions in the IT industry in India and globally",
    ],
    vision: "To emerge as a leader in the field of computer science education with innovation and research to create a positive global impact.",
    mission: [
      "To provide quality education in computer science to shape next-generation leaders for global community.",
      "To equip students with skills and knowledge to bridge the gap between academia and industry by integrating the latest technologies and innovative practices.",
      "To create a conducive environment for research and innovation for providing sustainable solutions.",
      "To develop socially responsible professionals while encouraging personal and professional growth.",
    ],
    programOutcomes: [
      "Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.",
      "Problem analysis: Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.",
      "Design/development of solutions: Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.",
      "Conduct investigations of complex problems: Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.",
      "Modern tool usage: Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.",
      "The engineer and society: Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.",
      "Environment and sustainability: Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.",
      "Ethics: Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.",
      "Individual and team work: Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.",
      "Communication: Communicate effectively on complex engineering activities with the engineering community and with society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.",
      "Project management and finance: Demonstrate knowledge and understanding of engineering and management principles and apply these to one's own work, as a member or leader in a team, to manage projects in multidisciplinary environments.",
      "Life-long learning: Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.",
    ],
    videoId: "ODtRCxMvEXU",
    link1Text: "COs and CO-PO Mapping 2025-26 ODD Semester_CS",
    link1Url: "/COs and CO-PO Mapping 2025-26 ODD Semester_CS.pdf",
    link2Text: "COs and CO-PO Mapping 2025-26 EVEN Semester_CS",
    link2Url: "/COs and CO-PO Mapping 2025-26 EVEN Semester_CS.pdf",
  };

  const dataScienceData = {
    courseDescription: `The Department of Computer Science & Engineering (Data Science) at KIET, led by Dr. Ajay Kumar Shrivastava, is a newly established B.Tech program designed to prepare students for the rapidly advancing world of data-driven technologies. The department's mission is to equip learners with strong technical foundations, analytical thinking, and practical skills essential for solving real-world challenges in today's digital landscape.

The curriculum blends core computer science principles with specialized domains such as Artificial Intelligence, Machine Learning, Big Data Analytics, and Statistical Modeling. This integrated learning approach ensures students gain the expertise needed to excel in both industry and research. With an emphasis on innovation, problem-solving, and responsible use of data, the program shapes future-ready professionals capable of thriving across diverse sectors.

This combination of technical depth, hands-on experience, and ethical grounding prepares our graduates to become competent, impactful professionals ready to lead in the global data science landscape.`,
    keyHighlights: [
      "Strong foundation in Computer Science with specialized focus on AI, ML, Big Data, and Analytics",
      "Project-based learning that develops problem-solving and real-world application skills",
      "Emphasis on ethical, responsible, and innovative data usage",
      "Guidance from experienced faculty and industry experts",
      "Industry collaborations offering practical exposure and career-oriented learning",
    ],
    vision: "To excel in Data Science education, fostering analytical skills to deliver intelligent solutions for industry and society.",
    mission: [
      "To provide strong foundation in Data Science through effective teaching learning process.",
      "To develop students abilities in Data Analytics and research on emerging technologies using modern tools and real world data challenges.",
      "To strengthen industry–academia partnerships through projects, internships to provide practical exposure to data science.",
      "To nurture ethical and adaptable professional committed to responsible use of data for sustainable impact.",
    ],
    programOutcomes: [
      "PO1 (Foundation Knowledge): Apply knowledge of mathematics, programming logic and coding fundamentals for solution architecture and problem solving.",
      "PO2 (Problem Analysis): Identify, review, formulate and analyse problems for primarily focussing on customer requirements using critical thinking frameworks.",
      "PO3 (Development of Solutions): Design, develop and investigate problems with an innovative approach for solutions incorporating ESG/SDG goals.",
      "PO4 (Modern Tool Usage): Select, adapt and apply modern computational tools such as development of algorithms with an understanding of the limitations including human biases.",
      "PO5 (Individual and Teamwork): Function and communicate effectively as an individual or a team leader in diverse and multidisciplinary groups. Use methodologies such as agile.",
      "PO6 (Project Management and Finance): Use the principles of project management such as scheduling, work breakdown structure and be conversant with the principles of Finance for profitable project management.",
      "PO7 (Ethics): Commit to professional ethics in managing software projects with financial aspects. Learn to use new technologies for cyber security and insulate customers from malware.",
      "PO8 (Life-long learning): Change management skills and the ability to learn, keep up with contemporary technologies and ways of working.",
    ],
    videoId: "glRXKj5f53M",
    link1Text: "COs and CO-PO Mapping 2025-26 ODD Semester_CSE(DS)",
    link1Url: "/COs and CO-PO Mapping 2025-26 ODD Semester_CSE(DS).pdf",
    link2Text: "COs and CO-PO Mapping 2025-26 EVEN Semester_CSE(DS)",
    link2Url: "/COs and CO-PO Mapping 2025-26 EVEN Semester_CSE(DS).pdf",
  };

  const csDetails = [
    { label: "Est. Yr", value: "2018" },
    { label: "Duration", value: "4 Years" },
    { label: "Intake", value: "240" },
    { label: "Fee (PA)", value: "₹1,90,000" },
  ];

  const dsDetails = [
    { label: "Est. Yr", value: "2025" },
    { label: "Duration", value: "4 Years" },
    { label: "Intake", value: "60" },
    { label: "Fee (PA)", value: "₹1,90,000" },
  ];

  return (
    <section className="w-full py-8 sm:py-10 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        {/* Computer Science Section */}
        <AboutSection
          emoji=""
          title="Computer Science"
          content={computerScienceData}
          details={csDetails}
        />

        {/* Data Science Section */}
        <AboutSection
          emoji=""
          title="Computer Science & Engineering (Data Science)"
          content={dataScienceData}
          details={dsDetails}
        />
      </div>
    </section>
  );
};

export default About;
