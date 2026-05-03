import { motion } from "framer-motion";

const HERO_ORANGE = "#f15b20";

const headlineVariants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 22, rotateX: -45 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function AnimatedHeadline({
  as = "h1",
  children,
  highlight,
  className = "",
  ...props
}) {
  const MotionTag = motion[as] || motion.h1;
  const parts =
    typeof children === "string" && highlight
      ? children.split(new RegExp(`(${highlight})`, "i"))
      : null;

  return (
    <MotionTag
      className={className}
      variants={headlineVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.45 }}
      {...props}
    >
      {parts
        ? parts.map((part, index) => {
            const isHighlight = part.toLowerCase() === highlight.toLowerCase();

            return (
              <motion.span
                key={`${part}-${index}`}
                className={isHighlight ? "inline-block font-serif italic" : undefined}
                style={isHighlight ? { color: HERO_ORANGE } : undefined}
                variants={isHighlight ? wordVariants : undefined}
              >
                {part}
              </motion.span>
            );
          })
        : children}
    </MotionTag>
  );
}
