"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";
import Sidebar from "@/features/profile/components/Sidebar";
import OrdersList from "@/features/profile/components/OrdersList";
import AddressList from "@/features/profile/components/AddressList";
import AccountDetails from "@/features/profile/components/AccountDetails";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [active, setActive] = useState<"orders" | "addresses" | "account">("orders");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/signin");
    }
  }, [loading, user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-gray-50 rounded-xl shadow-lg overflow-hidden">
        <Sidebar active={active} setActive={setActive} />

        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">
            {active === "orders" ? "My Orders" : active === "addresses" ? "Addresses" : "Account"}
          </h1>

          {active === "orders" ? <OrdersList /> : active === "addresses" ? <AddressList /> : <AccountDetails />}
        </main>
      </div>
    </div>
  );
}
