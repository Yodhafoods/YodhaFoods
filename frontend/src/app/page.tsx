import Hero from "./components/sections/Hero";

export default function Home() {
  return (
    <div className="">
      <main className="w-full">
        <div className="">
          <Hero />
        </div>

        {/* Example sections — add your content later */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Yodha Foods</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover nutritious and natural superfood powders crafted from the
            best ingredients. Good health starts with good choices.
          </p>
        </section>
      </main>
    </div>
  );
}
