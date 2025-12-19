import { useState } from "react";

interface RazorpayOptions {
    key: string;
    amount: string | number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id: string;
    handler: (response: any) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    notes?: Record<string, string>;
    theme?: {
        color: string;
    };
}

export function useRazorpay() {
    const [isLoaded, setIsLoaded] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (document.getElementById("razorpay-script")) {
                setIsLoaded(true);
                resolve(true);
                return;
            }

            const script = document.createElement("script");
            script.id = "razorpay-script";
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                setIsLoaded(true);
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const displayRazorpay = async (options: RazorpayOptions) => {
        const res = await loadRazorpayScript();

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
    };

    return { displayRazorpay, isLoaded };
}
