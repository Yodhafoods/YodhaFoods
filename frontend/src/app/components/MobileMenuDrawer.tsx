"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

export default function MobileMenuDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  return (
    <>
      {/* Background Overlay */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed right-0 top-0 h-full w-[75%] bg-white shadow-xl z-50 p-6 flex flex-col"
      >
        {/* Close Button */}
        <button onClick={() => setOpen(false)} className="self-end mb-6">
          <X size={28} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Menu</h2>

        <Link
          href="/auth/signin"
          className="text-lg font-semibold py-3 border-b"
          onClick={() => setOpen(false)}
        >
          Sign In
        </Link>

        <div className="mt-6 text-gray-500 text-sm">
          More options coming soon...
        </div>
      </motion.div>
    </>
  );
}
