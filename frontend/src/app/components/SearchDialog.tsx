"use client";

import { Dialog } from "@headlessui/react";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const dummySuggestions = [
  "Beetroot Powder",
  "Ginger Powder",
  "Turmeric Powder",
  "Spinach Powder",
  "Mixed Veggies Powder",
  "Fruit Blend Combo",
];

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  const filtered = dummySuggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center"
    >
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="relative mt-24 bg-white w-full max-w-xl mx-auto rounded-xl shadow-lg p-6">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-sm bg-green-800 text-white hover:bg-green-900 cursor-pointer"
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-3 border rounded-full px-4 py-3">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-gray-600 text-base"
          />
        </div>

        {/* Suggestions */}
        {query.length > 0 && (
          <div className="mt-4 border rounded-lg p-4 bg-gray-50 max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-gray-500 text-sm">No matching products</p>
            ) : (
              filtered.map((item) => (
                <div
                  key={item}
                  className="py-2 px-2 cursor-pointer rounded hover:bg-gray-200 text-gray-700 text-sm"
                >
                  {item}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
}
