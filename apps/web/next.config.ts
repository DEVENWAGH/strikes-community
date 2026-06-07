import type { NextConfig } from "next";

// Python decentralized backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const nextConfig: NextConfig = {
    /* config options here */
    output: "standalone",
    reactCompiler: true,
    transpilePackages: ["@repo/db", "@repo/kafka", "@repo/redis"],

    images: {
        remotePatterns: [
            { hostname: "uploadthing.com" },
            { hostname: "z4hrk2n1pd.ufs.sh" },
        ],
    },

    // Proxy API routes to the Python decentralized backend
    async rewrites() {
        return [
            // Chat messages (channel messages)
            {
                source: "/api/messages/:path*",
                destination: `${BACKEND_URL}/api/messages/:path*`,
            },
            // Direct messages
            {
                source: "/api/direct-messages/:path*",
                destination: `${BACKEND_URL}/api/direct-messages/:path*`,
            },
            // Server management
            {
                source: "/api/servers/:path*",
                destination: `${BACKEND_URL}/api/servers/:path*`,
            },
            // Channel management
            {
                source: "/api/channels/:path*",
                destination: `${BACKEND_URL}/api/channels/:path*`,
            },
            // Member management
            {
                source: "/api/members/:path*",
                destination: `${BACKEND_URL}/api/members/:path*`,
            },
            // Conversations (DM creation)
            {
                source: "/api/conversations",
                destination: `${BACKEND_URL}/api/conversations`,
            },
            // Profile
            {
                source: "/api/profile/:path*",
                destination: `${BACKEND_URL}/api/profile/:path*`,
            },
            // Blockchain status
            {
                source: "/api/blockchain/:path*",
                destination: `${BACKEND_URL}/api/blockchain/:path*`,
            },
        ];
    },
};

export default nextConfig;
