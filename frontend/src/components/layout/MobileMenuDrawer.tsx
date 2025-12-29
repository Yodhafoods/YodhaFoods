"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  X,
  Plus,
  Minus,
  User,
  Leaf,
  HeartPulse,
  Wheat,
  Sprout,
  Package,
  Phone,
  Instagram,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";

type SectionKey = "category" | "concern" | "farm" | "connect";

export default function MobileMenuDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState<SectionKey | null>(null);

  /*  Auto close on route change */
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggle = (key: SectionKey) =>
    setActive((prev) => (prev === key ? null : key));

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  /* Swipe gesture */
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 120) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Overlay (tap outside to close) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="fixed right-0 top-0 h-full w-[82%] bg-[#FBFBF8] z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Auth Section */}
        <div className="px-5 py-4 border-b border-gray-200 space-y-3">
          {!user ? (
            <NavButton href="/auth/signin" icon={<User size={18} />}>
              Sign In
            </NavButton>
          ) : (
            <>
              <NavButton href="/profile" icon={<User size={18} />}>
                Profile
              </NavButton>

              {user.role === "admin" && (
                <NavButton
                  href="/admin/dashboard"
                  className="text-orange-600"
                >
                  Admin Dashboard
                </NavButton>
              )}

              <button
                onClick={handleLogout}
                className="text-red-500 font-semibold text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto text-[15px] font-medium">

          <MenuLink
            label="Join Yodhafam"
            href="/membership"
            highlight
          />
          <MenuLink label="Shop All" href="/shop" icon={<Package size={16} />} />

          <Accordion
            title="Shop by Category"
            icon={<Wheat size={16} />}
            open={active === "category"}
            onClick={() => toggle("category")}
          >
            <MenuLink label="Vegetable Powders" href="/category/vegetable-powders" icon={<Leaf size={14} />} />
            <MenuLink label="Fruit Powders" href="/category/fruit-powders" icon={<Leaf size={14} />} />
            <MenuLink label="Spices" href="/category/spices" icon={<Package size={14} />} />
          </Accordion>

          <Accordion
            title="Shop by Concern"
            icon={<HeartPulse size={16} />}
            open={active === "concern"}
            onClick={() => toggle("concern")}
          >
            <MenuLink label="Diabetes Care" href="/shop-by-concern" />
            <MenuLink label="Gut Health" href="/shop-by-concern" />
            <MenuLink label="Weight Loss" href="/shop-by-concern" />
            <MenuLink label="Immunity" href="/shop-by-concern" />
          </Accordion>

          <Accordion
            title="Farm Life"
            icon={<Sprout size={16} />}
            open={active === "farm"}
            onClick={() => toggle("farm")}
          >
            <MenuLink label="Farms & Sourcing" href="/farms-and-sourcing" />
            <MenuLink label="Our Process" href="/farms-and-sourcing" />
          </Accordion>

          <Accordion
            title="Connect"
            icon={<Phone size={16} />}
            open={active === "connect"}
            onClick={() => toggle("connect")}
          >
            <MenuLink label="Track Order" href="/profile" />
            <MenuLink label="Contact Us" href="/contact" />
            <MenuLink label="Refund Policy" href="/refund-policy" />
            <MenuLink label="Shipping Policy" href="/shipping-policy" />
          </Accordion>
        </nav>

        {/* 🔥 Social Footer */}
        <div className="px-5 py-4 border-t border-gray-200 flex items-center gap-5">
          <a
            href="https://instagram.com/yodhafoods"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://youtube.com/@yodhafoods"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <Youtube size={22} />
          </a>
        </div>
      </motion.div>
    </>
  );
}

/* ---------- Components ---------- */

function NavButton({
  href,
  icon,
  className,
  children,
}: any) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 font-semibold ${className ?? ""}`}
    >
      {icon}
      {children}
    </Link>
  );
}

function MenuLink({
  label,
  href,
  icon,
  highlight,
}: any) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-5 py-4 ${highlight ? "text-orange-600 font-semibold" : ""
        }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function Accordion({
  title,
  icon,
  open,
  onClick,
  children,
}: any) {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full px-5 py-4 flex items-center justify-between"
      >
        <span className="flex items-center gap-3">
          {icon}
          {title}
        </span>
        {open ? <Minus size={16} /> : <Plus size={16} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-orange-100"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
