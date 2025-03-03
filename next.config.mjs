/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.dummyjson.com"], // ✅ Allow external images from DummyJSON
  },
};

module.exports = nextConfig;
