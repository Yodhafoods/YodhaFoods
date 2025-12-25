import Image from "next/image";

type Props = {
    title: string;
    image: string;
    tag: string;
};

export default function RecipeCard({ title, image, tag }: Props) {
    return (
        <div className="relative h-[300px] rounded-[24px] overflow-hidden bg-black cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group">
            {/* Image */}
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 p-4 text-white w-full">
                <span className="inline-block bg-[#c5a059] text-[9px] font-bold px-1.5 py-0.5 rounded mb-1.5">
                    {tag}
                </span>

                <h3 className="text-sm font-semibold leading-tight mb-2 line-clamp-2">
                    {title}
                </h3>

                <button className="w-full bg-white text-[#2d4a22] text-[10px] font-bold py-2 rounded-lg hover:bg-[#c5a059] hover:text-white transition opacity-90 hover:opacity-100">
                    Experience Ritual
                </button>
            </div>
        </div>
    );
}
