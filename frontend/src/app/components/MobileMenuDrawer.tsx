"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: { name: string; href: string }[];
}

export default function MobileMenuDrawer({
  open,
  onClose,
  navItems,
}: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed left-0 top-0 h-full w-[70%] bg-white shadow-xl z-[70] p-5"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-green-100 pb-2">
              <h2 className="text-xl font-semibold text-green-800">
                Yodha Foods
              </h2>
              <button
                onClick={onClose}
                className="bg-green-800 text-white hover:bg-green-900 rounded-sm cursor-pointer"
              >
                <X size={26} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-5 text-lg font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:text-green-600 ${
                    pathname === item.href
                      ? "text-green-600 font-semibold"
                      : "text-black"
                  }`}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Profile */}
            <div className="mt-8">
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center gap-3 hover:text-green-600 text-lg cursor-pointer"
              >
                <User size={22} />
                Profile
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
