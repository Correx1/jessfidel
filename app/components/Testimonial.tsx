"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Testimonial = {
  id: number;
  text: string;
  author: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    text:
      "Jessfidel handled our vessel inspection with outstanding professionalism. They identified issues we overlooked and provided clear corrective steps. Highly recommended.",
    author: "Captain Adebayo Okon",
    role: "Fleet Manager, Lagos Maritime Services",
  },
  {
    id: 2,
    text:
      "The simulation training significantly boosted our crew's confidence and operational awareness. The practical skills gained are used every day on board.",
    author: "Chioma Nwankwo",
    role: "Operations Director, Delta Shipping Co.",
  },
  {
    id: 3,
    text:
      "Fast, reliable, and thorough. Jessfidel guided us through compliance requirements and kept our processes aligned with maritime regulations.",
    author: "Ibrahim Yusuf",
    role: "Vessel Owner, Port Harcourt",
  },
];

export default function TestimonialSection() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 font-['Roboto',sans-serif]">

      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-950/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

        {/* Left Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 leading-tight">
            What Our <span className="text-blue-900">Clients</span> Say
          </h2>

          <p className="mt-6 text-base md:text-lg text-gray-700 max-w-md leading-relaxed">
            Real feedback from vessel owners and operators who trust Jessfidel
            for reliable, compliant, and professional maritime support.
          </p>
        </motion.div>

        {/* Right Carousel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-xl">
            <div className="rounded-3xl p-6 lg:p-8 bg-white/90 backdrop-blur-lg shadow-xl border border-gray-100">
              <Swiper
                modules={[ Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="w-full"
              >
                {testimonials.map((t) => (
                  <SwiperSlide key={t.id}>
                    <div className="flex flex-col items-start text-left">

                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-blue-900"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-sm md:text-base text-gray-800 leading-relaxed italic mb-6">
                        {t.text}
                      </p>

                      {/* Author */}
                      <div>
                        <div className="text-base font-semibold text-blue-950">
                          {t.author}
                        </div>
                        <div className="text-sm text-blue-900 font-medium">
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pagination Styling */}
      <style jsx global>{`
        .swiper-pagination {
     
          display: none;
       
        }
       
      `}</style>
    </section>
  );
}
