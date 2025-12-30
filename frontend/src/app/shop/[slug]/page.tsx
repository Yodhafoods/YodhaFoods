import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

// Force dynamic rendering since we are fetching from an API
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";

async function getProduct(slug: string) {
    try {
        const cookieStore = await cookies();
        const data = await api.get<any>(`/api/products/${slug}`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });
        return data;
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
