"use client";

import React from "react";
import { toast } from "sonner";

const MembershipNewsletterForm = () => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                // Simulate API call
                const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
                    .value;
                if (email) {
                    toast.success("Thanks for subscribing! We'll keep you posted.");
                    (e.target as HTMLFormElement).reset();
                }
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 bg-gray-100 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-400 placeholder-gray-400"
            />
            <button
                type="submit"
                className="bg-gray-900 cursor-pointer text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors shadow-lg"
            >
                Subscribe
            </button>
        </form>
    );
};

export default MembershipNewsletterForm;
