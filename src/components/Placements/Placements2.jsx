"use client";
import { useState } from "react";
import { BiSolidHappyHeartEyes } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedHeadline from "../AnimatedHeadline";

const cards = [
  {
    id: "vision",
    title: "Our Vision",
    highlight: "Vision",
    className: "bg-[#113959]",
    plusClassName: "bg-white text-[#113959]",
    intro:
      "To emerge as a leader in the field of computer science education with innovation and research to create a positive global impact.",
    items: [
      ["Innovation & Research", "Foster cutting-edge research and innovation."],
      ["Global Impact", "Create positive change through technology."],
      ["Educational Excellence", "Lead in quality computer science education."],
    ],
  },
  {
    id: "mission",
    title: "Our Mission",
    highlight: "",
    className: "bg-[#f15b20]",
    plusClassName: "bg-white text-[#f15b20]",
    items: [
      [
        "Quality Education",
        "Provide quality education in computer science to shape next-generation leaders for global community.",
      ],
      [
        "Industry Integration",
        "Equip students with skills and knowledge by integrating latest technologies and innovative practices.",
      ],
      [
        "Research & Innovation",
        "Create a conducive environment for research and innovation for providing sustainable solutions.",
      ],
      [
        "Responsible Professionals",
        "Develop socially responsible professionals while encouraging personal and professional growth.",
      ],
    ],
  },
  {
    id: "peo",
    title: "Program Educational Objectives",
    highlight: "Educational",
    className: "bg-gradient-to-br from-[#002855] to-[#113959]",
    plusClassName: "bg-white text-[#113959]",
    intro: "Graduates shall be:",
    items: [
      [
        "Successful Career Leaders",
        "Engaged in successful career in the software industry and higher studies.",
      ],
      [
        "Adaptable Innovators",
        "Adaptable to recent trends for developing innovative solutions.",
      ],
      [
        "Global Citizens",
        "Socially responsible global citizen and leaders in their domain.",
      ],
    ],
  },
  {
    id: "pso",
    title: "Program Specific Objectives (PSO)",
    highlight: "Specific",
    className: "bg-gradient-to-br from-[#1a5f7a] to-[#0f4c81]",
    plusClassName: "bg-white text-[#0f4c81]",
    intro: "Graduates will be:",
    items: [
      [
        "Problem-Solving Experts",
        "Utilize technical skills of problem solving for boosting their employability and career advancement.",
      ],
      [
        "Research Leaders",
        "Equipped to leverage domain knowledge and expertise to enhance their research profile and academic contributions.",
      ],
    ],
  },
];

function ExpandableCard({ card, isOpen, onToggle }) {
  return (
    <motion.article
      className={`${card.className} overflow-hidden rounded-2xl shadow-lg`}
      layout
      transition={{ layout: { duration: 0.35, ease: "easeOut" } }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-6 text-left lg:p-8">
        <AnimatedHeadline
          highlight={card.highlight}
          className="text-2xl font-medium leading-tight text-white lg:text-3xl">
          {card.title}
        </AnimatedHeadline>
        <motion.span
          className={`${card.plusClassName} grid size-10 shrink-0 place-items-center rounded-full shadow-sm`}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}>
          <FiPlus size={22} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}>
            <div className="px-6 pb-6 lg:px-8 lg:pb-8">
              {card.intro ? (
                <p className="mb-5 text-sm leading-relaxed text-white/85">
                  {card.intro}
                </p>
              ) : null}
              <ul className="space-y-4">
                {card.items.map(([title, description]) => (
                  <li key={title} className="flex items-start gap-3">
                    <BiSolidHappyHeartEyes className="mt-1 shrink-0 text-xl text-white" />
                    <div>
                      <p className="font-semibold text-white">{title}</p>
                      <p className="text-sm leading-relaxed text-white/82">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

const Placements2 = () => {
  const [openCard, setOpenCard] = useState(null);

  return (
    <div className="w-full py-8">
      <div className="mx-auto max-w-7xl p-4">
        <div className="grid items-start gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <ExpandableCard
              key={card.id}
              card={card}
              isOpen={openCard === card.id}
              onToggle={() =>
                setOpenCard(openCard === card.id ? null : card.id)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Placements2;
