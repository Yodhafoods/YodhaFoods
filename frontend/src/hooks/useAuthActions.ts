"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { api, FetchError } from "@/app/lib/api";

// ---------- Types ----------
interface SignupForm {
    first_name: string;
    last_name?: string;
    contact_number: string;
    email: string;
    password: string;
}

interface SigninForm {
    identifier: string; // email or mobile
    password: string;
}

interface ErrorBody {
    message?: string;
    [key: string]: unknown;
}

// ---------- Hook ----------
export function useAuthActions() {
    const router = useRouter();
    const { refreshUser } = useAuth();

    // -----------------------------
    // SIGNUP
    // -----------------------------
    async function signup(form: SignupForm) {
        try {
            await api.post<{ message: string }, SignupForm>(
                "/api/auth/register",
                form
            );

            toast.success("Signup successful! Redirecting...");
            router.push("/auth/verify-email-info");
            return true;
        } catch (err) {
            if (err instanceof FetchError) {
                const body = err.body as ErrorBody | undefined;
                toast.error(body?.message ?? "Signup failed");
            } else {
                toast.error("Unexpected error");
            }
            return false;
        }
    }

    // -----------------------------
    // SIGNIN
    // -----------------------------
    async function signin(form: SigninForm) {
        try {
            await api.post("/api/auth/login", form);

            toast.success("Signed in successfully!");
            await refreshUser();
            router.push("/");
            return true;
        } catch (err) {
            if (err instanceof FetchError) {
                const body = err.body as ErrorBody | undefined;
                toast.error(body?.message ?? "Invalid credentials");
            } else {
                toast.error("Unable to connect to server");
            }
            return false;
        }
    }

    return { signup, signin };
}
