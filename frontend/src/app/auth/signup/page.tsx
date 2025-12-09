"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthCard from "../../components/AuthCard";
import GoogleButton from "../../components/GoogleButton";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // Success popup
      toast.success("Registration successful! Redirecting...");

      // Clear form
      setForm({ name: "", email: "", password: "" });

      // Redirect after 1.5 sec
      setTimeout(() => router.push("/auth/signin"), 1500);
    } catch (err) {
      toast.error("Unable to connect to server");
    }

    setLoading(false);
  }

  return (
    <AuthCard title="Create Your Account">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg font-semibold transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
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
