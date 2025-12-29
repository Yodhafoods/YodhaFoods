"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaUsers, FaUtensils, FaUserPlus, FaInstagram, FaYoutube, FaFacebook, FaTimes, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Ensure you have react-icons v5+ for this
import { ShiftingTabs, TabItem } from "./mega-menu/ShiftingTabs";
import { ShopByCategory, ShopByConcern, FarmsAndSourcing } from "./mega-menu/MenuSections";

export default function YodhaMegaMenu() {
    return (
        <div className="flex h-fit w-full justify-center px-2 py-1 text-gray-800">
            <div className="flex items-center gap-6">
                {/* Static Links */}
                <Link
                    href="/kitchen"
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
                >
                    <FaUtensils className="text-lg" />
                    Explore Kitchen
                </Link>
                <Link
                    href="/membership"
                    className="flex items-center gap-2 text-sm font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                    <FaUsers className="text-lg text-orange-500" />
                    Join YodhaFam
                </Link>

                <div className="h-4 w-px bg-gray-300 mx-2"></div>

                {/* Dropdown Tabs */}
                <ShiftingTabs items={TABS} />

                {/* Follow Button Section */}
                <FollowSection />
            </div>
        </div>
    );
}

const FollowSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2.5 rounded-lg px-5 py-1 text-[15px] bg-blue-500 hover:bg-blue-600 cursor-pointer font-medium text-white transition-all duration-300 hover:brightness-110"
            >
                <FaUserPlus /> Follow
            </button>

            <div
                ref={menuRef}
                className={`absolute top-full left-1/2 mt-5 flex -translate-x-1/2 gap-8 rounded-3xl bg-white p-7 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] z-50 ${isOpen
                    ? "visible scale-100 opacity-100 translate-y-0"
                    : "invisible scale-75 opacity-0 translate-y-5"
                    }`}
                style={{ width: "max-content" }}
            >
                <div
                    className="absolute right-3 top-2.5 cursor-pointer text-lg text-gray-300 transition-colors hover:text-black"
                    onClick={() => setIsOpen(false)}
                >
                    <FaTimes />
                </div>

                <Link href="https://www.instagram.com/yodhafoods/" target="_blank" className="group flex flex-col items-center gap-2 decoration-0 transition-transform duration-300 hover:scale-115">
                    {/* Instagram Gradient Text Hack using background clip */}
                    <div className="text-[42px]">
                        <svg width="42" height="42" viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
                            <defs>
                                <radialGradient id="instagramGradient" cx="0.3" cy="1.07" r="1">
                                    <stop offset="0%" stopColor="#fdf497" />
                                    <stop offset="5%" stopColor="#fdf497" />
                                    <stop offset="45%" stopColor="#fd5949" />
                                    <stop offset="60%" stopColor="#d6249f" />
                                    <stop offset="90%" stopColor="#285AEB" />
                                </radialGradient>
                            </defs>
                            <path fill="url(#instagramGradient)" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.5 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                    </div>
                    <span className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#333]">Instagram</span>
                </Link>

                <Link href="https://www.youtube.com/@yodhafoods" target="_blank" className="group flex flex-col items-center gap-2 decoration-0 transition-transform duration-300 hover:scale-115">
                    <FaYoutube className="text-[42px] text-[#FF0000]" />
                    <span className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#333]">YouTube</span>
                </Link>

                <Link href="https://www.facebook.com/yodhafoods" target="_blank" className="group flex flex-col items-center gap-2 decoration-0 transition-transform duration-300 hover:scale-115">
                    <FaFacebook className="text-[42px] text-[#1877F2]" />
                    <span className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#333]">Facebook</span>
                </Link>

                <Link href="https://www.linkedin.com/company/yodhafoods/" target="_blank" className="group flex flex-col items-center gap-2 decoration-0 transition-transform duration-300 hover:scale-115">
                    <FaLinkedin className="text-[42px] text-black" />
                    <span className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#333]">LinkedIn</span>
                </Link>
            </div>
        </div>
    );
};

const TABS: TabItem[] = [
    {
        title: "Shop by Category",
        Component: ShopByCategory,
        id: 1,
    },
    {
        title: "Shop by Concern",
        Component: ShopByConcern,
        id: 2,
    },
    {
        title: "Farms & Sourcing",
        Component: FarmsAndSourcing,
        id: 3,
    },
];

