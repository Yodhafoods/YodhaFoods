"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <Link href="/products">
      <section className="relative w-full h-screen overflow-hidden cursor-pointer">
        <Image
          src="/assets/images/Hero/1st.png"
          alt="Hero Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </section>
    </Link>
  );
}
