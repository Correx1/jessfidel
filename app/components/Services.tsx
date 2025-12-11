"use client";

import { motion } from "framer-motion";
import { Ship, Compass, Waves, ClipboardCheck } from "lucide-react";

const services = [
  {
    title: "Marine Survey & Inspection",
    description:
      "Comprehensive vessel surveys, condition assessments, and pre-purchase inspections ensuring adherence to global maritime regulations.",
    icon: ClipboardCheck,
  },
  {
    title: "Crew Training & Certification",
    description:
      "Simulation-based training programs for deck officers, engineers, and maritime professionals, fully compliant with STCW standards.",
    icon: Ship,
  },
  {
    title: "Navigation & Route Planning",
    description:
      "Professional consultancy for route optimization, passage planning, and electronic chart management for safe vessel operations.",
    icon: Compass,
  },
  {
    title: "Maritime Operations Support",
    description:
      "24/7 operational assistance, documentation support, port call coordination, and compliance management for vessel operators.",
    icon: Waves,
  },
];

export default function OurServices() {
  return (
    <section
      className="relative w-full py-28 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white font-roboto overflow-hidden"
    >
      {/* Background abstract wave pattern */}
      <div className="absolute inset-0">
        <svg
          className="absolute opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            d="M0,224L30,213.3C60,203,120,181,180,160C240,139,300,117,360,128C420,139,480,181,540,186.7C600,192,660,160,720,144C780,128,840,128,900,149.3C960,171,1020,213,1080,218.7C1140,224,1200,192,1260,181.3C1320,171,1380,181,1410,186.7L1440,192L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="font-roboto"
        >
          <p className="text-blue-300 font-medium uppercase tracking-wider mb-4">
            What We Do
          </p>

          <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-8 text-blue-50">
            Our Services
          </h2>

          <p className="text-lg lg:text-xl text-blue-100 leading-relaxed mb-10 max-w-xl">
            We provide industry-leading marine consultancy services tailored for
            vessel owners, operators, and maritime professionals — ensuring
            operational safety, compliance, and efficiency across all activities.
          </p>

          {/* Visual Accent */}
          <div className="relative flex items-center">
            <div className="w-28 h-28 rounded-full bg-blue-800/50 flex items-center justify-center">
              <Waves size={48} className="text-blue-300" />
            </div>
            <div className="absolute -right-8 -bottom-8 w-20 h-20 rounded-full bg-blue-700/40 blur-xl"></div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 font-roboto"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={i} className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 bg-blue-800/70 text-blue-200 p-4 rounded-xl group-hover:bg-blue-700 group-hover:text-white transition-colors duration-300">
                  <Icon size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-50 mb-2">
                    {service.title}
                  </h3>

                  <p className="text-blue-100 text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
