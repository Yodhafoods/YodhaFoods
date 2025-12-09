import ProductGrid, { Product } from "./components/ProductGrid";
import Hero from "./components/sections/Hero";

const fruit: Product[] = [
  {
    id: 5,
    name: "Mango Powder",
    price: 249,
    img: "/assets/images/fruits/Mango-Powder.jpg",
  },
  {
    id: 6,
    name: "Strawberry",
    price: 299,
    img: "/assets/images/fruits/strawberry.jpg",
  },
  {
    id: 7,
    name: "Pineapple",
    price: 269,
    img: "/assets/images/fruits/pineapple.jpg",
  },
  {
    id: 8,
    name: "Pomegranate",
    price: 299,
    img: "/assets/images/fruits/pomegranate.jpg",
  },
];

export default function Home() {
  return (
    <div className="">
      <main className="max-w-[1440px] mx-auto px-6">
        <div className="">
          <Hero />
        </div>

        {/* Nature’s Candy */}
        <ProductGrid
          title="Nature's Candy"
          subtitle="100% Fruit Powders for guilt-free sweetness."
          products={fruit}
        />

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
