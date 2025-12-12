import Link from "next/link";
import ProductCard, { Product } from "./ProductCard";

export type { Product };

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export default function ProductGrid({
  title,
  subtitle,
  products,
}: ProductGridProps) {
  return (
    <section id="shop" className="mt-20">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-gray-300 pb-4 mb-10">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>

        {/* View All Button */}
        <Link
          href="/products"
          className="px-6 py-3 bg-black text-white font-bold rounded-full
                     transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                     hover:bg-orange-500 hover:-translate-y-1 whitespace-nowrap"
        >
          View All Candies
        </Link>
      </div>

      {/* GRID (Desktop) + HORIZONTAL SCROLL (Mobile) */}
      <div
        className="
          lg:grid lg:grid-cols-4 lg:gap-8
          flex gap-5 overflow-x-auto lg:overflow-visible
          snap-x snap-mandatory pb-2 scrollbar-hide
        "
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
