import JourneySection from "./(home)/_components/Journey";

export const dynamic = 'force-dynamic';
import YodhaInstant from "./(home)/_components/YodhaInstant";
import CategoriesSection from "./(home)/_components/CategoriesSection";
import WatchAndShop from "./(home)/_components/WatchAndShop";
import BestsellingProducts from "@/features/products/components/BestsellingProducts";
import HeroCarousel from "./(home)/_components/HeroCarousel";


export default function Home() {
  return (
    <div className="">
      <main className="max-w-[1440px] mx-auto px-6">
        <div className="">
          <HeroCarousel />
        </div>

        {/* Categories Section */}
        <CategoriesSection />

        {/* Bestselling Products */}
        <BestsellingProducts />

        {/* Watch and Shop Section */}
        <WatchAndShop />



        {/* Example sections — add your content later */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Yodha Foods</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover nutritious and natural superfood powders crafted from the
            best ingredients. Good health starts with good choices.
          </p>
        </section>
        <section>
          <YodhaInstant />
        </section>
        <section>
          <JourneySection />
        </section>
      </main>
    </div>
  );
}
