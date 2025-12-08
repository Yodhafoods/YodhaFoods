"use client";

import { FcGoogle } from "react-icons/fc";

interface GoogleButtonProps {
  text?: string;
}

export default function GoogleButton({
  text = "Sign in with Google",
}: GoogleButtonProps) {
  return (
    <button
      className="
        w-full flex items-center justify-center gap-3 
        border border-gray-300 
        py-2.5 rounded-lg text-gray-700 
        hover:bg-gray-100 transition
        font-medium cursor-pointer
      "
    >
      <FcGoogle size={22} />
      {text}
    </button>
  );
}
