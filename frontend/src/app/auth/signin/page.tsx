import { Metadata } from "next";
import SigninClient from "./signin-client";

export const metadata: Metadata = {
  title: "Sign In | Yodha Foods",
  description: "Sign in to your Yodha Foods account to manage your orders, addresses, and profile. Access your personalized health journey.",
};

export default function SigninPage() {
  return <SigninClient />;
}
