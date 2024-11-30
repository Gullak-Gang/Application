/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
