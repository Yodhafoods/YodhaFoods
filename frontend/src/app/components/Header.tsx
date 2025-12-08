"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import SearchDialog from "./SearchDialog";

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const cartCount = 3; // replace with real cart state

  const navItems = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "Combos", href: "/combos" },
    { name: "About Us", href: "/about-us" },
  ];

  return (
    <>
      <header className="w-full shadow-sm bg-white sticky top-0 z-50 text-black">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={40}
              height={40}
            />
            <span className="font-bold text-xl text-gray-800">Yodha Foods</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden text-gray-700"
          >
            {openMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Menu */}
          <div
            className={`absolute md:static left-0 top-16 w-full md:w-auto bg-white shadow-md md:shadow-none transition-all duration-300
            ${
              openMenu
                ? "max-h-screen"
                : "max-h-0 md:max-h-none overflow-hidden"
            }`}
          >
            <nav className="flex flex-col md:flex-row items-center gap-6 px-6 py-4 md:py-0 md:px-0">
              {/* Links */}
              <div className="flex flex-col md:flex-row gap-6 text-lg md:text-base font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`hover:text-green-600 ${
                      pathname === item.href
                        ? "text-green-600 font-semibold"
                        : "text-black"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Search Icon */}
              <button
                onClick={() => setOpenSearch(true)}
                className="text-gray-700 hover:text-green-600"
              >
                <Search size={22} />
              </button>

              {/* Right Icons */}
              <div className="flex items-center gap-6">
                <Link href="/cart" className="relative hover:text-green-600">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1.5 py-0.5">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link href="/profile" className="hover:text-green-600">
                  <User size={22} />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Search Dialog */}
      <SearchDialog open={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
}
