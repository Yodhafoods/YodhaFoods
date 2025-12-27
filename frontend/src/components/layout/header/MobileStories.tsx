import Link from "next/link";
import Image from "next/image";
import { stories } from "./constants";

interface MobileStoriesProps {
    pathname: string;
}

export default function MobileStories({ pathname }: MobileStoriesProps) {
    return (
        <div className="md:hidden mt-3 px-4 pb-2 overflow-x-auto flex gap-4 no-scrollbar">
            {stories.map((item, i) => {
                const isActive =
                    item.target === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.target);
                return (
                    <Link href={item.target} key={i}>
                        <div className="flex-shrink-0 flex flex-col items-center cursor-pointer relative">
                            <div
                                className={`w-[60px] h-[60px] rounded-full p-[3px] items-center justify-center flex
                ${isActive
                                        ? "bg-green-500"
                                        : item.highlight
                                            ? "bg-gradient-to-br from-orange-500 to-orange-300"
                                            : "bg-gradient-to-br from-pink-400 via-red-400 to-purple-600"
                                    }`}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={item.img}
                                        fill
                                        alt={item.label}
                                        className="rounded-full border-2 border-white object-cover"
                                    />
                                    {isActive && (
                                        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full z-10" />
                                    )}
                                </div>
                            </div>
                            <span
                                className={`text-xs font-semibold mt-1 ${isActive ? "text-green-600" : ""
                                    }`}
                            >
                                {item.label}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
