
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "https" as const,
                hostname: "tripay.co.id",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;