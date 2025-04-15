import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    API_LINK: process.env.API_LINK,
  },
};

export default nextConfig;
