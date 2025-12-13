"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define Product interface compatible with API response
interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: { url: string }[];
  category?: { name: string };
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch Logic
  useEffect(() => {
    const fetchProducts = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(debouncedQuery)}&limit=6`);
        const data = await res.json();
        // The API returns { products: [], pagination: ... }
        if (data.products) {
          setResults(data.products);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedQuery]);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  const navigateToProduct = (slug: string) => {
    handleClose();
    router.push(`/products/${slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <Search className="text-gray-400 w-6 h-6" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for products (e.g., 'Momos', 'Chutney')..."
                className="flex-1 text-lg outline-none text-gray-800 placeholder:text-gray-400 font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {loading ? (
                <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
              ) : (
                query && (
                  <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                )
              )}
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto p-2 bg-gray-50/50">
              {/* Logic: 
                  - Query empty: Show trending or empty state? (Empty for now)
                  - Loading: (Handled in header icon primarily, but could add skeleton here)
                  - No results: Show message
                  - Results: Show list
              */}
              
              {!debouncedQuery && (
                <div className="text-center py-10 text-gray-400 text-sm">
                  Start typing to see products...
                </div>
              )}

              {debouncedQuery && !loading && results.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No products found for "{debouncedQuery}".
                </div>
              )}

              <div className="space-y-1">
                {results.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigateToProduct(product.slug)}
                    className="flex items-center gap-4 p-3 hover:bg-white hover:shadow-sm rounded-xl cursor-pointer transition-all group border border-transparent hover:border-gray-100"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
                      {product.images?.[0]?.url ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                           <Search size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {product.description || "No description available"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                        {product.category && (
                          <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                            {product.category.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
              <span>Press ESC to close</span>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
