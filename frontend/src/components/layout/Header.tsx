"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import CartDrawer from "@/features/cart/components/CartDrawer";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { fetchCartItems } from "@/features/cart/store/cartSlice";
import SearchModal from "@/features/search/components/SearchModal";
import RunningBanner from "./RunningBanner";
import { useTypewriter } from "./header/useTypewriter";
import { searchPhrases } from "./header/constants";
import DesktopStories from "./header/DesktopStories";
import MobileStories from "./header/MobileStories";
import TabletSearchBar from "./header/TabletSearchBar";
import YodhaMegaMenu from "./YodhaMegaMenu";



export default function Header() {
  const pathname = usePathname();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  // Search typing animation
  const searchPlaceholder = useTypewriter(searchPhrases);



  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      // Hide banner if scrolled more than 10px to account for bounce
      if (window.scrollY > 0) {
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 transition-all duration-300">
        <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <RunningBanner
                messages={[
                  {
                    text: "🚚 Free Shipping on Orders Above ₹599 | Shop Now",
                    link: "/shop",
                  },
                  {
                    text: "💳 Big Saving Alert! Extra 10% OFF on First Order",
                    link: "/shop",
                  },
                  {
                    text: "🔥 Become a Member of YodhaFam | Get Exclusive Benefits",
                    link: "/membership",
                  },
                ]}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-[1440px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* LOGO */}
          <div className="text-3xl font-black text-orange-600 tracking-tight">
            <Link href="/">
              <Image
                src="/logo-nobg.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-16 h-16 md:w-[100px] md:h-[100px]"
              />
            </Link>
          </div>

          {/* STORY BAR — DESKTOP */}
          <DesktopStories pathname={pathname} />

          {/* RIGHT — DESKTOP */}
          <div className="hidden md:flex gap-4 items-center">
            <button
              className="hidden lg:flex border border-gray-800 text-xs font-medium text-gray-800 items-center justify-between gap-2 cursor-pointer hover:bg-gray-100 p-2 pl-4 rounded-full transition-all duration-100 md:w-[100px] lg:w-[200px]"
              onClick={() => setOpenSearch(true)}
            >
              <span className="flex-1 text-left truncate">{searchPlaceholder}</span>
              <span>
                <Search size={16} />
              </span>
            </button>
            <button
              className="flex items-center gap-1 cursor-pointer hover:-translate-y-1 transition-all duration-100"
              onClick={() => setOpenCart(true)}
            >
              <TiShoppingCart size={30} /> <span>{cartCount}</span>
            </button>

            <Link
              href="/profile"
              className="cursor-pointer hover:-translate-y-1 transition-all duration-100"
            >
              <FaUser size={22} />
            </Link>
          </div>

          {/* MOBILE RIGHT: CART + MENU + Search */}
          <div className="flex md:hidden items-center gap-4">
            <button
              className="text-xs text-gray-900 flex items-center gap-1 cursor-pointer hover:bg-gray-300 p-2 rounded-full transition-all duration-100"
              onClick={() => setOpenSearch(true)}
            >
              <Search size={28} />
            </button>
            <button onClick={() => setOpenCart(true)}>
              <TiShoppingCart size={30} />
            </button>

            <button onClick={() => setOpenDrawer(true)}>
              <Menu size={30} />
            </button>
          </div>
        </div>

        {/* TABLET SEARCH LAYOUT (between md and lg) */}
        <TabletSearchBar
          placeholder={searchPlaceholder}
          onClick={() => setOpenSearch(true)}
        />

        {/* MOBILE STORY SCROLLER */}
        <MobileStories pathname={pathname} />
        <div className="hidden md:flex relative z-40 justify-center border-t border-gray-200 bg-white">
          <YodhaMegaMenu />
        </div>
      </header>


      {/* DRAWERS */}
      <MobileMenuDrawer open={openDrawer} setOpen={setOpenDrawer} />
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
      <SearchModal
        isOpen={openSearch}
        onClose={() => setOpenSearch(false)}
      />


    </>
  );
}
