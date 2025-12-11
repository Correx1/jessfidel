"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

// --------------------------------------------
// Accordion Component
// --------------------------------------------
const Accordion = ({ items }: { items: { q: string; a: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
        >
          <button
            className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="text-base md:text-lg">{item.q}</span>
            <svg
              className={`w-5 h-5 text-[#1a5589] transition-transform duration-300 flex-shrink-0 ${
                openIndex === i ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              openIndex === i ? "max-h-64 p-5 pt-0" : "max-h-0 p-0"
            }`}
          >
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// --------------------------------------------
// Service Data
// --------------------------------------------
const services = {
  "marine-survey": {
    title: "Marine Survey & Inspection",
    summary:
      "Thorough vessel inspections and detailed compliance reporting for Nigerian ship owners.",
    hero: "/images/survey1.webp",
    description: `We conduct comprehensive vessel inspections that cover every critical aspect of your ship's safety and compliance. Our experienced surveyors examine hull integrity, machinery condition, safety equipment, and navigation systems with meticulous attention to detail.`,
    
    whatWeDoTitle: "What We Inspect",
    whatWeDo: [
      "Complete hull and structural integrity assessment",
      "Machinery and engine room evaluation",
      "Safety equipment and fire protection systems",
      "Navigation and communication systems",
      "Compliance documentation and certification review",
      "Cargo handling equipment inspection"
    ],
    
    benefits: [
      "Identify issues before they become costly problems",
      "Meet international and local compliance standards",
      "Reduce insurance costs with proper documentation",
      "Improve vessel safety and crew confidence",
      "Get clear, actionable recommendations"
    ],
    
    image: "/images/survey.webp",
    faqs: [
      {
        q: "What's included in a marine survey?",
        a: "We inspect hull structure, machinery, safety gear, navigation equipment, and documentation. You'll receive a detailed report with findings and recommendations.",
      },
      {
        q: "How long does an inspection take?",
        a: "Typically 1-3 days depending on vessel size and scope. We'll give you a timeline after discussing your specific needs.",
      },
      {
        q: "Do you provide certification?",
        a: "We provide detailed reports that align with international class and flag requirements. These can support your certification processes.",
      },
    ],
  },

  trainings: {
    title: "Crew Training Programs",
    summary:
      "Hands-on maritime training that builds real skills for Nigerian waters.",
    hero: "/images/training 2.jpg",
    description: `Our training programs prepare crews for actual conditions they'll face at sea. We combine simulator exercises, practical drills, and scenario-based learning to build both confidence and competence in real-world situations.`,
    
    whatWeDoTitle: "Training Programs",
    whatWeDo: [
      "Bridge simulator training for officers",
      "Engine room operations and maintenance",
      "Safety and emergency response drills",
      "Navigation and chartwork fundamentals",
      "Communication and teamwork exercises",
      "Nigerian coastal navigation specifics"
    ],
    
    benefits: [
      "STCW-compliant certification recognized internationally",
      "Reduced incidents through better-trained crews",
      "Customized programs for your vessel type",
      "Experienced instructors with real sea time",
      "Flexible scheduling to minimize downtime"
    ],
    
    image: "/images/training.jpeg",
    faqs: [
      {
        q: "Are your courses STCW-compliant?",
        a: "Yes. Our training modules follow STCW conventions and international safety standards.",
      },
      {
        q: "Can you customize training for our company?",
        a: "Absolutely. We tailor courses to match your vessels, equipment, and operational needs.",
      },
      {
        q: "Do participants get certificates?",
        a: "Yes. Everyone who completes training receives a certificate recognized by maritime authorities.",
      },
    ],
  },
  
  "crew-management": {
    title: "Crew Management & Support",
    summary:
      "Complete crew lifecycle management from recruitment to ongoing support.",
    hero: "/images/crew2.webp",
    description: `We handle every aspect of crew management so you can focus on operations. From finding qualified maritime professionals to managing certifications and coordinating training, we ensure you always have capable crews ready for Nigerian waters.`,
    
    whatWeDoTitle: "Our Services",
    whatWeDo: [
      "Recruitment of certified maritime professionals",
      "Certification verification and renewal coordination",
      "Training program management",
      "Performance monitoring and evaluation",
      "Crew rotation and replacement planning",
      "Emergency crew support and backup"
    ],
    
    benefits: [
      "Access to database of qualified professionals",
      "Reduced recruitment time and costs",
      "Ensured compliance with certification requirements",
      "Ongoing support for crew development",
      "24/7 assistance for crew emergencies"
    ],
    
    image: "/images/crew.webp",
    faqs: [
      {
        q: "How do you source crew members?",
        a: "We maintain a database of certified maritime professionals and work with accredited training institutions across Nigeria.",
      },
      {
        q: "Can you help with crew certification?",
        a: "Yes. We verify existing certifications and coordinate training for crew members who need updates or new qualifications.",
      },
      {
        q: "Do you provide ongoing crew support?",
        a: "Yes. We offer continuous support including performance monitoring, training updates, and replacement coordination when needed.",
      },
    ],
  },
};

// --------------------------------------------
// Page Component
// --------------------------------------------
export default function ServicePage() {
  const router = useRouter();
  const { slug } = useParams();

  const service = services[slug as keyof typeof services];

 

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Roboto',sans-serif]">
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
        <Image
          src={service.hero}
          alt={`${service.title} - Jessfidel Marine Consultancy`}
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000]/80 via-[#000]/65 to-[#000]/80" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            {service.title}
          </h1>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed mb-8">
            {service.summary}
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#000] font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-300"
          >
            Get Started
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>

      {/* Overview Section */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-sm font-semibold text-[#1a5589] uppercase tracking-wider mb-3">
              Service Overview
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {service.title}
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              {service.description}
            </p>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative w-full h-[420px] md:h-[480px] rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={service.image}
              alt={`${service.title} visual`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 40vw"
            />
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* What We Do */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {service.whatWeDoTitle}
              </h3>
              <ul className="space-y-4">
                {service.whatWeDo.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#1a5589] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Choose Us
              </h3>
              <ul className="space-y-4">
                {service.benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#1a5589]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#1a5589]" />
                    </div>
                    <span className="text-gray-700 text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Quick answers to questions you might have about this service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <Accordion items={service.faqs} />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-[#1a5589]/20 rounded-full mix-blend-multiply blur-3xl opacity-40" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#000]/20 rounded-full mix-blend-multiply blur-3xl opacity-40" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Contact Jessfidel today to discuss your needs and see how we can help 
            with your maritime operations.
          </motion.p>

          <div className="inline-flex flex-wrap items-center gap-4 justify-center">
            <button
              onClick={() => router.push("/contact")}
              className="px-8 py-3 rounded-xl bg-[#1a5589] text-white font-semibold shadow-lg hover:bg-[#000] transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Contact Us
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 rounded-xl bg-white text-[#1a5589] font-semibold border-2 border-[#1a5589] hover:bg-[#1a5589]/5 shadow-md transition-all duration-300"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}