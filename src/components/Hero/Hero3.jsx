"use client";
import React, { useEffect, useRef, useState } from "react";
import { TextGenerateEffect } from "../TextGenerator/Textgenerator";
import "./hero.css";
import { motion } from "framer-motion";
import AnimatedHeadline from "../AnimatedHeadline";

function Hero3() {
  const canvasRef = useRef(null);
  const stickyWrapRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const isMobileRef = useRef(false);
  const statsStartedRef = useRef(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [highestPlacement, setHighestPlacement] = useState(0);
  const [studentIntake, setStudentIntake] = useState(0);

  useEffect(() => {
    const updateViewportMode = () => {
      const mobile = window.innerWidth < 768;
      isMobileRef.current = mobile;
      setIsMobile(mobile);
    };

    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);

    return () => window.removeEventListener("resize", updateViewportMode);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadFrames = async () => {
      const frames = [];
      for (let i = 1; i <= 91; i++) {
        frames.push(`/frames2/${i}.webp`);
      }

      let loaded = 0;
      const images = await Promise.all(
        frames.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                loaded += 1;
                if (isMounted)
                  setLoadProgress(Math.round((loaded / frames.length) * 100));
                resolve(img);
              };
              img.onerror = () => {
                loaded += 1;
                if (isMounted)
                  setLoadProgress(Math.round((loaded / frames.length) * 100));
                resolve(null);
              };
              img.src = src;
            }),
        ),
      );

      if (!isMounted) return;

      imagesRef.current = images.filter((img) => img !== null);
      if (!imagesRef.current.length || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { alpha: false });
      const firstImg = imagesRef.current[0];

      canvas.width = firstImg.width;
      canvas.height = firstImg.height;
      const initialFrameIndex = isMobileRef.current
        ? imagesRef.current.length - 1
        : 0;
      ctx.drawImage(imagesRef.current[initialFrameIndex], 0, 0);
      currentFrameRef.current = initialFrameIndex;
      setIsLoaded(true);

      if (isMobileRef.current) {
        return;
      }

      const handleScroll = () => {
        const stickyWrap = stickyWrapRef.current;
        if (!stickyWrap || !imagesRef.current.length) return;
        if (isMobileRef.current) return;

        // scrollable height = outerWrapper height - viewport height
        const rect = stickyWrap.parentElement.getBoundingClientRect();
        const outerTop = stickyWrap.parentElement.offsetTop;
        const scrolled = window.scrollY - outerTop;
        const scrollableHeight =
          stickyWrap.parentElement.offsetHeight - window.innerHeight;

        const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
        const frameIndex = Math.floor(
          progress * (imagesRef.current.length - 1),
        );

        const shouldShowStats = progress > 0.02;
        if (shouldShowStats !== statsStartedRef.current) {
          statsStartedRef.current = shouldShowStats;
          setStatsStarted(shouldShowStats);

          if (!shouldShowStats) {
            setHighestPlacement(0);
            setStudentIntake(0);
          }
        }

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          ctx.drawImage(imagesRef.current[frameIndex], 0, 0);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    };

    let cleanup = () => {};
    loadFrames().then((fn) => {
      if (fn) cleanup = fn;
    });

    return () => {
      isMounted = false;
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded || !imagesRef.current.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    if (isMobile) {
      const lastFrameIndex = imagesRef.current.length - 1;
      currentFrameRef.current = lastFrameIndex;
      ctx.drawImage(imagesRef.current[lastFrameIndex], 0, 0);
    }
  }, [isMobile, isLoaded]);

  useEffect(() => {
    if (!statsStarted) return undefined;

    const duration = 1600;
    const startTime = performance.now();
    let frameId;

    const animateCounters = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setHighestPlacement(Math.round(easedProgress * 54));
      setStudentIntake(Math.round(easedProgress * 300));

      if (progress < 1) {
        frameId = requestAnimationFrame(animateCounters);
      }
    };

    frameId = requestAnimationFrame(animateCounters);
    return () => cancelAnimationFrame(frameId);
  }, [statsStarted]);

  return (
    <>
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center px-6">
          <div className="w-full max-w-2xl">
            <div className="flex items-end justify-between mb-6 sm:mb-2">
              <p className="text-[48px] sm:text-[92px] leading-none font-extrabold tracking-tight text-[#06143a] font-serif sm:first-letter:text-[110px] first-letter:text-[64px]">
                {loadProgress}%
              </p>
              <p className="text-[#ff7a00] uppercase tracking-[0.32em] font-semibold text-md sm:text-3xl mb-2 font-serif ">
                Loading
              </p>
            </div>

            <div className="h-4 sm:h-5 w-full float-end rounded-full bg-[#cfd3d9] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#ff7a00]"
                animate={{ width: `${Math.max(2, loadProgress)}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Text + CTA — normal flow, scrolls away naturally */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-8  sm:pt-12 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex flex-col justify-center items-center">
            <TextGenerateEffect
              duration={1}
              filter={false}
              words={
                "Shape your Future With Department of Computer Science and DS."
              }
              textlen="6xl"
            />
          </div>
        </div>
      </section>

      <div
        style={{ height: isMobile ? "auto" : "300vh" }}
        className="relative w-full bg-[#fafafa]">
        {/* Sticky inner: stays pinned while outer is in viewport */}
        <div
          ref={stickyWrapRef}
          className={`${isMobile ? "relative" : "sticky top-16 sm:top-24 lg:top-30"} w-full`}>
          <div className="w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
              <div className="relative w-full" style={{ lineHeight: 0 }}>
                <div className="absolute left-1/2 top-2 sm:top-0 z-20 w-[96%] sm:w-[92%] max-w-4xl -translate-x-1/2 flex flex-col items-center text-center px-3 sm:px-6 py-3 sm:py-5 rounded-2xl">
                  <AnimatedHeadline
                    as="h2"
                    highlight="build technology"
                    className="text-xl font-serif sm:text-3xl lg:text-4xl font-semibold text-[#113959] mb-2 sm:mb-3 leading-tight">
                    Designed for students who aim to build technology
                  </AnimatedHeadline>
                  {/* <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-lg sm:max-w-xl leading-relaxed italic">
                    Where Innovation Meets Integrity and Excellence Thrives
                  </p> */}
                </div>

                <div className="absolute left-1/2 bottom-0 z-20 w-full -translate-x-1/2 flex flex-col items-center justify-center py-3 sm:py-6 gap-3 sm:gap-4 px-3 sm:px-0">
                  {/* Badges container */}
                  <div className=" grid-cols-3 lg:grid-cols-2 hidden md:flex lg:flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-5xl">
                    {[
                      "Commitment to Continuous Learning",
                      "Collaborative & Team-Oriented",
                      "Research & Development Mindset",
                      "Strong Problem-Solving Skills",
                      "Passion for Technology & Innovation",
                      "Analytical & Critical Thinking",
                    ].map((text, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 px-3 sm:px-4 py-2 rounded-full bg-white shadow-md border border-gray-200  min-w-0">
                        {/* Red check icon */}
                        <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-[#f15b20] text-white text-[10px] sm:text-xs shrink-0 mt-0.5">
                          ✓
                        </div>

                        <span className="whitespace-normal leading-tight text-[10px] sm:text-xs md:text-[8px] lg:text-sm">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-x-4 top-[45%] z-30 hidden -translate-y-1/2 items-center justify-between gap-4 md:flex lg:inset-x-8">
                  <motion.div
                    className="w-[180px] rounded-[2rem] border border-white/70 bg-white/72 px-6 py-6 text-center shadow-[0_24px_70px_rgba(17,57,89,0.16)] backdrop-blur-md lg:w-[220px] lg:px-8 lg:py-7"
                    initial={{ opacity: 0, x: -36, scale: 0.94 }}
                    animate={statsStarted ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{ duration: 0.65, ease: "easeOut" }}>
                    <p
                      className="leading-none tracking-wide text-[#113959]"
                      style={{
                        fontFamily:
                          "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                      }}>
                      <span className="text-6xl lg:text-7xl">
                        {highestPlacement}
                      </span>
                      <span className="ml-1 align-top text-lg lg:text-xl">
                        LPA
                      </span>
                    </p>
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-[#f15b20] lg:text-base">
                      Highest Placement
                    </p>
                  </motion.div>

                  <motion.div
                    className="w-[180px] rounded-[2rem] border border-white/70 bg-white/72 px-6 py-6 text-center shadow-[0_24px_70px_rgba(17,57,89,0.16)] backdrop-blur-md lg:w-[220px] lg:px-8 lg:py-7"
                    initial={{ opacity: 0, x: 36, scale: 0.94 }}
                    animate={statsStarted ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{
                      duration: 0.65,
                      delay: 0.12,
                      ease: "easeOut",
                    }}>
                    <p
                      className="leading-none tracking-wide text-[#113959]"
                      style={{
                        fontFamily:
                          "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                      }}>
                      <span className="text-6xl lg:text-7xl">
                        {studentIntake}
                      </span>
                      <span className="align-top text-4xl lg:text-5xl">+</span>
                    </p>
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-[#f15b20] lg:text-base">
                      Student Intake
                    </p>
                  </motion.div>
                </div>

                <canvas
                  ref={canvasRef}
                  className={`relative w-full h-auto md:aspect-[16/9]  ${isMobile ? "pt-24" : ""} rounded-2xl`}
                  style={{ display: isLoaded ? "block" : "none" }}
                />
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(ellipse at center, rgba(250,250,250,0) 25%, rgba(250,250,250,0.4) 45%, rgba(250,250,250,0.8) 65%, #fafafa 80%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero3;
