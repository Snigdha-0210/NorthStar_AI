import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
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
