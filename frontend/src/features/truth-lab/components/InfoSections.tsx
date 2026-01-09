import React from "react";

export const InfoSections = () => {
    return (
        <>
            <h2 className="my-[60px] mb-[30px] text-center font-[family-name:var(--font-playfair)] text-[2.2rem] text-[#0f2f2b]">Myth Busters</h2>
            <div className="mb-[80px] grid grid-cols-1 gap-[30px] md:grid-cols-2">
                <div className="flex flex-col overflow-hidden rounded-[25px] shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
                    <div className="bg-[#173e3a] p-[25px] text-[0.7rem] font-extrabold uppercase tracking-[2px] text-[#e6c36b]">Common Myth</div>
                    <div className="flex-grow bg-white p-[35px] text-[0.9rem] leading-[1.6]">
                        <b className="mb-2 block text-[1.1rem] text-[#c79a2d]">"Fresh is always better."</b>
                        Store-bought "fresh" veggies are often 5-7 days old, having lost
                        nearly 50% of their nutrients. Yodha is locked at the hour of
                        harvest.
                    </div>
                </div>
                <div className="flex flex-col overflow-hidden rounded-[25px] shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
                    <div className="bg-[#173e3a] p-[25px] text-[0.7rem] font-extrabold uppercase tracking-[2px] text-[#e6c36b]">Common Myth</div>
                    <div className="flex-grow bg-white p-[35px] text-[0.9rem] leading-[1.6]">
                        <b className="mb-2 block text-[1.1rem] text-[#c79a2d]">"Powders are processed."</b>
                        Yodha isn't "processed"—it's concentrated. We remove ONLY the water,
                        keeping 100% of the active medicinal compounds alive.
                    </div>
                </div>
            </div>

            <h2 className="my-[60px] mb-[30px] text-center font-[family-name:var(--font-playfair)] text-[2.2rem] text-[#0f2f2b]">Do You Know?</h2>
            <div className="mb-[80px] grid grid-cols-1 gap-[30px] md:grid-cols-2">
                <div className="flex flex-col items-start rounded-[25px] bg-white p-[40px] shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
                    <h3 className="mb-[15px] font-[family-name:var(--font-playfair)] text-[1.4rem] text-[#0f2f2b]">Bioavailability Secrets</h3>
                    <p className="mb-[25px] text-[0.95rem] leading-[1.7] text-[#6e6e6e]">
                        Did you know that micronized particles enter your bloodstream 3x
                        faster than raw cellulose fibers? Our dehydration process makes
                        nutrients instantly bio-ready.
                    </p>
                    <button className="cursor-pointer rounded-[100px] border-none bg-[#0f2f2b] px-[30px] py-[12px] text-[0.8rem] font-bold text-white">Learn More</button>
                </div>
                <div className="flex flex-col items-start rounded-[25px] bg-white p-[40px] shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
                    <h3 className="mb-[15px] font-[family-name:var(--font-playfair)] text-[1.4rem] text-[#0f2f2b]">Enzyme Dormancy</h3>
                    <p className="mb-[25px] text-[0.95rem] leading-[1.7] text-[#6e6e6e]">
                        By removing water without heat, we put plant enzymes in a dormant
                        state. They stay "alive" and potent until the second they hit your
                        glass.
                    </p>
                    <button className="cursor-pointer rounded-[100px] border-none bg-[#0f2f2b] px-[30px] py-[12px] text-[0.8rem] font-bold text-white">Read Full Study</button>
                </div>
            </div>
        </>
    );
};
