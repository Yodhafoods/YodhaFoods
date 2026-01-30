"use client";

import { usePathname } from "next/navigation";
import ConsumerHeader from "./ConsumerHeader";
import BusinessHeader from "./BusinessHeader";

export default function Header() {
  const pathname = usePathname();
  const isBusinessRoute = pathname?.startsWith("/business");

  if (isBusinessRoute) {
    return <BusinessHeader />;
  }

  return <ConsumerHeader />;
}
