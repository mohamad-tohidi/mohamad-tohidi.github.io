/** @type {import('next').NextConfig} */
const nextConfig = {
  // enable static HTML export
  output: "export",

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
