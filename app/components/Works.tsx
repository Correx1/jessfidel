"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Loader2, ArrowRight } from "lucide-react";

type Work = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  excerpt: string;
};

export default function Works() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "work"] | order(_createdAt desc)[0...3]{
            _id,
            title,
            "slug": slug.current,
            "category": category->title,
            "excerpt": pt::text(excerpt),
            "thumbnail": thumbnail.asset->url
          }`
        );
        setWorks(data);
      } catch (error) {
        console.error("Error fetching works:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 py-24 flex justify-center items-center font-['Roboto',sans-serif]">
        <Loader2 className="w-10 h-10 text-blue-950 animate-spin" />
      </section>
    );
  }

  if (!works.length) return null;

  return (
    <section className="bg-gray-50 py-20 font-['Roboto',sans-serif]" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950">
            Featured Works
          </h2>
          <p className="text-blue-950/70 text-lg mt-3 max-w-2xl mx-auto">
            Explore some of our recent projects making impact in the maritime sector.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-10 lg:gap-12 xl:gap-14">
          {works.map((work, index) => (
            <motion.div
              key={work._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >

              {/* Image */}
              <div className="relative w-full h-60 md:h-64">
                <Image
                  src={work.thumbnail || "/images/placeholder.jpg"}
                  alt={work.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <span className="inline-block bg-blue-100 text-blue-950 px-3 py-1 rounded-full text-xs font-medium mb-3 w-fit">
                  {work.category || "General"}
                </span>

                <h3 className="text-xl font-bold text-blue-950 mb-2 line-clamp-2">
                  {work.title}
                </h3>

                <p className="text-blue-950/70 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                  {work.excerpt ||
                    "An insight into one of our latest innovative maritime solutions."}
                </p>

                <Link
                  href={`/Our-works?work=${work.slug}`}
                  className="inline-flex items-center gap-2 text-blue-950 font-semibold hover:text-blue-900 transition-colors mt-auto"
                >
                  <span>View Details</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-8">
          <Link
            href="/Our-works"
            className="inline-flex items-center gap-1 px-4 py-1 rounded-lg bg-blue-950 text-white font-normal text-base shadow-md hover:bg-blue-900 hover:shadow-lg transition-all duration-300"
          >
            <span>see more...</span>
          
          </Link>
        </div>
      </div>
    </section>
  );
}
