"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  textlen
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  textlen?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={`${["KIET", "CS", "&" ,"CSE-DS"].some(item => word.includes(item))
                  ? "text-[#f15b20]"
                  : "text-[#113959]"
                } opacity-0`}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="">
        <div className={`text-2xl sm:text-5xl md:text-7xl leading-snug tracking-wide max-w-5xl text-center font-serif`}>
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
