"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Partner data
const partners = [
  { id: 1, logo: "/logo/logo1.jpg", name: "Maritime Authority of Nigeria" },
  { id: 2, logo: "/logo/logo2.jpg", name: "Nigerian Ports Authority" },
  { id: 3, logo: "/logo/logo3.jpg", name: "International Maritime Organization" },
  { id: 4, logo: "/logo/logo3.webp", name: "Lagos Port Complex" },
  { id: 5, logo: "/logo/logo5.webp", name: "Delta Marine Services" },
  { id: 6, logo: "/logo/logo6.webp", name: "West African Shipping Council" },
];

export default function OurPartners() {
  return (
    <section className="relative py-20 bg-white overflow-hidden font-roboto">

      {/* Background Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-950/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">


        {/* Partner Logos (Scrolling) */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          spaceBetween={40}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          allowTouchMove={false}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {partners.concat(partners).map((partner, index) => (
            <SwiperSlide
              key={`${partner.id}-${index}`}
              className="flex justify-center items-center"
            >
              <div className="w-30 h-20 flex justify-center items-center grayscal hover:grayscale-0 transition-all duration-500">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} - Jessfidel partner`}
                  width={160}
                  height={80}
                  className="object-fit hover:scale-105 transition-transform duration-500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
