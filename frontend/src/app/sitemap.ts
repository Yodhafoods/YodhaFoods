import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.yodhafoods.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yodhafoods-api.onrender.com';

// Define types for API responses
interface Product {
    _id: string;
    slug: string;
    updatedAt: string;
}

interface ProductResponse {
    products: Product[];
    pagination: {
        total: number;
        page: number;
        totalPages: number;
    };
}

interface Category {
    _id: string;
    slug: string;
    updatedAt: string;
}

interface CategoryResponse {
    categories: Category[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        '',
        '/about-us',
        '/contact',
        '/farms-and-sourcing',
        '/instant',
        '/kitchen',
        '/membership',
        '/truth-lab',
        '/shop',
        '/shop-by-concern',
        '/categories',
        '/privacy-policy',
        '/refund-policy',
        '/shipping-policy',
        '/terms-and-conditions',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Fetch Categories
    let categoryRoutes: MetadataRoute.Sitemap = [];
    try {
        const res = await fetch(`${API_URL}/api/categories`, { cache: 'no-store' });
        if (res.ok) {
            const data: CategoryResponse = await res.json();
            categoryRoutes = data.categories.map((category) => ({
                url: `${BASE_URL}/categories/${category.slug}`,
                lastModified: category.updatedAt || new Date().toISOString(),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }));
        } else {
            console.error(`Failed to fetch categories: ${res.status}`);
        }
    } catch (error) {
        console.error('Error fetching categories for sitemap:', error);
    }

    // Fetch Products with pagination handling
    let productRoutes: MetadataRoute.Sitemap = [];
    try {
        // improved deep dive: handle pagination to get ALL products
        const limit = 100; // API clamp limit
        const initialRes = await fetch(`${API_URL}/api/products?limit=${limit}&page=1`, { cache: 'no-store' });

        if (initialRes.ok) {
            const initialData: ProductResponse = await initialRes.json();
            const totalPages = initialData.pagination.totalPages;

            let allProducts = [...initialData.products];

            // If more pages exist, fetch them in parallel
            if (totalPages > 1) {
                const pagePromises = [];
                // Limit to 10 extra pages to avoid timeout/performance issues in serverless
                // This covers up to 1100 products which is likely sufficient
                const maxPagesToFetch = Math.min(totalPages, 11);

                for (let page = 2; page <= maxPagesToFetch; page++) {
                    pagePromises.push(
                        fetch(`${API_URL}/api/products?limit=${limit}&page=${page}`, { cache: 'no-store' })
                            .then(res => res.ok ? res.json() : null)
                    );
                }

                const results = await Promise.all(pagePromises);
                results.forEach((data: ProductResponse | null) => {
                    if (data && data.products) {
                        allProducts = [...allProducts, ...data.products];
                    }
                });
            }

            productRoutes = allProducts.map((product) => ({
                url: `${BASE_URL}/shop/${product.slug}`,
                lastModified: product.updatedAt || new Date().toISOString(),
                changeFrequency: 'daily' as const,
                priority: 0.9,
            }));
        } else {
            console.error(`Failed to fetch products: ${initialRes.status}`);
        }
    } catch (error) {
        console.error('Error fetching products for sitemap:', error);
    }

    return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
