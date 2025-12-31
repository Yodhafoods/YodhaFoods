import { Product } from "@/types";

export interface Concern {
    id: string;
    name: string;
    icon: string; // Using a string to identify the icon, we 'll map this to Lucide icons or Images
    color: string;
}

export const concerns: Concern[] = [
    { id: "weight-loss", name: "Weight Loss", icon: "Scale", color: "bg-emerald-100" },
    { id: "diabetes", name: "Diabetes Care", icon: "Activity", color: "bg-blue-100" },
    { id: "gut-health", name: "Gut & Digestive Health", icon: "Apple", color: "bg-amber-100" },
    { id: "immunity", name: "Immunity", icon: "ShieldCheck", color: "bg-orange-100" },
];

export const mockProducts: Product[] = [
    {
        _id: "1",
        name: "Sprouted Ragi Powder",
        slug: "sprouted-ragi",
        isActive: true,
        isFeatured: true,
        categoryId: { _id: "1", name: "Weight Loss", slug: "weight-loss" } as any, // Mocking category
        images: [{ url: "/assets/images/products/ragi.jpg", public_id: "1" }],
        description: "Great for weight loss and diabetes management.",
        tags: ["weight-loss", "diabetes"],
        packs: [
            { label: "Standard", weightInGrams: 500, price: 450, stock: 50, isDefault: true }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: "2",
        name: "Moringa Powder",
        slug: "moringa-powder",
        isActive: true,
        isFeatured: true,
        categoryId: { _id: "2", name: "Immunity", slug: "immunity" } as any,
        images: [{ url: "/assets/images/products/moringa.jpg", public_id: "2" }],
        description: "Boosts immunity and improves gut health.",
        tags: ["immunity", "gut-health"],
        packs: [
            { label: "Standard", weightInGrams: 200, price: 350, stock: 100, isDefault: true }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: "3",
        name: "Flaxseed Powder",
        slug: "flaxseed",
        isActive: true,
        isFeatured: false,
        categoryId: { _id: "3", name: "Heart Health", slug: "heart-health" } as any,
        images: [{ url: "/assets/images/products/flax.jpg", public_id: "3" }],
        description: "Excellent for heart health.",
        tags: ["heart-health"],
        packs: [
            { label: "Standard", weightInGrams: 200, price: 250, stock: 30, isDefault: true }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: "4",
        name: "Triphala Churna",
        slug: "triphala",
        isActive: true,
        isFeatured: false,
        categoryId: { _id: "4", name: "Gut Health", slug: "gut-health" } as any,
        images: [{ url: "/assets/images/products/triphala.jpg", public_id: "4" }],
        description: "The best for digestion.",
        tags: ["gut-health"],
        packs: [
            { label: "Standard", weightInGrams: 100, price: 180, stock: 100, isDefault: true }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: "5",
        name: "Chia Seeds",
        slug: "chia",
        isActive: true,
        isFeatured: false,
        categoryId: { _id: "5", name: "Superfoods", slug: "superfoods" } as any,
        images: [{ url: "/assets/images/products/chia.jpg", public_id: "5" }],
        description: "Heart healthy and weight loss friendly.",
        tags: ["heart-health", "weight-loss"],
        packs: [
            { label: "Standard", weightInGrams: 200, price: 400, stock: 200, isDefault: true }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: "6",
        name: "Turmeric Latte Mix",
        slug: "turmeric-latte",
        isActive: true,
        isFeatured: true,
        categoryId: { _id: "6", name: "Beverages", slug: "beverages" } as any,
        images: [{ url: "/assets/images/products/turmeric.jpg", public_id: "6" }],
        description: "Immunity booster.",
        tags: ["immunity"],
        packs: [
            { label: "Standard", weightInGrams: 150, price: 300, stock: 50, isDefault: true }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: "7",
        name: "Fenugreek Powder",
        slug: "fenugreek",
        isActive: true,
        isFeatured: false,
        categoryId: { _id: "7", name: "Spices", slug: "spices" } as any,
        images: [{ url: "/assets/images/products/fenugreek.jpg", public_id: "7" }],
        description: "Helps control blood sugar.",
        tags: ["diabetes"],
        packs: [
            { label: "Standard", weightInGrams: 100, price: 200, stock: 80, isDefault: true }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
