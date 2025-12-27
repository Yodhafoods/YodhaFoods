'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

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
        <div className="bg-soft-cream text-dark-green font-sans min-h-screen flex flex-col items-center">
            {/* New Header */}
            <header className="py-6 lg:py-10 px-5 flex justify-center">
                <div className="bg-dark-green text-white py-[12px] px-[40px] lg:py-[15px] lg:px-[70px] rounded-full font-serif text-[1.1rem] sm:text-[1.5rem] lg:text-[2rem] uppercase tracking-[1px] lg:tracking-[2px] shadow-md text-center">
                    Truth Laboratory
                </div>
            </header>

            {/* New Hero Section */}
            <div className="w-full max-w-[1800px] h-auto lg:h-[800px] flex justify-center items-center p-5 md:p-10">
                <section
                    className="w-full h-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] rounded-[40px] lg:rounded-[80px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.35)] lg:shadow-[0_60px_120px_rgba(0,0,0,0.35)] relative border border-[rgba(199,154,45,0.3)]"
                    style={{
                        background: `radial-gradient(at 0% 0%, var(--color-mid-green) 0%, transparent 55%),
                                    radial-gradient(at 100% 0%, var(--color-base-gold) 0%, transparent 50%),
                                    radial-gradient(at 100% 100%, var(--color-dark-green) 0%, transparent 60%),
                                    var(--color-dark-green)`
                    }}
                >
                    <div className="order-2 lg:order-1 px-5 py-10 lg:px-[100px] flex flex-col justify-center text-white z-[5]">
                        <span className="text-light-gold font-extrabold tracking-[6px] text-xs lg:text-sm mb-[20px] lg:mb-[30px] opacity-80 uppercase text-center lg:text-left">
                            Know Your Truth
                        </span>
                        <h1 className="font-serif text-[2.8rem] sm:text-[3.5rem] lg:text-[6.5rem] leading-[1.1] lg:leading-[1] mb-[30px] lg:mb-[40px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] text-center lg:text-left">
                            Stop paying<br />for water.
                        </h1>

                        <div className="bg-white-glass backdrop-blur-[20px] border-l-[3px] border-base-gold p-[20px] lg:p-[35px] rounded-r-[30px] mb-[40px] lg:mb-[50px] max-w-[750px]">
                            <span className="text-light-gold font-extrabold text-[0.8rem] lg:text-[1rem] uppercase tracking-[4px] block mb-[10px] lg:mb-[15px]">
                                Market Reality
                            </span>
                            <p className="text-[1rem] sm:text-[1.1rem] lg:text-[1.4rem] leading-[1.6] font-light text-[rgba(255,255,255,0.95)]">
                                90% of fresh produce you buy is just water weight. <br />
                                <span className="text-light-gold font-semibold border-b border-[rgba(230,195,107,0.4)]">
                                    Experience the 4.2x Nutrient Concentration that fresh food cannot provide.
                                </span>
                            </p>
                        </div>

                        <div className="text-center lg:text-left">
                            <a
                                href="#calculator"
                                className="inline-block bg-base-gold text-white py-[18px] px-[30px] lg:py-[25px] lg:px-[60px] rounded-[100px] font-extrabold text-[0.85rem] lg:text-[1rem] uppercase tracking-[3px] shadow-[0_25px_50px_rgba(0,0,0,0.4)] transition-all duration-400 hover:-translate-y-2 hover:bg-light-gold hover:shadow-[0_30px_60px_rgba(199,154,45,0.5)] w-full sm:w-auto"
                            >
                                Calculate Your Savings
                            </a>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 bg-[rgba(0,0,0,0.25)] flex flex-col items-center justify-center relative p-10 lg:p-0 min-h-[400px]">
                        <div className="relative w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] flex items-center justify-center scale-90 lg:scale-100">
                            <motion.div
                                className="absolute w-[180px] h-[180px] lg:w-[280px] lg:h-[280px] rounded-full"
                                style={{
                                    background: 'radial-gradient(circle, rgba(199, 154, 45, 0.15) 0%, transparent 75%)'
                                }}
                                animate={{
                                    scale: [0.95, 1.1, 0.95],
                                    opacity: [0.3, 0.8, 0.3]
                                }}
                                transition={{
                                    duration: 4,
                                    ease: "easeInOut",
                                    repeat: Infinity
                                }}
                            />
                            <div className="absolute w-[250px] h-[250px] lg:w-[380px] lg:h-[380px] border border-dashed border-[rgba(199,154,45,0.4)] rounded-full"></div>
                            <motion.div
                                className="absolute w-full h-full rounded-full border-[3px] border-transparent border-t-base-gold"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1.2,
                                    ease: "linear",
                                    repeat: Infinity
                                }}
                            />
                            <div className="relative z-10 font-serif text-[5rem] lg:text-[8.5rem] text-light-gold drop-shadow-[0_0_40px_rgba(199,154,45,0.6)]">
                                4.2x
                            </div>
                        </div>

                        <div className="mt-5 lg:mt-10 text-center flex flex-col gap-3 items-center">
                            <div className="text-white text-[0.7rem] lg:text-[0.8rem] tracking-[5px] font-extrabold opacity-50 uppercase">
                                Molecular Density Index
                            </div>
                            <motion.div
                                className="bg-[rgba(199,154,45,0.1)] border border-[rgba(199,154,45,0.2)] py-2 px-6 rounded-[50px] text-light-gold text-[0.85rem] lg:text-[0.95rem] font-normal tracking-[2px] backdrop-blur-[10px]"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            >
                                Start investing in cellular health.
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>

            <main className="max-w-[1100px] mx-auto px-5 w-full">
                {/* Savings Calculator */}
                <div id="calculator" className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 mt-10 mb-20 scroll-mt-32">
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