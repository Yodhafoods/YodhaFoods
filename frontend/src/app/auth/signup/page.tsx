import { Metadata } from "next";
import SignupClient from "./signup-client";

export const metadata: Metadata = {
  title: "Sign Up | Yodha Foods",
  description: "Create your Yodha Foods account today. Join our community and start your journey towards better health with natural superfood powders.",
};

export default function SignupPage() {
  return <SignupClient />;
}
