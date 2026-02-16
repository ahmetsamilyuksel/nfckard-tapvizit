/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Prisma requires this for serverless/edge
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  // Disable ESLint during build (linting happens in CI)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
