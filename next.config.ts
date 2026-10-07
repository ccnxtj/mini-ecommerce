import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/categories", destination: "/", permanent: false }];
  },
};

export default nextConfig;
