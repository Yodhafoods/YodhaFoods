"use client";

import { FcGoogle } from "react-icons/fc";

interface GoogleButtonProps {
  text?: string;
}

export default function GoogleButton({
  text = "Sign in with Google",
}: GoogleButtonProps) {
  return (
    <a
      href={`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "")}/api/auth/google`}
      className="
        w-full flex items-center justify-center gap-3 
        border border-gray-300 
        py-2.5 rounded-lg text-gray-700 
        hover:bg-gray-100 transition
        font-medium cursor-pointer
        no-underline
      "
    >
      <FcGoogle size={22} />
      {text}
    </a>
  );
}