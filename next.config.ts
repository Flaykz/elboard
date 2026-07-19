import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.join(__dirname),
  },
  allowedDevOrigins: ["192.168.1.121", "192.168.1.0/24"],
};

export default nextConfig;
