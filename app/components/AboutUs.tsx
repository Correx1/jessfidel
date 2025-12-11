"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="bg-white relative py-10 lg:py-16 overflow-hidden font-['Roboto',sans-serif]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left - Content */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Built on <span className="text-blue-950">Years</span> of Maritime Experience
            </h2>

            <div className="w-20 h-1 bg-blue-950 rounded-full"></div>
          </div>

          {/* Description */}
          <div className="space-y-4 mt-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Jessfidel brings practical maritime expertise to vessel owners and operators across Nigeria. 
              We focus on what matters: safer operations, compliant crews, and efficient turnarounds.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              From vessel inspections to hands-on training, we work alongside your team to solve real challenges. 
              No fluff, just results that stick.
            </p>
          </div>

          <div className="flex items-center space-x-5 mt-8">
            <a
              href="/About"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-950 text-white font shadow-lg hover:bg-blue-900 transition-all duration-300 "
              aria-label="Learn more about Jessfidel"
            >
              Learn More About Us
            </a>
          </div>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >
          

          <div className="relative w-full h-[420px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 ">
            <Image
              src="/images/abo.jpg"
              alt="Jessfidel maritime consulting team at work"
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 30vw"
              className="object-cover "
              priority
            />
             <div className="absolute inset-0 bg-black/20"></div>
          </div>
          

          {/* Accent shapes */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-950/10 rounded-full -z-10 blur-2xl"></div>
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-blue-900/10 rounded-full -z-10 blur-2xl"></div>
        </motion.div>

      </div>
    </section>
  );
}
