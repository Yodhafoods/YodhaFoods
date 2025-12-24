import { Search } from "lucide-react";

interface TabletSearchBarProps {
    placeholder: string;
    onClick: () => void;
}

export default function TabletSearchBar({
    placeholder,
    onClick,
}: TabletSearchBarProps) {
    return (
        <div className="hidden md:flex lg:hidden px-4 pb-4 max-w-[1440px] mx-auto justify-center">
            <button
                className="w-full max-w-[550px] border border-gray-800 text-xs font-medium text-gray-800 flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-100 p-3 pl-4 rounded-full transition-all duration-100"
                onClick={onClick}
            >
                <span className="flex-1 text-left truncate">{placeholder}</span>
                <span>
                    <Search size={16} />
                </span>
            </button>
        </div>
    );
}
