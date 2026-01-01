import { Leaf, Sprout, HeartHandshake } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Yodha Foods",
  description: "Learn about Yodha Foods - our mission to bring back ancient nutritional wisdom through pure, natural superfood powders. Discover our core values and commitment to wellness.",
  keywords: ["about Yodha Foods", "superfood mission", "natural ingredients", "nutritional wisdom", "wellness journey"],
};

export default function page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-100 to-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-green-600">Yodha Foods</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Rooted in ancient wisdom, crafted for modern well-being.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8 text-gray-700 leading-relaxed">
          <p>
            At <span className="font-semibold text-green-700">Yodha Foods</span>
            , we believe in harnessing the power of nature&apos;s ancient wisdom
            for modern well-being. Our journey began with a simple idea: to
            bring back the nutritional richness of traditional foods in a
            convenient, accessible form.
          </p>

          <p>
            We meticulously select the finest natural ingredients,
            <span className="font-medium">
              {" "}
              dehydrate them with precision
            </span>{" "}
            to preserve their vital nutrients, and transform them into versatile
            powders. Our processes ensure that every product retains its
            inherent goodness, offering you a pure and potent source of health.
          </p>

          <p>
            Rooted in tradition and committed to quality, Yodha Foods is
            dedicated to empowering you with real nutrition for a vibrant life.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Value 1 */}
            <div className="bg-white rounded-2xl shadow p-8 text-center hover:shadow-lg transition">
              <Leaf className="mx-auto h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pure Ingredients</h3>
              <p className="text-sm text-gray-600">
                Only the finest natural produce — selected with care.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-2xl shadow p-8 text-center hover:shadow-lg transition">
              <Sprout className="mx-auto h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Nutrient Preservation
              </h3>
              <p className="text-sm text-gray-600">
                Dehydration techniques that retain essential nutrients.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-2xl shadow p-8 text-center hover:shadow-lg transition">
              <HeartHandshake className="mx-auto h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Commitment to Wellness
              </h3>
              <p className="text-sm text-gray-600">
                Products crafted to support a healthy, vibrant lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
