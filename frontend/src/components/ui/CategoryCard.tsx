import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

interface CategoryCardProps {
    category: Category;
    index?: number; // Added index for the numbering
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
    return (
        <Link href={`/categories/${category.slug}`} className="group block relative">
            <div className="relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                {/* Aspect Ratio: Portrait 3:4 or 2:3 for standard poster look. Using 3:4 */}
                <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-900">
                    {category.imageUrl ? (
                        <Image
                            src={category.imageUrl}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-800">
                            <span className="text-gray-500 font-bold">No Image</span>
                        </div>
                    )}



                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end items-center text-center">
                        {/* Short description or 'View' text can go here if needed */}
                        <span className="hidden group-hover:block text-orange-400 text-[10px] font-bold bg-white px-4 py-1 rounded-xl tracking-widest mt-1 transform translate-y-0">
                            EXPLORE
                        </span>
                    </div>

                    {/* Number Overlay (Top Left) */}
                    {/* {index !== undefined && (
                        <div className="absolute top-0 left-4 text-6xl md:text-7xl opacity-70 font-black text-white/80 group-hover:text-white transition-colors pointer-events-none select-none" style={{ lineHeight: 0.8 }}>
                            {index + 1}
                        </div>
                    )} */}
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
