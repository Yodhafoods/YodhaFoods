"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SearchDialog from "./SearchDialog";
import CartDrawer, { CartItem } from "./CartDrawer";
import MobileMenuDrawer from "./MobileMenuDrawer";

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  // Mock cart data
  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "Turmeric Powder",
      price: 120,
      qty: 1,
      image: "/assets/images/sample-product.jpg",
    },
    {
      id: "2",
      name: "Cumin Seeds",
      price: 80,
      qty: 2,
      image: "/assets/images/sample-product.jpg",
    },
  ];

  const cartCount = cartItems.length;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "Combos", href: "/combos" },
    { name: "About Us", href: "/about-us" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="w-full shadow-sm bg-white sticky top-0 z-50 text-black">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={40}
              height={40}
            />
            <span className="font-bold text-xl text-gray-800">Yodha Foods</span>
          </Link>

          {/* RIGHT (SMALL SCREENS): Menu + Search + Cart */}
          <div className="flex md:hidden items-center gap-5">
            {/* Search */}
            <button
              onClick={() => setOpenSearch(true)}
              className="text-gray-700 hover:text-green-600"
            >
              <Search size={24} />
            </button>

            {/* Cart */}
            <button
              onClick={() => setOpenCart(true)}
              className="relative hover:text-green-600"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setOpenMenu(true)}
              className="text-gray-700 hover:text-green-600"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10 flex-1">
            {/* Center Nav */}
            <nav className="flex gap-8 mx-auto text-md font-medium">
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
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setOpenSearch(true)}
                className="hover:text-green-600 cursor-pointer"
              >
                <Search size={22} />
              </button>

              <button
                onClick={() => setOpenCart(true)}
                className="relative hover:text-green-600 cursor-pointer"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link href="/profile" className="hover:text-green-600">
                <User size={22} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <MobileMenuDrawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        navItems={navItems}
      />

      {/* Search Dialog */}
      <SearchDialog open={openSearch} onClose={() => setOpenSearch(false)} />

      {/* Cart Drawer */}
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
        items={cartItems}
      />
    </>
  );
}
