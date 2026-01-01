"use client";

import Link from "next/link";
import Image from "next/image";
import SigninForm from "@/features/auth/components/SigninForm";

export default function SigninClient() {

  return (
    <div className="flex min-h-screen w-full bg-gray-50 px-4 py-6 lg:px-10 lg:pt-2 lg:pb-10 flex-col-reverse lg:flex-row gap-6 lg:gap-0">
      {/* Left Side - Mascot & Promo */}
      <div className="flex w-full lg:w-1/2 bg-linear-to-b from-orange-600 to-orange-400 items-center justify-center relative overflow-hidden rounded-[3rem] p-8 lg:p-12 min-h-[500px] lg:min-h-auto">
        <div className="relative z-10 text-center max-w-lg">
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Rooted in Legacy - Guided by Tradition.
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Discover nutritious and natural superfood powders. <br />Good health starts with good choices.
          </p>
          <div className="relative mx-auto w-80 h-80">
            {/* Mascot Image */}
            <Image
              src="/assets/images/mascot/1.png"
              alt="Yodha Foods Mascot"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Background decorative circles/blobs if needed, for now plain orange is clean as per ref mostly */}
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <SigninForm />
        </div>
      </div>
    </div>
  );
}
