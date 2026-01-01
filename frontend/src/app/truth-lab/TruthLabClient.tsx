'use client';
import { useState, useMemo } from 'react';

export default function TruthLabClient() {
    const [sliderValue, setSliderValue] = useState(500);
    const [selectedVeg, setSelectedVeg] = useState({ price: 60, name: 'Beetroot' });

    const stats = useMemo(() => {
        // Calculation logic (concentration ratio 4.2:1)
        const equivalent = Math.round(sliderValue / 4.2);

        // Monthly Savings logic (Fresh + Spoilage vs Concentration)
        const monthlySavings = Math.round(
            ((sliderValue * 4) / 1000) * selectedVeg.price * 1.3 + 250
        );

        const currentCost = ((sliderValue / 1000) * selectedVeg.price).toFixed(2);

        // Gauge offset calculation
        const offset = 628 - (sliderValue / 2000) * 628;

        return { equivalent, monthlySavings, currentCost, offset };
    }, [sliderValue, selectedVeg]);

    const handleVegChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const price = parseInt(e.target.value);
        const name = e.target.options[e.target.selectedIndex].getAttribute("data-name") || 'Beetroot';
        setSelectedVeg({ price, name });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 -mt-20 mb-20 relative z-10">
            <div className="bg-mid-green rounded-[30px] p-[45px] text-white shadow-[0_30px_60px_var(--color-section-shadow)]">
                <h2 className="text-[0.8rem] tracking-[2px] text-base-gold text-center mb-[30px] font-bold">THE PURITY SAVINGS ENGINE</h2>

                <div className="mb-5">
                    <label className="block text-[0.7rem] font-extrabold mb-2 text-light-gold uppercase">CHOOSE INGREDIENT</label>
                    <select
                        className="w-full rounded-lg border-none bg-soft-cream p-[15px] text-dark-green font-semibold mb-5"
                        onChange={handleVegChange}
                        value={selectedVeg.price}
                    >
                        <option value="60" data-name="Beetroot">
                            Beetroot (Avg. ₹60/kg)
                        </option>
                        <option value="65" data-name="Spinach">
                            Spinach (Avg. ₹65/kg)
                        </option>
                        <option value="150" data-name="Moringa">
                            Moringa (Avg. ₹150/kg)
                        </option>
                    </select>
                </div>

                <div>
                    <label className="block text-[0.7rem] font-extrabold mb-2 text-light-gold uppercase">CONSUMPTION: {sliderValue}g / WEEK</label>
                    <input
                        type="range"
                        min="100"
                        max="2000"
                        step="100"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(parseInt(e.target.value))}
                        className="w-full accent-base-gold"
                    />
                </div>

                <div className="bg-[rgba(199,154,45,0.1)] border border-base-gold p-[25px] rounded-[15px] text-center mt-5">
                    <p className="m-0 text-[0.7rem] opacity-80 uppercase">
                        Est. Monthly Indian Household Saving
                    </p>
                    <strong className="text-base-gold text-[1.6rem] block my-1">₹{stats.monthlySavings.toLocaleString('en-IN')} Saved/Mo</strong>
                    <div className="text-light-gold text-[0.75rem] mt-3 font-semibold uppercase tracking-[0.5px]">
                        Market Reality: You pay ₹{stats.currentCost} today for {selectedVeg.name} (mostly water
                        weight)
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[30px] p-10 flex flex-col items-center justify-center shadow-[0_20px_40px_var(--color-section-shadow)]">
                <div className="relative w-[220px] h-[220px]">
                    <svg viewBox="0 0 220 220">
                        <circle
                            cx="110"
                            cy="110"
                            r="100"
                            fill="none"
                            stroke="#f0f0f0"
                            strokeWidth="6"
                            strokeDasharray="4 4"
                        />
                        <circle
                            cx="110"
                            cy="110"
                            r="100"
                            fill="none"
                            stroke="var(--color-base-gold)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray="628"
                            strokeDashoffset={stats.offset}
                            className="transition-[stroke-dashoffset] duration-500 ease-out"
                        />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <h3 className="text-[3rem] m-0 text-dark-green leading-none">{stats.equivalent}g</h3>
                        <p className="text-base-gold text-[0.6rem] font-extrabold mt-10">
                            YODHA EQUIVALENT
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
