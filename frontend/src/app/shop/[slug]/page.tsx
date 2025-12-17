import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";

// Force dynamic rendering since we are fetching from an API
export const dynamic = "force-dynamic";

async function getProduct(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    return <ProductClient product={product} />;
}
