import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number | string;
  name: string;
  price: number;
  img: string;
  badge?: string;
}

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
    <section className="mt-20">
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
          <div
            key={p.id}
            className="
              bg-white rounded-2xl p-4 shadow-sm cursor-pointer overflow-hidden
              transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
              relative group min-w-[75%] sm:min-w-[45%] lg:min-w-0 snap-start
            "
          >
            {/* Badge */}
            {p.badge && (
              <span className="absolute top-4 left-4 bg-white text-green-700 px-3 py-1 rounded-full text-xs font-bold shadow">
                {p.badge}
              </span>
            )}

            {/* Image Box */}
            <div className="h-72 rounded-xl overflow-hidden bg-gray-100 relative">
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Info */}
              <div
                className="absolute bottom-0 left-0 w-full p-4 
                           translate-y-full group-hover:translate-y-0 
                           transition-all duration-300 bg-white/95 text-center"
              >
                <p className="font-bold text-lg">{p.name}</p>
                <p className="text-orange-600 font-semibold">₹{p.price}</p>
              </div>
            </div>

            {/* Title + Price */}
            <div className="mt-3">
              <p className="font-extrabold text-lg">{p.name}</p>
              <p className="font-semibold text-orange-600">₹{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
