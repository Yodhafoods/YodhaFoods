"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import Image from "next/image";

interface AuthDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    defaultMode?: "signin" | "signup";
}

export default function AuthDrawer({ isOpen, onClose, defaultMode = "signin" }: AuthDrawerProps) {
    const [mode, setMode] = useState<"signin" | "signup">(defaultMode);

    // Reset mode when drawer opens
    useEffect(() => {
        if (isOpen) {
            setMode(defaultMode);
        }
    }, [isOpen, defaultMode]);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Yodha Foods"
                                width={40}
                                height={40}
                                className="h-8 w-auto"
                            />
                            <span className="font-semibold text-gray-900">Yodha Foods</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={24} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {mode === "signin" ? (
                            <SigninForm
                                isDrawer={true}
                                onSuccess={onClose}
                                onSwitchToSignup={() => setMode("signup")}
                            />
                        ) : (
                            <SignupForm
                                onSuccess={onClose}
                                onSwitchToSignin={() => setMode("signin")}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
