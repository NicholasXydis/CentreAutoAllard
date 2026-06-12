import createNextIntlPlugin from 'next-intl/plugin';
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  experimental: {
    globalNotFound: true
  },
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

export default createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);
