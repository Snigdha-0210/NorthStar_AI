import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard/execution',
        destination: '/dashboard/projects',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
