"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";

function VerifyEmailContent() {
  const search = useSearchParams();
  const router = useRouter();
  const token = search.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        await api.get(`/api/auth/verify-email?token=${token}`);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      {status === "loading" && (
        <p className="text-gray-600">Verifying your email...</p>
      )}

      {status === "success" && (
        <>
          <h1 className="text-3xl font-bold mb-3">Email Verified 🎉</h1>
          <p className="text-gray-600 mb-6">
            Your email has been successfully verified.
          </p>

          <button
            onClick={() => router.push("/auth/signin")}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl transition"
          >
            Continue to Sign In
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-3xl font-bold text-red-600 mb-3">
            Invalid or Expired Link
          </h1>
          <p className="text-gray-600 mb-6">
            The verification link is invalid or has expired.
          </p>

          <a
            href="/auth/verify-email-info"
            className="text-green-700 underline"
          >
            Resend Verification Email
          </a>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
