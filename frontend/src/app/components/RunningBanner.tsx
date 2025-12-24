"use client";

type RunningBannerProps = {
  messages: string[];
};

export default function RunningBanner({ messages }: RunningBannerProps) {
  return (
    <div className="banner-wrapper">
      <div className="banner-track">
        {[...messages, ...messages].map((msg, index) => (
          <span key={index} className="banner-item">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
