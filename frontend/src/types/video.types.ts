export interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    variants?: string[];
    images?: {
        url: string;
        publicId: string;
    }[];
    category?: string;
    stock?: number;
    isActive?: boolean;
    slug: string;
}

export interface Video {
    _id: string;
    title: string;
    description: string;
    video: {
        url: string;
        publicId: string;
        duration: number;
    };
    thumbnail: {
        url: string;
        publicId: string;
    };
    productId: Product;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface VideoResponse {
    videos: Video[];
}
