import React from "react";

export const TruthOfTheDay = () => {
    return (
        <section className="mb-[80px] rounded-[40px] bg-gradient-to-br from-[#c79a2d] to-[#e6c36b] p-[100px_40px] text-center text-white shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <p className="text-[0.7rem] font-extrabold uppercase tracking-[4px]">
                Truth of the Day
            </p>
            <h2 className="mb-[20px] font-[family-name:var(--font-playfair)] text-[3rem]">"Potency is visible in the pigment."</h2>
            <p>
                If your beetroot isn't deep purple or your spinach isn't vibrant
                green, the nutrients were destroyed by heat. Always trust the color.
            </p>
            <a href="#" className="mt-[30px] inline-block rounded-[100px] bg-[#0f2f2b] px-[50px] py-[18px] font-bold text-white no-underline">EXPLORE THE ARCHIVES</a>
        </section>
    );
}
