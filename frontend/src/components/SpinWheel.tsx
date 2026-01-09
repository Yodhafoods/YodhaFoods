"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";

interface SpinWheelProps {
    onSpinEnd: (prize: any) => void;
    onSpinClick?: () => void;
    prizes: any[];
    isSpinning: boolean;
    prizeIndex: number | null;
}

const SpinWheel: React.FC<SpinWheelProps> = ({
    onSpinEnd,
    onSpinClick,
    prizes,
    isSpinning,
    prizeIndex,
}) => {
    const controls = useAnimation();
    const [rotation, setRotation] = useState(0);

    // Constants
    const numSegments = prizes.length;
    const segmentAngle = 360 / numSegments;
    const wheelSize = 320;
    const radius = wheelSize / 2;

    // Colors - Alternating Dark Green and Yellow/Gold
    const colors = ["#0f2f2b", "#fbbf24", "#0f2f2b", "#fbbf24", "#0f2f2b", "#fbbf24"];

    const handleSpin = async () => {
        if (prizeIndex === null) return;

        // Calculate target rotation
        // The needle is usually at the top (0 degrees or 270 depending on implementation)
        // If needle is at top (0 deg), and we rotate CLOCKWISE.
        // 360 - (prizeIndex * segmentAngle) - (segmentAngle/2) to center the segment

        const spinCount = 5; // number of full rotations
        const targetAngle = 360 - (prizeIndex * segmentAngle) - (segmentAngle / 2); // Center of segment
        const fullRotation = 360 * spinCount + targetAngle;

        await controls.start({
            rotate: fullRotation,
            transition: {
                duration: 4,
                ease: [0.1, 0, 0.2, 1], // Cubic bezier for "spin" feel
            },
        });

        setRotation(fullRotation % 360);
        onSpinEnd(prizes[prizeIndex]);
        fireConfetti();
    };

    const fireConfetti = () => {
        confetti({
            zIndex: 9999,
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    };

    useEffect(() => {
        if (isSpinning && prizeIndex !== null) {
            handleSpin();
        }
    }, [isSpinning, prizeIndex]);

    return (
        <div className="relative flex flex-col items-center justify-center p-4">
            {/* Needle */}
            <div className="absolute top-[-10px] z-20 w-8 h-12 pointer-events-none">
                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[35px] border-t-[#0f2f2b] drop-shadow-lg" />
            </div>

            {/* Wheel */}
            <motion.div
                className="relative rounded-full border-8 border-[#0f2f2b] shadow-2xl overflow-hidden"
                style={{
                    width: wheelSize,
                    height: wheelSize,
                    background: `conic-gradient(
            ${prizes.map((_, i) => `${colors[i % colors.length]} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`).join(", ")}
          )`,
                }}
                animate={controls}
            >
                {prizes.map((prize, i) => (
                    <div
                        key={i}
                        className="absolute top-0 left-1/2 -ml-[1px] h-1/2 w-[2px] origin-bottom scale-y-100"
                        style={{
                            transform: `rotate(${i * segmentAngle + segmentAngle / 2}deg)`,
                        }}
                    >
                        <div
                            className={`absolute pt-8 -translate-x-1/2 -translate-y-full top-12 font-bold whitespace-nowrap text-sm px-1 ${i % 2 === 0 ? "text-white" : "text-[#0f2f2b]"}`}
                        >
                            {prize.label}
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Center Cap (Spin Button) - Placed outside motion div to allow clicking while spinning if needed, or strictly inside. 
                Actually, putting it absolute center relative to the container is better so it doesn't rotate.
            */}
            <button
                onClick={() => !isSpinning && onSpinClick && onSpinClick()}
                disabled={isSpinning}
                className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 bg-[#0f2f2b] rounded-full shadow-lg z-30 flex items-center justify-center border-4 border-white cursor-pointer hover:scale-105 active:scale-95 transition-transform disabled:cursor-not-allowed disabled:opacity-90"
            >
                <span className="text-xs font-bold text-white tracking-widest">SPIN</span>
            </button>
        </div>
    );
};

export default SpinWheel;
