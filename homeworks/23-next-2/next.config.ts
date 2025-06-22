import type { NextConfig } from 'next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['upload.wikimedia.org', 'flagcdn.com'],
  },
};

export default withFlowbiteReact(nextConfig);
