import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  images: {
    domains: ["scarlet-holy-guanaco-709.mypinata.cloud"],
    
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default withPlaiceholder(nextConfig);
