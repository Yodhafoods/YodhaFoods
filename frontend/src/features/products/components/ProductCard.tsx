import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                {product.images && product.images.length > 0 ? (
                    <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <span className="text-gray-400">No Image</span>
                    </div>
                )}
                {product.discountPrice && (
                    <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
                        Sale
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                        <Link href={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>
                    {/* Optional: Add rating stars here */}
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ₹{product.price}
                        </span>
                        {product.discountPrice && (
                            <span className="text-xs text-gray-500 line-through">
                                ₹{product.discountPrice}
                            </span>
                        )}
                    </div>
                    <button
                        className="transform rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-md active:scale-95"
                        onClick={(e) => {
                            e.preventDefault();
                            // Setup for future Redux cart integration
                            console.log('Add to cart', product._id);
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
