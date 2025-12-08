"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/Hero/1.png"
          alt="Yodha Foods Hero Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-xl text-white drop-shadow-md">
          <h1 className="text-3xl text-green-800 md:text-5xl font-bold leading-tight">
            Experience the richness of traditional foods in convenient, everyday
            powders.
          </h1>

          <div className="mt-6 flex gap-4">
            <Link
              href="/products"
              className="bg-green-800 hover:bg-green-900 group text-white px-6 py-3 rounded-lg font-semibold shadow-md transition flex justify-center items-center gap-2"
            >
              Shop All Products{" "}
              <span className="bg-orange-400 rounded-full group-hover:translate-x-1 transition">
                <ChevronRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
