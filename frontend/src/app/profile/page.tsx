"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";
import Sidebar from "@/features/profile/components/Sidebar";
import OrdersList from "@/features/profile/components/OrdersList";
import AddressList from "@/features/profile/components/AddressList";
import AccountDetails from "@/features/profile/components/AccountDetails";
import OffersList from "@/features/profile/components/OffersList";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [active, setActive] = useState<"orders" | "addresses" | "account" | "offers">("orders");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/signin");
    }
  }, [loading, user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 flex justify-center pt-6 pb-10 px-4">
      <div className="flex flex-row w-full max-w-6xl gap-3 md:gap-6">
        <Sidebar active={active} setActive={setActive} />

        <main className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-8 h-fit">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {active === "orders" ? "My Orders" : active === "addresses" ? "Addresses" : active === "offers" ? "My Offers" : "Profile"}
          </h1>

          {active === "orders" ? <OrdersList /> : active === "addresses" ? <AddressList /> : active === "offers" ? <OffersList /> : <AccountDetails />}
        </main>
      </div>
    </div>
  );
}
