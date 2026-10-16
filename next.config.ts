import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_START_TIME: Date.now().toString(),
  },
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "allwellhealthcare.com",
      },
      {
        protocol: "https",
        hostname: "allwell.co.th",
      },
    ],
  },
  async redirects() {
    return [{ source: "/categories", destination: "/", permanent: false }];
  },
};

export default nextConfig;
