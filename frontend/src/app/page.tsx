import type { Metadata } from "next";
import JourneySection from "./(home)/_components/Journey";

export const dynamic = 'force-dynamic';
import YodhaInstant from "./(home)/_components/YodhaInstant";
import CategoriesSection from "./(home)/_components/CategoriesSection";
import RitualBanner from "./(home)/_components/RitualBanner";
import TrendingSearches from "./(home)/_components/TrendingSearches";
import WatchAndShop from "./(home)/_components/WatchAndShop";
import BestsellingProducts from "@/features/products/components/BestsellingProducts";
import HeroCarousel from "./(home)/_components/HeroCarousel";
import QuickActionCards from "./(home)/_components/QuickActionCards";
import YodhaFamSection from "./(home)/_components/YodhaFamSection";
import LandingBanner from "@/components/layout/LandingBanner";


export const metadata: Metadata = {
  title: "Yodha Foods | Shop Natural & Nutritious fruits, vegetables, spices powders",
  description: "Discover premium, natural superfood powders at Yodha Foods. Crafted from the finest ingredients to boost your health and wellness journey. Shop our bestsellers today for a healthier tomorrow.",
  keywords: ["superfoods", "natural powders", "health supplements", "nutritious food", "Yodha Foods", "organic powders", "immunity booster", "healthy lifestyle"],
  openGraph: {
    title: "Yodha Foods | Shop Natural & Nutritious Superfood Powders",
    description: "Discover premium, natural superfood powders at Yodha Foods. Crafted from the finest ingredients to boost your health and wellness journey.",
    type: "website",
    locale: "en_IN",
    siteName: "Yodha Foods",
  },
};

export default function Home() {
  return (
    <div className="">
      <LandingBanner />
      <main className="max-w-[1440px] mx-auto px-6">

        <section>
          <HeroCarousel />
        </section>

        {/* Categories Section */}
        <section>
          <CategoriesSection />
        </section>
        {/* Ritual Banner */}
        <section>
          <RitualBanner />
        </section>

        {/* Bestselling Products */}
        <section>
          <BestsellingProducts />
        </section>

        {/* Trending Searches */}
        <section>
          <TrendingSearches />
        </section>

        <section>
          <QuickActionCards />
        </section>

        {/* Watch and Shop Section */}
        <section>
          <WatchAndShop />
        </section>

        <section>
          <YodhaInstant />
        </section>
        <section>
          <YodhaFamSection />
        </section>
        {/* <section>
          <JourneySection />
        </section> */}
      </main>
    </div>
  );
}
