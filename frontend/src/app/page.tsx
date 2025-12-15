import Hero from "./components/sections/Hero";
import JourneySection from "./components/sections/Journey";
import YodhaInstant from "./components/sections/YodhaInstant";
import Candy from "./components/sections/Candy";

export default function Home() {
  return (
    <div className="">
      <main className="max-w-[1440px] mx-auto px-6">
        <div className="">
          <Hero />
        </div>

        {/* Nature’s Candy */}
        <div id="shop" className="">
          <Candy />
        </div>

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
