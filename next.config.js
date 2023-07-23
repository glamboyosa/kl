/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://oaidalleapiprodscus.blob.core.windows.net",
      },
    ],
  },
};

module.exports = nextConfig;
