/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media2.dev.to",
        port: "",
      },
    ],
  },
};

export default nextConfig;
