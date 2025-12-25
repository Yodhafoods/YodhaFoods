"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200 pt-16 pb-12 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* LEFT SECTION: Logo, Tagline, Address */}
        <div className="md:col-span-3 flex flex-col gap-6 text-left items-start">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="w-32">
              <Image
                src="/assets/images/logo.png"
                alt="Yodha Foods"
                width={140}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-sm font-bold text-amber-700 tracking-wide">
              Rooted in Legacy | Guided by Tradition
            </p>
          </div>

          <div className="text-sm text-gray-700 font-medium flex flex-col gap-3 mt-2 leading-relaxed">
            <div className="flex items-start gap-3 justify-start">
              <div className="space-y-4">
                <p className="font-bold text-lg text-gray-900">YodhaFoods</p>

                {/* Head Office */}
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-gray-900" />
                    <p className="font-bold text-md text-gray-900">
                      Head Office
                    </p>
                  </div>
                  <p className="ml-6 text-gray-700">
                    Sangadigunta, Guntur, Andhra Pradesh, 522003.
                  </p>
                </div>

                {/* Corporate Office */}
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-gray-900" />
                    <p className="font-bold text-md text-gray-900">
                      Corporate Office
                    </p>
                  </div>
                  <p className="ml-6 text-gray-700">
                    3rd Phase, JP Nagar, Bangalore, Karnataka, 560078.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-start">
              <Mail size={18} className="shrink-0 text-gray-900" />
              <a
                href="mailto:support@yodhafoods.com"
                className="hover:text-orange-700 transition font-bold"
              >
                namaste@yodhafoods.com
              </a>
            </div>
            <div className="flex items-center gap-3 justify-start">
              <Phone size={18} className="shrink-0 text-gray-900" />
              <a
                href="tel:+919705883899"
                className="hover:text-orange-700 transition font-bold"
              >
                +91 9705883899
              </a>
            </div>
          </div>
        </div>

        {/* CENTER SECTION: Newsletter, Socials, Legal */}
        <div className="md:col-span-6 flex flex-col items-center text-center">
          <div className="max-w-md w-full flex flex-col items-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              The Yodha Way of Life
            </h3>
            <p className="text-gray-600 font-semibold text-sm mb-6">
              Join our community for exclusive recipes, offers, and ancient
              wisdom.
            </p>

            <form className="flex items-center bg-white border border-gray-50 rounded-full px-4 py-2 w-full shadow-sm focus-within:ring-2 focus-within:ring-orange-200 focus-within:border-orange-500 transition-all mb-8">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-transparent outline-none flex-1 text-sm text-gray-900 font-medium placeholder-gray-500 w-full"
                required
              />
              <button
                type="submit"
                className="ml-2 bg-orange-600 cursor-pointer text-white p-2 rounded-full hover:bg-orange-700 transition shadow-md"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex gap-6 mb-6">
              <SocialLink
                href="#"
                icon={<FaInstagram size={20} />}
                label="Instagram"
              />
              <SocialLink
                href="#"
                icon={<FaYoutube size={22} />}
                label="YouTube"
              />
              <SocialLink
                href="#"
                icon={<FaLinkedinIn size={18} />}
                label="LinkedIn"
              />
              <SocialLink
                href="#"
                icon={<FaFacebookF size={18} />}
                label="Facebook"
              />
            </div>

            {/* Legal Links */}
            <div className="flex gap-4 text-xs text-gray-500 font-bold flex-wrap justify-center uppercase tracking-wide">
              <Link href="#" className="hover:text-orange-700 transition">
                Terms & Conditions
              </Link>
              <span className="hidden sm:inline text-gray-300">•</span>
              <Link href="#" className="hover:text-orange-700 transition">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Categories & Products */}
        <div className="md:col-span-3 flex flex-col gap-8 md:pl-8 border-l-0 md:border-l border-gray-200 text-left">
          {/* Categories */}
          <div className="flex flex-col items-start">
            <h4 className="font-extrabold text-gray-900 mb-4 uppercase tracking-wider text-xs flex items-center gap-2 w-full justify-start">
              Explore Categories
              <span className="h-0.5 bg-orange-200 flex-1 hidden md:block"></span>
            </h4>
            <div className="flex flex-col gap-3 text-sm font-semibold items-start">
              <FooterLink href="/shop">Shop All</FooterLink>
              <FooterLink href="/kitchen">Yodha Kitchen</FooterLink>
              <FooterLink href="/combos">Make Your Box</FooterLink>
              <FooterLink href="/instant">Yodha Instant</FooterLink>
            </div>
          </div>

          {/* Products (Featured) */}
          <div className="flex flex-col items-start">
            <h4 className="font-extrabold text-gray-900 mb-4 uppercase tracking-wider text-xs flex items-center gap-2 w-full justify-start">
              Popular Products
              <span className="h-0.5 bg-orange-200 flex-1 hidden md:block"></span>
            </h4>
            <div className="flex flex-col gap-3 text-sm font-semibold items-start">
              <FooterLink href="#">Sprouted Ragi Powder</FooterLink>
              <FooterLink href="#">Nuts & Dates Powder</FooterLink>
              <FooterLink href="#">Banana Powder</FooterLink>
              <FooterLink href="#">Almond Drink Mix</FooterLink>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-[1440px] mx-auto px-6 mt-12 pt-6 border-t border-gray-200 text-center text-xs font-semibold text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Yodha Foods . All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label?: string;
}) => (
  <Link
    href={href}
    aria-label={label}
    target="_blank"
    rel="noreferrer"
    className="text-gray-600 hover:text-white cursor-pointer border border-gray-200 p-2 rounded-full hover:bg-orange-600 transition-all transform hover:scale-105"
  >
    {icon}
  </Link>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-gray-700 hover:text-orange-700 hover:translate-x-0 md:hover:translate-x-1 transition-all duration-200 inline-block w-fit"
  >
    {children}
  </Link>
);

export default Footer;
