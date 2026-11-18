import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  compress: true,
  // The home page is the standalone landing in public/landing.html.
  // beforeFiles runs ahead of pages, so src/app/page.tsx is the fallback if this rewrite is removed.
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/landing.html" }], afterFiles: [], fallback: [] };
  },
  // The landing page's fonts never change under the same name (a new version gets a new file name),
  // so browsers may keep them for a year instead of asking again on every visit.
  async headers() {
    return [
      {
        source: "/fonts/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
