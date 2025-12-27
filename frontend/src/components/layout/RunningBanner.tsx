"use client";

import Link from "next/link";

type BannerMessage = {
  text: string;
  link: string;
};

type RunningBannerProps = {
  messages: BannerMessage[];
};

export default function RunningBanner({ messages }: RunningBannerProps) {
  return (
    <div className="banner-wrapper">
      <div className="banner-track">
        {[...messages, ...messages].map((msg, index) => (
          <Link key={index} href={msg.link} className="banner-item">
            {msg.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
