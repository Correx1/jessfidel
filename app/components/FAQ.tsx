"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "What services does Jessfidel provide?",
      answer:
        "We offer vessel inspection and surveys, crew simulation training, navigation consultancy, and full marine operations support. Everything you need to keep vessels compliant and crews capable.",
    },
    {
      question: "How long does a typical vessel inspection take?",
      answer:
        "Most inspections take 1-3 days depending on vessel size and scope. We provide a detailed timeline after reviewing your specific needs.",
    },
    {
      question: "Do you provide ongoing support after training?",
      answer:
        "Yes. We offer follow-up support, refresher courses, and operational guidance to ensure training benefits stick long-term.",
    },
    {
      question: "What makes Jessfidel different from other consultancies?",
      answer:
        "We focus on practical solutions that work in Nigerian waters. No unnecessary paperwork—just hands-on expertise, clear communication, and results you can measure.",
    },
    {
      question: "Do you work with vessels outside Nigeria?",
      answer:
        "While we specialize in Nigerian operations, we can support vessels in West African waters. Contact us to discuss your specific location and needs.",
    },
  ];

  return (
    <section className="relative py-20 px-6 lg:px-20 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-3xl mx-auto text-center mb-12 font-['Roboto',sans-serif]">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          Quick answers to common questions about our services and how we work.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4 font-['Roboto',sans-serif]">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="rounded-2xl border border-gray-200 shadow-sm bg-white px-6 py-2 hover:shadow-md transition-shadow"
          >
            <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-gray-800 hover:text-[#1a5589] hover:no-underline transition-colors [&[data-state=open]]:text-[#1a5589]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-sm md:text-base leading-relaxed pt-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}