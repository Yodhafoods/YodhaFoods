import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
    category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    return (
        <Link href={`/categories/${category.slug}`} className="group block">
            <div className="relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {category.imageUrl ? (
                        <Image
                            src={category.imageUrl}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                            <span className="text-gray-400">No Image</span>
                        </div>
                    )}
                    {/* Overlay Button */}

                </div>

            </div>
        </Link>
    );
};

export default CategoryCard;
