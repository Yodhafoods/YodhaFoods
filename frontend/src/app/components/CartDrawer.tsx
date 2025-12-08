"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
}

export default function CartDrawer({ open, onClose, items }: CartDrawerProps) {
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

          {/* Side Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-[90%] sm:w-[60%] md:w-[40%] lg:w-[35%] bg-white shadow-xl z-[70] p-5 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button
                onClick={onClose}
                className="bg-green-800 text-white hover:bg-green-900 rounded-sm  cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4">
              <p className="text-green-800">Products</p>
              {items.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 shadow-2xs shadow-green-100 pb-3"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={70}
                      height={70}
                      className="rounded-md object-cover"
                    />

                    <div className="flex flex-col flex-1">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-600">
                        Qty: {item.qty}
                      </span>
                      <span className="text-green-700 font-semibold">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t pt-4 mt-2">
                <button className="w-full bg-green-600 text-white py-3 font-semibold rounded-lg hover:bg-green-700 transition">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
