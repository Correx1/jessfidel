"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import {
  Phone,
  Mail,
  MapPin,
  Twitter,
  Linkedin,
  Facebook,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const activePath = typeof window !== "undefined" ? window.location.pathname : "";

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/About" },
  ];

  const services = [
    { name: "Marine Survey", href: "/Services/marine-survey" },
    { name: "Training Programs", href: "/Services/trainings" },
    { name: "Crew Management", href: "/Services/crew-management" },
  ];

  return (
    <header className="w-full sticky top-0 left-0 right-0 z-50 font-['Roboto',sans-serif]">
      
      {/* Top Bar */}
      <div className="bg-blue-950 text-white text-xs sm:text-sm">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          
          {/* Desktop Contact */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+2348012345678" className="flex items-center gap-2 hover:text-blue-300 transition">
              <Phone className="w-3.5 h-3.5" />
              <span>+234 801 234 5678</span>
            </a>
            <a href="mailto:info@jessfidel.com" className="flex items-center gap-2 hover:text-blue-300 transition">
              <Mail className="w-3.5 h-3.5" />
              <span>info@jessfidel.com</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Port Harcourt, Rivers State, Nigeria</span>
            </div>
          </div>

          {/* Mobile Contact */}
          <a href="tel:+2348012345678" className="flex items-center gap-2 lg:hidden hover:text-blue-300 transition">
            <Phone className="w-3.5 h-3.5" />
            <span className="font-medium">+234 801 234 5678</span>
          </a>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <Link href="https://twitter.com/jessfidel" className="hover:text-blue-300 transition" target="_blank">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="https://linkedin.com/company/jessfidel" className="hover:text-blue-300 transition" target="_blank">
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link href="https://facebook.com/jessfidel" className="hover:text-blue-300 transition" target="_blank">
              <Facebook className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={cn(
        "bg-white transition-all duration-300",
        scrolled ? "shadow-lg" : "shadow-sm"
      )}>
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            <div className="relative w-[160px] sm:w-[180px] lg:w-[200px] h-[40px] sm:h-[45px]">
              <Image
                src="/images/jessfidel.png"
                alt="Jessfidel Marine Consultancy"
                fill
                className="object-contain"
                priority
                sizes="200px"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-1">

                {mainLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        "px-4 py-2 text-base font-semibold text-blue-950 hover:text-blue-900 transition rounded-lg",
                        activePath === link.href && "bg-blue-950/10"
                      )}
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Services */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-4 py-2 text-base font-semibold text-blue-950 hover:text-blue-900 transition rounded-lg data-[state=open]:bg-blue-950/10">
                    Services
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="p-4 bg-white shadow-xl rounded-xl border border-gray-100">
                    <ul className="grid gap-2 w-[240px]">
                      {services.map((service) => (
                        <li key={service.name}>
                          <Link
                            href={service.href}
                            className="block p-3 text-blue-950 font-medium rounded-lg hover:bg-blue-950/10 transition"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Our Works */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "px-4 py-2 text-base font-semibold text-blue-950 hover:text-blue-900 transition rounded-lg",
                      activePath === "/Our-works" && "bg-blue-950/10"
                    )}
                  >
                    <Link href="/Our-works">Our Works</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Contact Button */}
            <Link
              href="/Contact"
              className="ml-4 px-6 py-2.5 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-900 transition shadow-md hover:shadow-lg hover:scale-105"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-blue-950 z-50 p-2"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden fixed inset-0 top-[116px] bg-white transition-all duration-300 overflow-y-auto",
            mobileOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
          )}
        >
          <div className="container mx-auto px-6 py-6">
            <ul className="flex flex-col gap-1">

              {mainLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "block py-4 text-lg font-bold text-blue-950 hover:text-blue-900 transition border-b border-gray-100",
                      activePath === link.href && "text-blue-900"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* Services Mobile */}
              <li className="border-b border-gray-100">
                <button
                  onClick={() => toggleDropdown("Services")}
                  className="flex w-full items-center justify-between py-4 text-lg font-bold text-blue-950"
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 transition-transform",
                      openDropdown === "Services" && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all",
                    openDropdown === "Services" ? "max-h-96 mb-4" : "max-h-0"
                  )}
                >
                  <ul className="ml-4 space-y-2">
                    {services.map((service) => (
                      <li key={service.name}>
                        <Link
                          href={service.href}
                          onClick={closeMenu}
                          className="block py-2 text-base font-medium text-blue-950 hover:text-blue-900 transition"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Our Works */}
              <li>
                <Link
                  href="/our-works"
                  onClick={closeMenu}
                  className={cn(
                    "block py-4 text-lg font-bold text-blue-950 hover:text-blue-900 transition border-b border-gray-100",
                    activePath === "/our-works" && "text-blue-900"
                  )}
                >
                  Our Works
                </Link>
              </li>

              {/* Contact Button Mobile */}
              <li className="pt-6">
                <Link
                  href="/Contact"
                  onClick={closeMenu}
                  className="block w-full text-center py-4 bg-blue-950 text-white font-bold rounded-lg hover:bg-blue-900 transition shadow-lg"
                >
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
