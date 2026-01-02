import Link from "next/link";
import { Search, Soup, Apple, HeartPulse, Sparkles, Sprout } from "lucide-react";

const searches = [
    { label: "Spices", icon: Sprout, href: "/search?q=spices", highlight: false },
    { label: "Instant Soup", icon: Soup, href: "/search?q=soup", highlight: false },
    { label: "Fruit Powders", icon: Apple, href: "/search?q=fruit+powders", highlight: false },
    { label: "Vegetable Powders", icon: Apple, href: "/search?q=vegetable+powders", highlight: false },
    { label: "Herbal Powders", icon: Apple, href: "/search?q=herbal+powders", highlight: false },
    { label: "Shop by Concern", icon: HeartPulse, href: "/shop-by-concern", highlight: true },
];

export default function TrendingSearches() {
    return (
        <section className="py-6 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-8">
                    Trending Searches
                </h2>

                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {searches.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`
                group flex items-center justify-center gap-1.5 md:gap-2 px-3 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300
                ${item.highlight
                                    ? "bg-gradient-to-r from-orange-50 to-green-50 text-gray-900 border-2 border-orange-200 hover:border-orange-400 hover:shadow-md"
                                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400 hover:shadow-sm"
                                }
              `}
                        >
                            <item.icon
                                className={`w-3.5 h-3.5 md:w-4 md:h-4 ${item.highlight ? "text-orange-600" : "text-gray-500 group-hover:text-gray-700"
                                    }`}
                            />
                            <span className="truncate max-w-[150px] md:max-w-none">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
