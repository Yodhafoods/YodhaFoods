"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { Menu } from "lucide-react";
import Image from "next/image";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import CartDrawer, { CartItem } from "./CartDrawer";
import MobileMenuDrawer from "./MobileMenuDrawer";

interface StoryItem {
  label: string;
  img: string;
  target: string;
  highlight?: boolean;
}

const stories: StoryItem[] = [
  { label: "Home", img: "/assets/images/Story/home.png", target: "home" },
  { label: "Shop", img: "/assets/images/Story/shop.png", target: "shop" },
  {
    label: "Instant",
    img: "/assets/images/Story/instant.jpg",
    target: "instant",
    highlight: true,
  },
  {
    label: "Kitchen",
    img: "/assets/images/Story/kitchen.png",
    target: "kitchen",
  },
  {
    label: "Journey",
    img: "/assets/images/Story/journey.png",
    target: "journey",
  },
];

export default function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  // TEMP CART DATA — Replace later with global cart store
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Example item (remove later)
    // {
    //   id: "1",
    //   name: "Tomato Powder",
    //   qty: 2,
    //   price: 199,
    //   image: "/assets/images/products/tomato.jpg",
    // },
  ]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const cartCount = cartItems.length;

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/5 py-4">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="text-3xl font-black text-orange-600 tracking-tight">
            Yodha.
          </div>

          {/* STORY BAR — DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            {/* WhatsApp Story */}
            <motion.div
              whileHover={{ rotate: [0, 2, -2, 0] }}
              className="flex flex-col items-center gap-1 cursor-pointer mr-2"
              onClick={() => window.open("https://wa.me/9705883899", "_blank")}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(37,211,102,0.7)",
                    "0 0 0 15px rgba(37,211,102,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-[70px] h-[70px] rounded-full border-4 border-[#25D366] bg-white flex items-center justify-center"
              >
                <FaWhatsapp size={34} className="text-[#25D366]" />
              </motion.div>
              <span className="text-[11px] font-extrabold text-[#25D366] text-center leading-tight">
                Order via <br /> WhatsApp
              </span>
            </motion.div>

            {/* Other Stories */}
            {stories.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 cursor-pointer opacity-90 hover:opacity-100 hover:-translate-y-1 transition"
                onClick={() => scrollTo(item.target)}
              >
                <div
                  className={`w-[65px] h-[65px] rounded-full p-[3px]
                  ${
                    item.highlight
                      ? "bg-gradient-to-br from-orange-500 to-orange-300"
                      : "bg-gradient-to-br from-pink-400 via-red-400 to-purple-600"
                  }`}
                >
                  <Image
                    src={item.img}
                    width={65}
                    height={65}
                    alt={item.label}
                    className="rounded-full border-2 border-white object-cover"
                  />
                </div>
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
            ))}
          </div>

          {/* RIGHT — DESKTOP */}
          <div className="hidden md:flex gap-4 items-center">
            <button
              className="flex items-center gap-1 cursor-pointer hover:-translate-y-1 transition-all duration-100"
              onClick={() => setOpenCart(true)}
            >
              <TiShoppingCart size={30} /> <span>{cartCount}</span>
            </button>

            <Link
              href="/auth/signin"
              className="cursor-pointer hover:-translate-y-1 transition-all duration-100"
            >
              <FaUser size={22} />
            </Link>
          </div>

          {/* MOBILE RIGHT: CART + MENU */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setOpenCart(true)}>
              <TiShoppingCart size={30} />
            </button>

            <button onClick={() => setOpenDrawer(true)}>
              <Menu size={30} />
            </button>
          </div>
        </div>

        {/* MOBILE STORY SCROLLER */}
        <div className="md:hidden mt-3 px-4 pb-2 overflow-x-auto flex gap-4 no-scrollbar">
          {stories.map((item, i) => (
            <div
              key={i}
              onClick={() => scrollTo(item.target)}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-[60px] h-[60px] rounded-full p-[3px]
                ${
                  item.highlight
                    ? "bg-gradient-to-br from-orange-500 to-orange-300"
                    : "bg-gradient-to-br from-pink-400 via-red-400 to-purple-600"
                }`}
              >
                <Image
                  src={item.img}
                  width={60}
                  height={60}
                  alt={item.label}
                  className="rounded-full border-2 border-white object-cover"
                />
              </div>
              <span className="text-xs font-semibold mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* DRAWERS */}
      <MobileMenuDrawer open={openDrawer} setOpen={setOpenDrawer} />
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
        items={cartItems}
      />
    </>
  );
}
