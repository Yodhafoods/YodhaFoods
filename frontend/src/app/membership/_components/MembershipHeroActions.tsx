"use client";

import Link from "next/link";
import React from "react";

const MembershipHeroActions = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
                onClick={() =>
                    document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-orange-600 cursor-pointer text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 hover:bg-orange-700 hover:-translate-y-1 transition-all"
            >
                Notify Me When Live
            </button>
            <Link
                href="/shop"
                className="px-8 py-4 rounded-xl font-bold text-lg text-gray-700 border-2 border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-all flex items-center gap-2 justify-center"
            >
                Explore Store
            </Link>
        </div>
    );
};

export default MembershipHeroActions;
