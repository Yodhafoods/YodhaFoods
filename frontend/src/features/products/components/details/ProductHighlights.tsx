import { Sun, Zap, Heart, Leaf } from "lucide-react";

export default function ProductHighlights() {
    const highlights = [
        { icon: Sun, label: "Naturally Dried", color: "text-amber-500", bg: "bg-amber-50" },
        { icon: Zap, label: "Antioxidant Superfood", color: "text-purple-500", bg: "bg-purple-50" },
        { icon: Heart, label: "Rich Vitamin C Content", color: "text-rose-500", bg: "bg-rose-50" },
        { icon: Leaf, label: "Loaded with Minerals", color: "text-emerald-500", bg: "bg-emerald-50" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {highlights.map((item, idx) => (
                <div key={idx} className={`flex flex-col items-center justify-center p-4 rounded-xl ${item.bg} border border-transparent hover:scale-105 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color} mb-2`} strokeWidth={2} />
                    <span className={`text-xs font-bold text-center ${item.color.replace('text-', 'text-opacity-80 pb-0 text-')}`.replace('pb-0 text-', '')}>{item.label}</span>
                </div>
            ))}
        </div>
    );
}
