"use client";

import React, { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Compass, Ship, Waves, ClipboardCheck } from "lucide-react";
import TestimonialSection from "../components/Testimonial";
import OurPartners from "../components/Partners";

// ------------------------------
// Data
// ------------------------------
const services = [
  {
    title: "Simulation Training",
    description:
      "Hands-on simulator programs designed to improve crew readiness for real-world navigation, emergencies, and vessel handling.",
    icon: Ship,
  },
  {
    title: "Vessel Inspection",
    description:
      "Thorough vessel condition assessments, compliance checks, and operational audits that help prevent costly incidents.",
    icon: ClipboardCheck,
  },
  {
    title: "Navigation Consultancy",
    description:
      "Expert route evaluation and voyage planning for safer, more efficient navigation through Nigerian coastal and inland waters.",
    icon: Compass,
  },
  {
    title: "Marine Operations Support",
    description:
      "End-to-end operational assistance, including documentation, permits, port coordination, and continuous technical support.",
    icon: Waves,
  },
];

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 85, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 12, suffix: "+", label: "Nigerian Ports" },
];

// ------------------------------
// Utilities
// ------------------------------
function useInViewOnce<T extends HTMLElement>(margin = "0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin: margin, threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView, margin]);

  return { ref, inView } as const;
}

function useCountUp(target: number, start: boolean, duration = 4000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

// ------------------------------
// Main Page
// ------------------------------
export default function AboutPage(): JSX.Element {
  return (
    <main className="relative font-['Roboto',sans-serif]">

      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/hero5.webp"
          alt="Jessfidel Marine Consultancy - About Us"
          fill
          className="object-cover scale-105"
          priority
          quality={85}
          sizes="100vw"
        />

        {/* Stronger dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            About <span className="text-blue-200">Us</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            We deliver reliable, field-tested marine consultancy services, from vessel inspections 
            to crew training and operational support, compliance, 
            and efficiency across Nigerian waters.
          </p>
        </motion.div>
      </section>

      {/* WHO WE ARE */}
  <section className="relative py-16 lg:py-20 bg-white font-roboto">
  <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

    {/* Text */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-5"
    >
      <div className="text-xs md:text-sm font-semibold text-blue-950 uppercase tracking-wide mb-3">
        Who We Are
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-5">
        Trusted Maritime Support Backed by Real Operational Experience
      </h2>

      <p className="text-gray-700 leading-relaxed text-base md:text-[17px] mb-4">
        Jessfidel Marine Consultancy provides practical, on-ground support for
        vessel owners and operators navigating Nigerian waters. Our team brings
        years of experience across vessel inspections, simulation training, and
        port operations.
      </p>

      <p className="text-gray-700 leading-relaxed text-base md:text-[17px]">
        Our mission is simple: reduce risks, strengthen crew competence, and
        ensure operations run smoothly and effectively—every single time.
      </p>
    </motion.div>

    {/* Image */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="lg:col-span-7"
    >
      <div className="relative w-full h-[300px] md:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-xl">
        <Image
          src="/images/hmm.jpg"
          alt="Jessfidel team at work"
          fill
          className="object-fit scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </motion.div>

  </div>
</section>

      {/* SERVICES */}
      <section id="services" className="relative py-10 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">

        {/* Background accents */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1a5589]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#174982]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              What We Do
            </h2>
            <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Comprehensive marine solutions designed to keep your vessels compliant, your crew prepared,
              and your operations running without interruption.
            </p>
          </div>

          {/* Services Rail */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-1 rounded-full 
            bg-gradient-to-b from-[#1a5589] via-[#174982] to-[#1a5589]" />

            <ul className="space-y-4">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={i} className="relative pl-16 md:pl-20">

                    {/* Icon Node */}
                    <div className="absolute left-0 md:left-2 top-4 h-8 w-8 rounded-full bg-white shadow-md ring-2 ring-[#1a5589] grid place-items-center">
                      <Icon size={18} className="text-[#1a5589]" />
                    </div>

                    {/* Card */}
                    <div className="group rounded-2xl border border-gray-200 bg-white backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-5 p-6 md:p-8 gap-4 md:gap-6">
                        <div className="md:col-span-2">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                            {s.title}
                          </h3>
                        </div>
                        <div className="md:col-span-3">
                          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </div>
                      <div className="h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#1a5589] via-[#174982] to-[#1a5589] rounded-b-2xl" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsSection />

           {/* CTA */}
   <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 font-roboto">
  {/* Decorative Glows */}
  <div className="absolute -top-32 -right-24 w-96 h-96 bg-blue-800/30 rounded-full blur-3xl opacity-40" />
  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl opacity-40" />

  <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
    <motion.h3
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight"
    >
      Ready to Improve Your Marine Operations?
    </motion.h3>

    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed"
    >
      Speak with our team about vessel inspections, crew competency training, and operational support solutions tailored for Nigerian waters.
    </motion.p>

    {/* Buttons */}
    <div className="inline-flex flex-wrap items-center gap-4 justify-center">
      <a
        href="/contact"
        className="px-8 py-3 rounded-xl bg-white text-blue-950 font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105"
      >
        Get in Touch
      </a>

      <a
        href="/services"
        className="px-8 py-3 rounded-xl bg-transparent text-white font-semibold border-2 border-white hover:bg-white/10 shadow-md transition-all duration-300"
      >
        View Services
      </a>
    </div>
  </div>
</section>

      {/* TESTIMONIALS */}
      <TestimonialSection />

 

      {/* PARTNERS */}
      <OurPartners />
    </main>
  );
}

// ------------------------------
// Stats Section Component
// ------------------------------
function StatsSection(): JSX.Element {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-60px");

  return (
    <section ref={ref} className="relative py-14 bg-white overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-px w-[90%] bg-gradient-to-r from-transparent via-[#1a5589]/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Our Track Record
          </h3>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            Numbers that reflect our proven impact across Nigerian waters.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Stat key={i} target={s.value} suffix={s.suffix} label={s.label} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  target,
  suffix,
  label,
  start,
}: {
  target: number;
  suffix?: string;
  label: string;
  start: boolean;
}): JSX.Element {
  const value = useCountUp(target, start);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#1a5589] tabular-nums">
        {value}
        <span className="text-[#174982]">{suffix ?? ""}</span>
      </div>
      <div className="mt-2 text-gray-600 text-sm md:text-base font-medium">{label}</div>
    </div>
  );
}
