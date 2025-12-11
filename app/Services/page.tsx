"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Users,
  Globe2,
  Compass,
  Ship,
  Target,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    slug: "marine-survey",
    title: "Marine Survey & Inspection",
    desc: "Comprehensive inspections to ensure vessel compliance and safety.",
    icon: Ship,
  },
  {
    slug: "regulatory-compliance",
    title: "Regulatory Compliance",
    desc: "Expert guidance for smooth adherence to maritime regulations.",
    icon: ShieldCheck,
  },
  {
    slug: "crew-management",
    title: "Crew Management",
    desc: "Efficient crew recruitment, training, and welfare management.",
    icon: Users,
  },
  {
    slug: "chartering-brokerage",
    title: "Chartering & Brokerage",
    desc: "Professional support in vessel chartering and shipping brokerage.",
    icon: Globe2,
  },
  {
    slug: "navigation-planning",
    title: "Navigation & Route Planning",
    desc: "Optimized voyage planning with advanced navigation solutions.",
    icon: Compass,
  },
  {
    slug: "marine-projects",
    title: "Marine Project Consulting",
    desc: "Tailored consultancy for offshore and maritime projects.",
    icon: Target,
  },
];

const highlights = [
  {
    title: "Global Expertise",
    desc: "Decades of international marine experience for world-class delivery.",
    icon: Globe2,
    stat: "25+ Years Experience",
  },
  {
    title: "Trusted Solutions",
    desc: "Reliable consultancy trusted by top global shipping firms.",
    icon: ShieldCheck,
    stat: "500+ Projects Completed",
  },
  {
    title: "Client-Centered",
    desc: "Tailored services with professionalism and dedicated support.",
    icon: Users,
    stat: "98% Client Satisfaction",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
     {/* Hero */}
<section className="relative h-[60vh] flex items-center justify-center text-center text-white">
  {/* Background Image */}
  <Image
    src="/images/b6.jpg"
    alt="Marine consultancy background"
    fill
    priority
    className="object-cover"
  />
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10 max-w-3xl px-6">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold leading-tight"
    >
      Our Professional Marine Consultancy Services
    </motion.h1>
    <p className="mt-4 text-lg text-gray-200">
      Industry-leading solutions in operations, consultancy, and compliance.
    </p>
  </div>
</section>


      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            Explore Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/Services/${s.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col items-start p-8 bg-white rounded-2xl shadow hover:shadow-lg transition hover:-translate-y-1 cursor-pointer"
                >
                  <s.icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-blue-800 mb-10"
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center p-6 bg-white/70 backdrop-blur-md rounded-xl hover:shadow-md transition"
              >
                <div className="bg-blue-600 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                  <h.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{h.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{h.desc}</p>
                <div className="flex items-center text-sm font-medium text-blue-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  {h.stat}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   {/* CTA */}
<section className="py-20 bg-[#0a1a2f] text-white">
  <div className="max-w-5xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Ready to Elevate Your Marine Operations?
    </h2>
    <p className="text-gray-300 max-w-2xl mx-auto mb-8">
      Let’s partner with you to deliver safe, efficient, and innovative solutions 
      tailored to your maritime needs.
    </p>
    <Button className="bg-white text-[#0a1a2f] px-8 py-4 text-lg font-semibold rounded-xl shadow hover:bg-gray-100 transition group">
      Contact Us Today
      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
    </Button>
  </div>
</section>

    </div>
  );
}
