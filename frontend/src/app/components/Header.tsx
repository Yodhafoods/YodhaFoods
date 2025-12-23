"use client";

import { useState, useEffect } from "react";
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

interface StoryItem {
  label: string;
  img: string;
  target: string;
  highlight?: boolean;
}

const stories: StoryItem[] = [
  { label: "Home", img: "/assets/images/Story/home.png", target: "/" },
  { label: "Shop", img: "/assets/images/Story/shop.png", target: "/shop" },
  {
    label: "Instant",
    img: "/assets/images/Story/instant.jpg",
    target: "/instant",
    highlight: true,
  },
  {
    label: "Kitchen",
    img: "/assets/images/Story/kitchen.png",
    target: "/kitchen",
  },
  {
    label: "Journey",
    img: "/assets/images/Story/journey.png",
    target: "/about-us",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  // Search typing animation
  const [searchPlaceholder, setSearchPlaceholder] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const searchPhrases = [
    "Search for fruit powders...",
    "Search for flower powders...",
    "Search for healthy mixes...",
    "Search for instant powders..."
  ];

  useEffect(() => {
    const currentPhrase = searchPhrases[phraseIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && typingIndex === currentPhrase.length) {
      // Finished typing, wait then delete
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }

    if (isDeleting && typingIndex === 0) {
      // Finished deleting, move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % searchPhrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setSearchPlaceholder(currentPhrase.substring(0, typingIndex + (isDeleting ? -1 : 1)));
      setTypingIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [typingIndex, isDeleting, phraseIndex]);

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
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/5 py-4">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="text-3xl font-black text-orange-600 tracking-tight">
            <Link href="/">Yodha.</Link>
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
            {stories.map((item, i) => {
              const isActive = item.target === "/" ? pathname === "/" : pathname.startsWith(item.target);
              return (
                <Link href={item.target} key={i}>
                  <div
                    className="flex flex-col items-center gap-1 cursor-pointer opacity-90 hover:opacity-100 hover:-translate-y-1 transition relative"
                  >
                    <div
                      className={`w-[65px] h-[65px] rounded-full p-[3px] items-center justify-center flex
                  ${isActive
                          ? "bg-green-500"
                          : item.highlight
                            ? "bg-gradient-to-br from-orange-500 to-orange-300"
                            : "bg-gradient-to-br from-pink-400 via-red-400 to-purple-600"
                        }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={item.img}
                          fill
                          alt={item.label}
                          className="rounded-full border-2 border-white object-cover"
                        />
                        {isActive && (
                          <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full z-10" />
                        )}
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${isActive ? "text-green-600" : ""}`}>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* RIGHT — DESKTOP */}
          <div className="hidden md:flex gap-4 items-center">
            <button
              className="border border-gray-800 text-xs font-medium text-gray-800 flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-100 p-2 pl-4 rounded-full transition-all duration-100 min-w-[200px]"
              onClick={() => setOpenSearch(true)}
            >
              <span className="">{searchPlaceholder}</span>
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

        {/* MOBILE STORY SCROLLER */}
        <div className="md:hidden mt-3 px-4 pb-2 overflow-x-auto flex gap-4 no-scrollbar">
          {stories.map((item, i) => {
            const isActive = item.target === "/" ? pathname === "/" : pathname.startsWith(item.target);
            return (
              <Link href={item.target} key={i}>
                <div
                  className="flex-shrink-0 flex flex-col items-center cursor-pointer relative"
                >
                  <div
                    className={`w-[60px] h-[60px] rounded-full p-[3px] items-center justify-center flex
                ${isActive
                        ? "bg-green-500"
                        : item.highlight
                          ? "bg-gradient-to-br from-orange-500 to-orange-300"
                          : "bg-gradient-to-br from-pink-400 via-red-400 to-purple-600"
                      }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.img}
                        fill
                        alt={item.label}
                        className="rounded-full border-2 border-white object-cover"
                      />
                      {isActive && (
                        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full z-10" />
                      )}
                    </div>
                  </div>
                  <span className={`text-xs font-semibold mt-1 ${isActive ? "text-green-600" : ""}`}>{item.label}</span>
                </div>
              </Link>
            );
          })}
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
