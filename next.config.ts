import type { NextConfig } from "next";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
    /* config options here */
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination:
                    `${BASE_URL}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
