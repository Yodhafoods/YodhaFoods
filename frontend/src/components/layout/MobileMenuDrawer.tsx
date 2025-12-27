"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function MobileMenuDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    router.push("/");
  };

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

        <div className="flex flex-col gap-2">
          {!user ? (
            <Link
              href="/auth/signin"
              className="text-lg font-semibold py-3 border-b border-gray-100"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
          ) : (
            <>
              {/* Profile Link (All Users) */}
              <Link
                href="/profile"
                className="text-lg font-semibold py-3 border-b border-gray-100"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>

              {/* Admin Dashboard (Admin Only) */}
              {user.role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="text-lg font-semibold py-3 border-b border-gray-100 text-orange-600"
                  onClick={() => setOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-lg font-semibold py-3 border-b border-gray-100 text-left text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
