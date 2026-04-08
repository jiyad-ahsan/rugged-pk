/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xvaduxstjxwkxwvudrqv.supabase.co",
      },
    ],
    minimumCacheTTL: 2592000, // 30 days
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["next-mdx-remote", "remark-gfm", "@auth/prisma-adapter"],
  },
};

module.exports = nextConfig;
