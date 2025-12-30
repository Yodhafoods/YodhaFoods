"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroBannerThree() {
  return (
    <section className="w-full flex justify-center">
      <div className="max-w-[1440px] w-full px-2 md:px-12 mt-6">

        {/* CLIPPING WRAPPER */}
        <div className="relative overflow-hidden rounded-[40px] lg:rounded-[80px]">

          {/* MAIN CARD */}
          <section
            className="
              w-full h-[490px]
              grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]
              relative
              border border-[rgba(199,154,45,0.3)]
            "
            style={{
              background: `
                radial-gradient(at 0% 0%, var(--color-mid-green) 0%, transparent 55%),
                radial-gradient(at 100% 0%, var(--color-base-gold) 0%, transparent 50%),
                radial-gradient(at 100% 100%, var(--color-dark-green) 0%, transparent 60%),
                var(--color-dark-green)
              `,
            }}
          >
            {/* LEFT SIDE */}
            <div className="px-4 py-2 lg:px-[60px] lg:py-0 flex flex-col justify-center text-white h-full relative z-10">
              <span className="text-light-gold font-extrabold tracking-[6px] text-[0.6rem] lg:text-sm mb-2 lg:mb-4 opacity-80 uppercase text-center lg:text-left">
                Know Your Truth
              </span>

              <h1 className="font-serif text-[1.6rem] sm:text-[3.2rem] lg:text-[4.5rem] leading-[1] mb-2 lg:mb-6 drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] text-center lg:text-left">
                Stop paying
                <br />
                for water.
              </h1>

              <div className="bg-white-glass backdrop-blur-[20px] border-l-[3px] border-base-gold p-2 lg:p-6 rounded-r-[30px] mb-2 lg:mb-10 max-w-[700px]">
                <span className="text-light-gold font-extrabold text-[0.7rem] lg:text-[0.9rem] uppercase tracking-[4px] block mb-2">
                  Market Reality
                </span>
                <p className="text-[0.9rem] lg:text-[1.2rem] leading-normal font-light text-[rgba(255,255,255,0.95)]">
                  90% of fresh produce you buy is just water weight.
                  <br />
                  <span className="text-light-gold font-semibold border-b border-[rgba(230,195,107,0.4)]">
                    Experience the 4.2x Nutrient Concentration that fresh food cannot provide.
                  </span>
                </p>
              </div>

              {/* CTA — SINGLE LINE ON MOBILE */}
              <div className="text-center lg:text-left">
                <Link
                  href="/truth-lab"
                  className="
                    inline-block
                    whitespace-nowrap
                    bg-base-gold text-white
                    py-2.5 px-5
                    lg:py-[20px] lg:px-[50px]
                    rounded-[100px]
                    font-extrabold
                    text-[0.7rem] lg:text-[0.9rem]
                    uppercase tracking-[3px]
                    shadow-[0_20px_40px_rgba(0,0,0,0.35)]
                    lg:hover:-translate-y-2
                    lg:hover:bg-light-gold
                    lg:hover:shadow-[0_30px_60px_rgba(199,154,45,0.5)]
                  "
                >
                  Calculate Your Savings
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE — HARD COMPRESSED FOR MOBILE */}
            <div className="
              bg-[rgba(0,0,0,0.25)]
              flex flex-col items-center justify-center
              relative
              p-2 lg:p-0
              min-h-[120px] lg:min-h-[400px]
            ">
              <div className="
                relative
                w-[110px] h-[110px]
                lg:w-[320px] lg:h-[320px]
                flex items-center justify-center
                shrink-0
              ">
                <motion.div
                  className="
                    absolute
                    w-[90px] h-[90px]
                    lg:w-[200px] lg:h-[200px]
                    rounded-full
                  "
                  style={{
                    background:
                      "radial-gradient(circle, rgba(199,154,45,0.15) 0%, transparent 75%)",
                  }}
                  animate={{ scale: [0.95, 1.1, 0.95], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                />

                <div className="
                  absolute
                  w-[120px] h-[120px]
                  lg:w-[270px] lg:h-[270px]
                  border border-dashed border-[rgba(199,154,45,0.4)]
                  rounded-full
                " />

                <motion.div
                  className="absolute w-full h-full rounded-full border-[3px] border-transparent border-t-base-gold"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
                />

                <div className="
                  relative z-10
                  font-serif
                  text-[2.6rem] lg:text-[6rem]
                  text-light-gold
                  drop-shadow-[0_0_25px_rgba(199,154,45,0.6)]
                ">
                  4.2x
                </div>
              </div>

              <div className="mt-1 lg:mt-4 text-center flex flex-col gap-1 lg:gap-3 items-center">
                <div className="text-white text-[0.55rem] lg:text-[0.8rem] tracking-[4px] font-extrabold opacity-50 uppercase">
                  Molecular Density Index
                </div>
                <motion.div
                  className="
                  bg-[rgba(199,154,45,0.1)]
                  border border-[rgba(199,154,45,0.2)]
                  py-1 px-3
                  lg:py-2 lg:px-6
                  rounded-[50px] 
                  text-light-gold
                  text-[0.7rem] lg:text-[0.95rem]
                  tracking-[2px]
                  backdrop-blur-[10px]
                  "
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  Start investing in cellular health.
                </motion.div>
              </div>
            </div>
          </section>

          {/* SHADOW LAYER */}
          <div
            aria-hidden
            className="
              pointer-events-none
              absolute inset-0
              rounded-[40px] lg:rounded-[80px]
              shadow-[0_30px_60px_rgba(0,0,0,0.35)] 
              lg:shadow-[0_60px_120px_rgba(0,0,0,0.35)]
            "
          />
        </div>
      </div>
    </section>
  );
}