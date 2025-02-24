import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "api.microlink.io", // Microlink Image Preview
        ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
        ],
    },
};

export default nextConfig;
