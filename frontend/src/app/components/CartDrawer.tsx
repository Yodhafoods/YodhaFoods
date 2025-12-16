"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { updateQuantity } from "@/lib/store/features/cart/cartSlice";
import Link from "next/link";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleUpdateQty = (id: string, newQty: number) => {
    dispatch(updateQuantity({ id, qty: newQty }));
  };

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
                <div className="mt-10 flex flex-col gap-2 justify-center items-center">
                  <p className="text-gray-500 text-center">Your cart is empty.</p>
                  <Link href="/products">
                    <button className="px-4 py-2 bg-green-800 text-white hover:bg-green-900 rounded-sm  cursor-pointer">Continue Shopping </button>
                  </Link>
                </div>
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
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-green-700 font-semibold">
                          ₹{item.price * item.qty}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              handleUpdateQty(item.id, item.qty - 1)
                            }
                          >
                            -
                          </button>
                          <span className="px-2 text-sm font-medium">
                            {item.qty}
                          </span>
                          <button
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              handleUpdateQty(item.id, item.qty + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs text-gray-500">
                          ₹{item.price} / unit
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t pt-4 mt-2 mb-safe">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-xl text-green-700">
                    ₹{totalAmount}
                  </span>
                </div>
                <button className="w-full cursor-pointer bg-green-600 text-white py-3 font-semibold rounded-lg hover:bg-green-700 transition">
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
