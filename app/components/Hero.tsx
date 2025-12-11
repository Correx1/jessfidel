"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    image: "/images/hero1.png",
    title: "Expert Marine Consultancy Services",
    subtitle:
      "Delivering safety, compliance, and operational excellence across global maritime operations.",
    ctaText: "Discover Our Services",
    ctaLink: "/Services",
  },
  {
    id: 2,
    image: "/images/hero5.webp",
    title: "Professional Vessel Inspections",
    subtitle:
      "Comprehensive surveys and audits ensuring regulatory compliance and operational integrity.",
    ctaText: "Learn More",
    ctaLink: "/About",
  },
  {
    id: 3,
    image: "/images/hero3.png",
    title: "Advanced Maritime Training",
    subtitle:
      "World-class simulation training programs for seafarers and maritime professionals.",
    ctaText: "View Training Programs",
    ctaLink: "/Services",
  },
];

export default function Hero() {
  return (
    <section className="relative h-[80vh] overflow-hidden font-['Roboto',sans-serif]">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        loop
        speed={1800}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/60 to-blue-950/80" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-xl">
                  {slide.title}
                </h1>

                {slide.subtitle && (
                  <p className="mt-4 text-lg md:text-xl max-w-2xl font-medium">
                    {slide.subtitle}
                  </p>
                )}

                {slide.ctaText && (
                  <a
                    href={slide.ctaLink}
                    className="mt-6 inline-block bg-blue-950 hover:bg-blue-900 px-6 py-3 rounded-lg text-base font-semibold shadow-lg transition"
                  >
                    {slide.ctaText}
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="custom-prev absolute top-1/2 -translate-y-1/2 left-4 z-20 p-2 rounded-full bg-transparent hover:bg-transparent transition backdrop-blur-sm shadow-lg group">
        <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:scale-110 transition" />
      </button>

      <button className="custom-next absolute top-1/2 -translate-y-1/2 right-4 z-20 p-2 rounded-full bg-transparent hover:bg-transparent transition backdrop-blur-sm shadow-lg group">
        <ChevronRight className="w-6 h-6 text-gray-600 group-hover:scale-110 transition" />
      </button>
    </section>
  );
}
