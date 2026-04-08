/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true
  },
  reactCompiler: true,
};

export default nextConfig;
