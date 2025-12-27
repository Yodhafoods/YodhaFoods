import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="w-full flex justify-center">
      <div className="max-w-[1440px] w-full px-2 md:px-12 mt-6">
        <div className="relative h-[550px] md:h-[600px] rounded-[40px] overflow-hidden shadow-xl">
          {/* Background Image */}
          <Image
            src="/assets/images/Hero/hero.jpeg"
            alt="Hero Background"
            fill
            priority
            className="object-cover brightness-[0.60]"
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center px-6 md:px-20 animate-slideUp">
            <div className="max-w-xl text-white">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-black leading-tight drop-shadow-md">
                Zero Chemicals.
                <br />
                100% Legacy.
              </h1>

              {/* CTA: purely CSS animated (no client JS needed) */}
              <Link
                href="/shop"
                className="inline-block mt-8 hero-cta px-8 py-4 rounded-full text-lg font-bold shadow-md"
                aria-label="Explore The Pantry"
              >
                Explore The Pantry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
