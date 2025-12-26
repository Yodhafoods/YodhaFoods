'use client';
import { useState, useMemo } from 'react';

export default function TruthLab() {
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
        <div className="bg-soft-cream text-dark-green font-sans min-h-screen">
            {/* Hero Section */}
            <header className="bg-gradient-to-b from-dark-green to-mid-green text-heading-light text-center pt-20 pb-[140px] px-5 relative [clip-path:ellipse(150%_100%_at_50%_0%)]">
                <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] m-0 tracking-[2px] uppercase">
                    Truth Laboratory
                </h1>
                <p className="text-light-gold text-[0.9rem] tracking-[3px] mt-[15px] font-light">
                    Where ancient ingredient wisdom is verified by modern molecular science.
                </p>
                <div className="absolute bottom-0 w-[80%] h-1 bg-base-gold left-[10%] rounded-full shadow-[0_4px_15px_var(--color-shadow-gold)]"></div>
            </header>

            <main className="max-w-[1100px] mx-auto px-5">
                {/* Savings Calculator */}
                <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 -mt-20 mb-20">
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

                {/* Myth Busters */}
                <h2 className="font-serif text-[2.2rem] my-[60px] mb-[30px] text-center text-dark-green">Myth Busters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-20">
                    <div className="rounded-[25px] overflow-hidden flex flex-col shadow-[0_15px_30px_var(--color-section-shadow)]">
                        <div className="bg-mid-green text-light-gold p-[25px] font-extrabold text-[0.7rem] uppercase tracking-[2px]">Common Myth</div>
                        <div className="bg-white p-[35px] text-[0.9rem] leading-[1.6] flex-grow text-body-text">
                            <b className="text-base-gold block mb-2 text-[1.1rem]">Fresh is always better.</b>
                            Store-bought "fresh" veggies are often 5-7 days old, having lost
                            nearly 50% of their nutrients. Yodha is locked at the hour of
                            harvest.
                        </div>
                    </div>
                    <div className="rounded-[25px] overflow-hidden flex flex-col shadow-[0_15px_30px_var(--color-section-shadow)]">
                        <div className="bg-mid-green text-light-gold p-[25px] font-extrabold text-[0.7rem] uppercase tracking-[2px]">Common Myth</div>
                        <div className="bg-white p-[35px] text-[0.9rem] leading-[1.6] flex-grow text-body-text">
                            <b className="text-base-gold block mb-2 text-[1.1rem]">Powders are processed.</b>
                            Yodha isn't "processed"—it's concentrated. We remove ONLY the water,
                            keeping 100% of the active medicinal compounds alive.
                        </div>
                    </div>
                </div>

                {/* Do You Know? */}
                <h2 className="font-serif text-[2.2rem] my-[60px] mb-[30px] text-center text-dark-green">Do You Know?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-20">
                    <div className="bg-white rounded-[25px] p-10 shadow-[0_15px_30px_var(--color-section-shadow)] flex flex-col items-start h-full">
                        <h3 className="text-dark-green text-[1.4rem] mb-[15px] font-serif">Bioavailability Secrets</h3>
                        <p className="text-body-text text-[0.95rem] leading-[1.7] mb-[25px] flex-grow">
                            Did you know that micronized particles enter your bloodstream 3x
                            faster than raw cellulose fibers? Our dehydration process makes
                            nutrients instantly bio-ready.
                        </p>
                        <button className="bg-dark-green text-white py-[12px] px-[30px] rounded-full font-bold text-[0.8rem] hover:opacity-90 transition-opacity cursor-pointer">Learn More</button>
                    </div>
                    <div className="bg-white rounded-[25px] p-10 shadow-[0_15px_30px_var(--color-section-shadow)] flex flex-col items-start h-full">
                        <h3 className="text-dark-green text-[1.4rem] mb-[15px] font-serif">Enzyme Dormancy</h3>
                        <p className="text-body-text text-[0.95rem] leading-[1.7] mb-[25px] flex-grow">
                            By removing water without heat, we put plant enzymes in a dormant
                            state. They stay "alive" and potent until the second they hit your
                            glass.
                        </p>
                        <button className="bg-dark-green text-white py-[12px] px-[30px] rounded-full font-bold text-[0.8rem] hover:opacity-90 transition-opacity cursor-pointer">Read Full Study</button>
                    </div>
                </div>

                {/* Truth in the Box */}
                <section className="bg-dark-green rounded-[40px] py-20 px-10 text-center text-heading-light mb-20">
                    <h2 className="font-serif text-[2.5rem] text-light-gold mb-[15px]">Truth in the Box</h2>
                    <p>
                        Unlock your personalized "Nutritional Savings Report" and the
                        Molecular Blueprint PDF.
                    </p>
                    <form className="max-w-[500px] mx-auto mt-10 flex flex-col gap-[15px]" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Email Address" required className="p-5 rounded-full border-none bg-soft-cream text-[1rem] text-dark-green outline-none" />
                        <input type="tel" placeholder="WhatsApp Number" required className="p-5 rounded-full border-none bg-soft-cream text-[1rem] text-dark-green outline-none" />
                        <button type="submit" className="bg-base-gold text-white p-5 rounded-full font-extrabold cursor-pointer uppercase shadow-[0_10px_20px_var(--color-shadow-gold)] hover:brightness-110 transition-all">Get My Report</button>
                    </form>
                    <p className="mt-5 text-[0.8rem] opacity-60">
                        Join Truth Seekers
                    </p>
                </section>

                {/* Truth of the Day */}
                <section className="bg-gradient-to-br from-base-gold to-light-gold py-[100px] px-10 rounded-[40px] text-center text-white mb-20 shadow-[0_20px_40px_var(--color-section-shadow)]">
                    <p className="uppercase tracking-[4px] font-extrabold text-[0.7rem]">
                        Truth of the Day
                    </p>
                    <h2 className="font-serif text-[3rem] mb-5 mt-2">"Potency is visible in the pigment."</h2>
                    <p className="max-w-2xl mx-auto">
                        If your beetroot isn't deep purple or your spinach isn't vibrant
                        green, the nutrients were destroyed by heat. Always trust the color.
                    </p>
                    <a href="#" className="bg-dark-green text-white py-[18px] px-[50px] rounded-full font-bold mt-[30px] inline-block hover:opacity-90 transition-opacity no-underline">EXPLORE THE ARCHIVES</a>
                </section>
            </main>
        </div>
    );
}