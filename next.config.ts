import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // One-hop permanent redirects preserve existing bookmarks and search signals.
    return [
      { source: "/contact", destination: "/contact-trueprint", permanent: true },
      { source: "/categories", destination: "/custom-corporate-diaries", permanent: true },
      { source: "/categories/diaries", destination: "/custom-corporate-diaries", permanent: true },
      { source: "/categories/visiting-cards", destination: "/custom-visiting-cards", permanent: true },
      { source: "/categories/pens", destination: "/custom-branded-pens", permanent: true },
      { source: "/categories/joining-kits", destination: "/custom-employee-joining-kits", permanent: true },
      { source: "/categories/tech-products", destination: "/custom-corporate-tech-products", permanent: true },
      { source: "/categories/bags", destination: "/custom-corporate-bags", permanent: true },
      { source: "/categories/drinkware", destination: "/custom-corporate-drinkware", permanent: true },
      { source: "/categories/t-shirts", destination: "/custom-corporate-t-shirts", permanent: true },
    ];
  },
};

export default nextConfig;
