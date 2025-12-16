export interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string | null;
    isActive: boolean;
    sortOrder: number;
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    categoryId: string | Category; // Depending on population
    images: { url: string; public_id: string }[];
    price: number;
    discountPrice?: number;
    stock: number;
    isActive: boolean;
    isFeatured: boolean;
    tags?: string[];
    attributes?: Record<string, string>;
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
    rating?: {
        average: number;
        count: number;
    };
    createdAt: string;
    updatedAt: string;
}
