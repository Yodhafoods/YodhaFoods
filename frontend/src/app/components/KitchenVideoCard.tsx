"use client";

import { useRef, useEffect } from "react";

type KitchenVideo = {
  video: { url: string };
  productId: {
    _id: string;
    name: string;
    price: number;
  };
};

export default function KitchenVideoReel({ video }: { video: KitchenVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const product = video.productId;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const addToCart = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product._id,
            quantity: 1,
          }),
        }
      );

      if (!res.ok) throw new Error("Add to cart failed");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-full snap-start relative bg-black">
      <video
        ref={videoRef}
        src={video.video.url}
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient from-black/70 to-transparent text-white">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm">₹{product.price}</p>

        <button
          onClick={addToCart}
          className="mt-2 bg-green-600 px-4 py-2 rounded-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
