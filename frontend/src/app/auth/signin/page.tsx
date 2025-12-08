"use client";

import Link from "next/link";
import AuthCard from "../../components/AuthCard";
import GoogleButton from "../../components/GoogleButton";

export default function SigninPage() {
  return (
    <AuthCard title="Welcome Back">
      <form className="space-y-4">
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
          Sign In
        </button>

        <GoogleButton text="Sign in with Google" />
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don&apos;t have an account?{" "}
        <Link className="text-green-700 font-semibold" href="/auth/signup">
          Create one
        </Link>
      </p>
    </AuthCard>
  );
}
