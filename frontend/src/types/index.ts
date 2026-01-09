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
    subCategories?: {
        name: string;
        slug: string;
        description?: string;
        isActive: boolean;
    }[];
    createdAt: string;
    updatedAt: string;
}

export interface Pack {
    label: string;
    weightInGrams: number;
    price: number;
    discountPrice?: number;
    stock: number;
    isDefault: boolean;
}

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    categoryId: Category;
    images: { url: string; public_id: string }[];
    packs: Pack[];
    // Deprecated flat fields
    // price: number;
    // discountPrice?: number;
    // stock: number;
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
    ingredients?: string;
    shelfLifeMonths?: number;
    storageInstructions?: string;
    howToUse?: string;
    highlights?: string[];
    nutritionTable?: { name: string; value: string; _id?: string }[];
}
