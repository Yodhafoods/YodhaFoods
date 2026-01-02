import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function RitualBanner() {
    return (
        <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl my-12">
            {/* Background Image */}
            <Image
                src="/assets/ritual-banner-bg.png"
                alt="Morning kitchen scene with green nutritious drink and Yodha jar"
                fill
                className="object-cover"
                priority
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 md:bg-black/20" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
                <div className="max-w-2xl text-white space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-md">
                        Your Daily Health Ritual, Simplified
                    </h2>

                    <p className="text-lg md:text-xl font-medium text-gray-100 drop-shadow-sm max-w-xl">
                        Start your mornings with clean, natural powders—crafted to fit into your everyday routine.
                    </p>

                    <Link
                        href="/kitchen"
                        className="inline-flex items-center gap-2 bg-white text-green-800 px-6 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Start Your Ritual <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
