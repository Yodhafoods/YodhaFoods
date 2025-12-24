"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import CartDrawer from "./CartDrawer";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { fetchCartItems } from "@/lib/store/features/cart/cartSlice";
import SearchModal from "./SearchModal";
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
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  // Search typing animation
  const searchPlaceholder = useTypewriter(searchPhrases);



  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      {/* HEADER */}
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* LOGO */}
          <div className="text-3xl font-black text-orange-600 tracking-tight">
            <Link href="/">
              <Image
                src="/logo-nobg.png"
                alt="Logo"
                width={100}
                height={100}
                className="rounded-full w-14 h-14 md:w-[100px] md:h-[100px]"
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
