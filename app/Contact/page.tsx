"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";

const contacts = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+234 801 234 5678", "+234 803 456 7890"],
    href: "tel:+2348012345678",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@jessfidel.com", "support@jessfidel.com"],
    href: "mailto:info@jessfidel.com",
  },
  {
    icon: MapPin,
    title: "Office Location",
    details: ["Port Harcourt", "Rivers State, Nigeria"],
    href: "https://maps.google.com/?q=Port+Harcourt+Nigeria",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 8:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"],
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate API call - Replace with actual backend integration
    setTimeout(() => {
      setStatus("submitted");
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setStatus("idle");
      }, 4000);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen font-['Roboto',sans-serif]">
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/contact.webp"
            alt="Contact Jessfidel Marine Consultancy"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000]/30 via-[#000]/50 to-[#000]/70" />
        </motion.div>

        <div className="relative z-10 px-6 max-w-3xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-white/90 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Have questions about vessel inspections, crew training, or marine operations? 
            Our team is here to help.
          </motion.p>
        </div>
      </section>

      {/* Contact Info + Form Section */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-10 lg:gap-12">
          
          {/* Left - Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Lets Connect
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
              Reach out for consultations, inspections, or any maritime support you need.
            </p>
            
            <div className="space-y-6">
              {contacts.map(({ icon: Icon, title, details, href }) => (
                <div key={title} className="flex items-start group">
                  <div className="bg-[#1a5589]/10 p-3 rounded-xl mr-4 group-hover:bg-[#1a5589]/20 transition-colors">
                    <Icon className="text-[#1a5589]" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                    {details.map((d, i) => (
                      href && i === 0 ? (
                        <a 
                          key={i}
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-gray-600 hover:text-[#1a5589] transition-colors block"
                        >
                          {d}
                        </a>
                      ) : (
                        <p key={i} className="text-gray-600">{d}</p>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Contact Form */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Send a Message
            </h2>

            {status === "submitted" ? (
              <motion.div 
                className="bg-green-50 border border-green-200 p-8 rounded-xl text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="text-green-600 mx-auto mb-4" size={56} />
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-green-700 text-base">
                  Thank you for contacting Jessfidel. Well get back to you within 24 hours.
                </p>
              </motion.div>
            ) : status === "error" ? (
              <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center">
                <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  Something went wrong
                </h3>
                <p className="text-red-600 text-sm">
                  Please try again or contact us directly at info@jessfidel.com
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5589] focus:border-[#1a5589] transition-all outline-none"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5589] focus:border-[#1a5589] transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5589] focus:border-[#1a5589] transition-all outline-none"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5589] focus:border-[#1a5589] transition-all outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option>General Inquiry</option>
                      <option>Vessel Inspection</option>
                      <option>Crew Training</option>
                      <option>Safety Compliance</option>
                      <option>Navigation Consultancy</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us about your needs..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5589] focus:border-[#1a5589] transition-all outline-none resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                  className="w-full bg-[#1a5589] text-white py-4 rounded-lg flex items-center justify-center font-semibold text-base shadow-lg hover:bg-[#174982] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" /> 
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

    {/* Map/Location Section */}
<section className="py-16 lg:py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Map */}
      <div className="w-full h-[380px] md:h-[460px] relative">
        <iframe
          title="Jessfidel Office Location"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9361046062556!2d6.998400915327573!3d4.824167940030851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cde78dd377c1%3A0xea4a123456789abc!2sPort%20Harcourt%2C%20Rivers%20State%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700000000000"
        ></iframe>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      </div>
    </motion.div>
  </div>
</section>

    </div>
  );
}