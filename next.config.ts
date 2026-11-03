import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  compress: true,
  // The home page is the standalone landing in public/landing.html (canvas ribbon + scroll scenes).
  // beforeFiles runs ahead of pages, so src/app/page.tsx is the fallback if this rewrite is removed.
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/landing.html" }], afterFiles: [], fallback: [] };
  },
};

export default nextConfig;
