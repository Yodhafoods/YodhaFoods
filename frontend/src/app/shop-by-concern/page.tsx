import ConcernPageClient from "@/features/concerns/components/ConcernPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shop by Concern | Yodha Foods",
    description: "Find natural food products curated for your specific health goals - Weight Loss, Heart Health, Diabetes, and more.",
};

export default function ShopByConcernPage() {
    return <ConcernPageClient />;
}