"use client";

import Link from "next/link";
import { useState } from "react";
import AuthCard from "../../components/AuthCard";
import GoogleButton from "../../components/GoogleButton";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <AuthCard title="Create Your Account">
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg font-semibold transition cursor-pointer"
        >
          Sign Up
        </button>

        <GoogleButton text="Sign up with Google" />
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link className="text-green-700 font-semibold" href="/auth/signin">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
