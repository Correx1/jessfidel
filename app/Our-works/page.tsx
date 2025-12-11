/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, Calendar, Share2, AlertCircle, CheckCircle2 } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { worksQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";



type Work = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  duration?: string;
  thumbnail?: string;
  images?: string[];
  excerpt?: string;
  details?: any[];
  fullDescription?: any[];
};

export default function OurWorksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get("work");

  const [works, setWorks] = useState<Work[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleProjects, setVisibleProjects] = useState<number>(3);
  const [visibleSidebarProjects, setVisibleSidebarProjects] = useState<number>(5);
  const [shareNotification, setShareNotification] = useState<{ show: boolean; message: string; type: "success" | "error" }>({ show: false, message: "", type: "success" });

  const cacheKey = "works_cache_ucp_v1";

  const selected = useMemo(() => {
    if (!selectedSlug) return null;
    return works.find((w) => w.slug === selectedSlug) ?? null;
  }, [works, selectedSlug]);

  const displayedWorks = useMemo(() => works.slice(0, visibleProjects), [works, visibleProjects]);

  const sidebarWorks = useMemo(
    () => works.filter((w) => !selected || w._id !== selected._id).slice(0, visibleSidebarProjects),
    [works, selected, visibleSidebarProjects]
  );

  const fetchWorks = useCallback(async (signal?: AbortSignal) => {
    try {
      setError(null);

      const cached = typeof window !== "undefined" ? sessionStorage.getItem(cacheKey) : null;
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as Work[];
          if (Array.isArray(parsed) && parsed.length > 0) setWorks(parsed);
        } catch {
          // ignore
        }
      }

      const data = await client.fetch(worksQuery, {}, { signal });
      if (!Array.isArray(data)) throw new Error("Invalid response from CMS");

      const normalized: Work[] = data.map((d: any) => ({
        _id: d._id,
        title: d.title || "Untitled",
        slug: d.slug?.current || d.slug || "",
        category: d.category || "General",
        date: d.date || d.publishedAt || "",
        duration: d.duration || null,
        thumbnail: d.thumbnail?.asset?.url || d.thumbnail || null,
        images: (d.images || []).map((img: any) => img?.asset?.url || img || ""),
        excerpt: d.excerpt || d.description || "",
        details: d.details || [],
        fullDescription: d.fullDescription || [],
      }));

      setWorks(normalized);
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(normalized));
      } catch {}
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error("Failed to fetch works:", err);
      setError("Unable to load works. Please check your connection.");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchWorks(controller.signal);
    return () => controller.abort();
  }, [fetchWorks]);

  const handleSelectProject = (slug: string) => router.push(`?work=${slug}`, { scroll: false });
  const handleCloseProject = () => router.push("/Our-works", { scroll: false });

  const loadMoreProjects = () => setVisibleProjects((p) => Math.min(p + 4, works.length || 999));
  const loadMoreSidebarProjects = () => setVisibleSidebarProjects((p) => Math.min(p + 5, works.length || 999));

  const shareProject = async (selectedWork?: Work) => {
    if (!selectedWork) return;
    const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/Our-works?work=${selectedWork.slug}`;

    try {
      if (navigator.share) await navigator.share({ title: selectedWork.title, text: selectedWork.excerpt, url: shareUrl });
      else {
        await navigator.clipboard.writeText(shareUrl);
        setShareNotification({ show: true, message: "Link copied to clipboard", type: "success" });
      }
    } catch (err) {
      console.error(err);
      setShareNotification({ show: true, message: "Failed to copy link", type: "error" });
    }

    setTimeout(() => setShareNotification({ show: false, message: "", type: "success" }), 3000);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/images/placeholder.jpg";
  };

  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => <p className="text-gray-700 mb-5 leading-relaxed text-base">{children}</p>,
      h2: ({ children }: any) => <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-medium mt-6 mb-3 text-gray-900">{children}</h3>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-semibold text-gray-900">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      link: ({ children, value }: any) => (
        <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:underline">
          {children}
        </a>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc list-inside mb-5">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal list-inside mb-5">{children}</ol>,
    },
  };

  // ------------------ Subcomponents ------------------
  const SkeletonCard = ({ variant = "list" }: { variant?: "list" | "detail" }) => (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/5 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <div className="h-5 w-20 rounded-full bg-gray-100 shimmer" />
            <div className="h-3 w-16 rounded bg-gray-100 shimmer" />
          </div>

          <div className="h-7 rounded bg-gray-100 shimmer mb-3 w-2/3" />
          <div className="h-3 bg-gray-100 shimmer mb-2 w-full" />
          <div className="h-3 bg-gray-100 shimmer mb-2 w-5/6" />

          <div className="mt-5">
            <div className="inline-block h-8 w-24 rounded-full bg-gray-100 shimmer" />
          </div>
        </div>

        <div className="md:w-2/5 relative h-48 md:h-auto md:min-h-[220px]">
          <div className="absolute inset-0 bg-gray-100 shimmer" />
        </div>
      </div>
    </div>
  );

  const WorkCard = ({ work, index = 0 }: { work: Work; index?: number }) => (
    <motion.article
      key={work._id}
      initial={{ opacity: 0, y: 8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.42 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white rounded-lg border border-gray-100 overflow-hidden transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/5 p-6 md:p-7">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="bg-blue-50 text-blue-900 px-2.5 py-1 rounded-full text-xs font-semibold">{work.category}</span>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Calendar size={12} />
              <time dateTime={work.date}>{work.date}</time>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2 text-gray-800 leading-tight">
            <button onClick={() => handleSelectProject(work.slug)} className="text-left hover:text-blue-900 transition-colors focus:outline-none">
              {work.title}
            </button>
          </h3>

          <p className="text-gray-600 leading-snug mb-4 text-sm line-clamp-3">{work.excerpt}</p>

          <button onClick={() => handleSelectProject(work.slug)} className="inline-flex items-center gap-2 text-blue-900 font-medium hover:text-blue-800 transition-all group focus:outline-none rounded px-2 py-1">
            <span>View Work</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="md:w-2/5 relative h-48 md:h-auto md:min-h-[200px]">
          {work.thumbnail ? (
            <Image src={work.thumbnail} alt={`${work.title} thumbnail`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" onError={handleImageError} />
          ) : (
            <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
              <div className="h-10 w-10 bg-gray-100 rounded-full shimmer" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      </div>
    </motion.article>
  );

  const WorkDetailView = ({ work }: { work: Work }) => (
    <motion.div key={work._id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.38 }} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="p-5 lg:p-6 border-b border-gray-100">
        <button onClick={handleCloseProject} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none rounded px-2 py-1">
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>

      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold">{work.category}</span>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar size={14} />
            <time dateTime={work.date}>{work.date}</time>
          </div>
          {work.duration && <span className="text-gray-500 text-sm">Duration: {work.duration}</span>}
        </div>

        <div className="flex justify-between items-start mb-6 gap-4 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-tight">{work.title}</h2>
          <button onClick={() => shareProject(work)} className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-sm font-medium transition-all focus:outline-none">
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>

        <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">{work.excerpt}</p>

        <div className="mb-8">
          <div className="prose prose-md max-w-none text-gray-700">
            <PortableText value={work.details || []} components={portableTextComponents} />
          </div>
        </div>

        {work.images && work.images.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Gallery</h3>
            <div className="rounded-md overflow-hidden">
              <Swiper modules={[Navigation, Pagination, A11y]} navigation pagination={{ clickable: true }} loop={work.images.length > 1} className="h-[320px] lg:h-[400px] rounded-md">
                {work.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-full">
                      <Image src={img} alt={`${work.title} - Image ${i + 1}`} fill className="object-cover" onError={handleImageError} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}

        {work.fullDescription && work.fullDescription.length > 0 && (
          <div className="prose prose-md max-w-none text-gray-700">
            <PortableText value={work.fullDescription} components={portableTextComponents} />
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <>
      <AnimatePresence>
        {shareNotification.show && (
          <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="fixed top-6 right-6 z-50 bg-white rounded-md p-3 flex items-center gap-3 border border-gray-100 shadow-sm max-w-sm">
            {shareNotification.type === "success" ? <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
            <p className="text-sm text-gray-700 font-medium">{shareNotification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white">
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <Image src="/images/hero4.jpg" alt="Our Works - Marine Consulting Nigeria" fill className="object-cover brightness-[0.85]" priority onError={handleImageError} />
          <div className="absolute inset-0  bg-black/60" />

          <div className="relative z-10 px-6 text-center max-w-4xl">
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-3 tracking-tight">
              Our Works
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.6 }} className="text-sm md:text-base text-blue-50 max-w-2xl mx-auto leading-relaxed font-medium">
              Practical marine solutions for Nigerian waters. Vessel checks, shore support, and offshore planning executed clearly and on time.
            </motion.p>
          </div>
        </section>

        <main className="bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              <div className="lg:col-span-8">
                {!selected && (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">Work Portfolio</h2>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">Browse a curated selection of our recent works across coastal and offshore operations in Nigeria.</p>
                    </div>

                    <div className="space-y-6">
                      {(works.length === 0 ? Array.from({ length: 3 }) : displayedWorks).map((w: any, i: number) => (
                        <div key={w?._id ?? i}>
                          {works.length === 0 ? <SkeletonCard /> : <WorkCard work={w} index={i} />}
                        </div>
                      ))}
                    </div>

                    {works.length > 0 && visibleProjects < works.length && (
                      <div className="flex justify-center mt-8">
                        <button onClick={loadMoreProjects} className="px-3 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-all focus:outline-none shadow-sm">
                        See more..
                        </button>
                      </div>
                    )}
                  </>
                )}

                {selected && (() => {
                  if (!selected) return null;
                  return <WorkDetailView work={selected} />;
                })()}
              </div>

              <aside className="lg:col-span-4">
                <div className="bg-white rounded-lg border border-gray-100 p-6 lg:p-7 sticky top-6">
                  <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-4">{selected ? "Other Works" : "Recent Works"}</h4>

                  <div className="space-y-3">
                    {(works.length === 0 ? Array.from({ length: 4 }) : sidebarWorks).map((w: any, idx: number) => {
                      if (works.length === 0) {
                        return (
                          <div key={idx} className="w-full p-3 rounded-md border border-gray-50">
                            <div className="h-3 bg-gray-100 shimmer w-2/5 mb-2" />
                            <div className="h-4 bg-gray-100 shimmer w-3/4" />
                          </div>
                        );
                      }

                      const raw = (w.excerpt || "").replace(/\n+/g, " ").trim();
                      const shortExcerpt = raw.split(" ").slice(0, 10).join(" ") + (raw.split(" ").length > 10 ? "..." : "");

                      return (
                        <button key={w._id} onClick={() => handleSelectProject(w.slug)} className="block text-left w-full p-3 rounded-md hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all group focus:outline-none">
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                            <Calendar size={12} />
                            <time dateTime={w.date}>{w.date}</time>
                          </div>

                          <div className="font-medium text-gray-800 group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug">{w.title}</div>

                          <p className="text-gray-500 text-sm mt-1 line-clamp-1">{shortExcerpt}</p>
                        </button>
                      );
                    })}
                  </div>

                  {works.length > 0 && visibleSidebarProjects < works.filter((w) => !selected || w._id !== selected._id).length && (
                    <button onClick={loadMoreSidebarProjects} className="w-full py-2 mt-6 text-blue-900 border border-gray-200 rounded-md hover:bg-blue-50 text-sm font-medium transition-all focus:outline-none">Show more works</button>
                  )}
                </div>
              </aside>

            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 220%;
          height: 100%;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%);
          transform: translateX(0);
          animation: shimmer 1.2s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(0%);} 
          100% { transform: translateX(60%);} 
        }
      `}</style>
    </>
  );
}
