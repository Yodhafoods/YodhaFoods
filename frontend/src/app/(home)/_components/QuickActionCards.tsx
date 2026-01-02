"use client";

import { motion, Variants } from "framer-motion";
import {
    Gift,
    Percent,
    MessageSquarePlus,
    HeartPulse,
    Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/features/ui/store/uiSlice";

const cards = [
    {
        id: 1,
        title: "Bundle Your Box",
        subtitle: "Pick 6 products & unlock savings",
        icon: Gift,
        action: "/bundle",
        style: "bg-gradient-to-br from-[#f3d9c1] to-[#d97e5a] text-[#0f2f2b]",
        iconColor: "text-[#0f2f2b]",
        subColor: "text-[#0f2f2b]/80",
        buttonText: "Start Ritual",
    },
    {
        id: 2,
        title: "New Coupons",
        subtitle: "Fresh offers just dropped",
        icon: Percent,
        action: "/shop",
        style: "bg-gradient-to-br from-orange-200 to-amber-300 text-black",
        iconColor: "text-black",
        subColor: "text-black/70",
        buttonText: "Avail Now",
    },


    {
        id: 4,
        title: "Today’s Ritual",
        subtitle: "Simple daily health mix",
        icon: Sparkles,
        action: "/kitchen",
        style: "bg-gradient-to-br from-green-900 to-teal-800 text-white",
        iconColor: "text-white",
        subColor: "text-white/80",
        buttonText: "Explore",
    },
    {
        id: 3,
        title: "Request a Product",
        subtitle: "Your wish is Yodha’s wish",
        icon: MessageSquarePlus,
        action: "/shop",
        style: "bg-gradient-to-br from-[#b1a34f] to-[#dbdcab] text-black border border-white/20",
        iconColor: "text-black",
        subColor: "text-black/60",
        buttonText: "Submit Request",
    },
];

export default function QuickActionCards() {
    const router = useRouter();
    const dispatch = useDispatch();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <div className="w-full px-2 md:px-0 py-4 md:py-8">
            <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                if (card.id === 1) {
                                    dispatch(openDrawer());
                                } else {
                                    router.push(card.action);
                                }
                            }}
                            className={`
                                relative overflow-hidden
                                flex flex-col justify-between
                                w-full min-h-[140px] md:min-h-[260px]
                                rounded-xl md:rounded-2xl
                                p-3 md:p-8 text-left
                                shadow-lg hover:shadow-xl
                                transition-all duration-300
                                cursor-pointer
                                group
                                ${card.style}
                            `}
                        >
                            {/* Icon Background Effect */}
                            <Icon
                                className={`absolute -bottom-4 -right-4 w-20 h-20 md:w-32 md:h-32 opacity-10 rotate-12 ${card.iconColor}`}
                            />

                            <div className="flex flex-col gap-2 md:gap-3 relative z-10">
                                <div className={`p-1.5 md:p-3 rounded-xl bg-white/10 w-fit backdrop-blur-sm`}>
                                    <Icon size={16} className={`md:hidden ${card.iconColor}`} />
                                    <Icon size={28} className={`hidden md:block ${card.iconColor}`} />
                                </div>

                                <div>
                                    <h4 className="text-xs md:text-2xl font-bold leading-tight mb-1 md:mb-2 text-wrap break-words">
                                        {card.title}
                                    </h4>
                                    <p className={`text-[10px] md:text-base font-medium leading-relaxed hidden md:block ${card.subColor}`}>
                                        {card.subtitle}
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10 mt-1 md:mt-0">
                                <span className={`
                                    inline-flex items-center gap-1 md:gap-2 
                                    text-[9px] md:text-sm font-bold uppercase tracking-wider 
                                    px-2 py-1 md:px-4 md:py-2 rounded-lg 
                                    bg-white/20 backdrop-blur-md 
                                    group-hover:bg-white/30 transition-colors
                                    ${card.iconColor}
                                `}>
                                    {card.buttonText} <span className="text-xs md:text-lg">→</span>
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
