"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const images = [
  "/banner/banner1.jpg",
  "/banner/banner2.jpg",
  "/banner/banner3.jpg",
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // NEXT SLIDE
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // PREVIOUS SLIDE
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full overflow-hidden h-[70vh]">

      {/* BACKGROUND IMAGE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${images[current]})`,
          }}
        />
      </AnimatePresence>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#1c9e79] hover:text-black transition duration-300"
      >
        <FaChevronLeft className="text-sm" />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#1c9e79] hover:text-black transition duration-300"
      >
        <FaChevronRight className="text-sm" />
      </button>

      {/* CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 h-[70vh] flex items-center">

        <div className="max-w-2xl">

          {/* TOP TEXT */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-[#1c9e79]"></div>

            <p className="uppercase tracking-[3px] text-yellow-400 font-medium text-xs md:text-sm">
              Smart • Secure • Modern
            </p>
          </div>

          {/* HEADING */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
            Store Your Ideas <br />
            Notes & Projects In <br />
            <span className="text-yellow-400">
              IdeaVault
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-200 text-sm md:text-base leading-7 max-w-xl">
            IdeaVault helps you save ideas, organize projects,
            manage notes, and keep your creative thoughts secure
            in one modern workspace.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">

            {/* BUTTON 1 */}
            <button className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center gap-2 hover:scale-105 transition duration-300">
              Get Started
              <FaArrowRight className="text-xs" />
            </button>

            {/* BUTTON 2 */}
            <button className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-white text-sm font-medium flex items-center justify-center gap-2 hover:scale-105 transition duration-300">

              

              <span className="whitespace-nowrap">
                Add your idea
              </span>

            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;