"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/our-works", label: "Our Works" },
  { href: "/contact", label: "Contact" },
];

const services = [
  { name: "Marine Survey", href: "/services/marine-survey" },
  { name: "Crew Training", href: "/services/trainings" },
  { name: "Vessel Inspection", href: "/services/marine-survey" },
  { name: "Safety Compliance", href: "/services/marine-survey" },
  { name: "Navigation Systems", href: "/services/marine-survey" },
  { name: "Offshore Operations", href: "/services/crew-management" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/jessfidel", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/jessfidel", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/jessfidel", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/jessfidel", label: "LinkedIn" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-blue-950 text-gray-200 overflow-hidden font-['Roboto',sans-serif]">

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

        {/* Brand Section */}
        <div>
          <div className="flex items-center mb-6">
            <Image
              src="/images/jessfidel.png"
              alt="Jessfidel Marine Consultancy"
              width={160}
              height={70}
              className="h-10 w-auto brightness-0 invert"
            />
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed text-sm">
            Practical maritime solutions for Nigerian waters. We help vessel owners 
            and operators stay safe, compliant, and efficient.
          </p>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Stay Updated</h4>

            <form onSubmit={handleNewsletter} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button 
                type="submit"
                className="bg-white/20 hover:bg-white/30 px-3 rounded-r-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </form>

            {subscribed && (
              <p className="text-green-300 text-xs mt-2">Thanks for subscribing!</p>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <FooterSection title="Quick Links">
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-gray-300 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Services */}
        <FooterSection title="Our Services">
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.name}>
                <Link 
                  href={service.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Contact Info */}
        <FooterSection title="Get In Touch">
          <div className="space-y-4">
            <FooterContact icon={<MapPin />} text="Port Harcourt, Rivers State, Nigeria" />
            <FooterContact icon={<Phone />} text="+234 801 234 5678" href="tel:+2348012345678" />
            <FooterContact icon={<Mail />} text="info@jessfidel.com" href="mailto:info@jessfidel.com" />

            {/* Social Icons */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${label}`}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-gray-300 hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </FooterSection>

      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Jessfidel Marine Consultancy. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-white/20">
        {title}
      </h3>
      {children}
    </div>
  );
}

function FooterContact({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const content = (
    <>
      <div className="w-5 h-5 text-gray-300 mt-0.5 mr-3 flex-shrink-0">{icon}</div>
      <p className="text-gray-300 text-sm">{text}</p>
    </>
  );

  if (href) {
    return (
      <a 
        href={href}
        className="flex items-start hover:text-white transition-colors"
      >
        {content}
      </a>
    );
  }

  return <div className="flex items-start">{content}</div>;
}
