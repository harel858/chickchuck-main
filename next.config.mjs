import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optional: Uncomment if needed for raw request handling
  // api: {
  //   bodyParser: false,
  // },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: [
      "imgixs3.imgix.net",
      "cdn.pixabay.com",
    ],
  },
  swcMinify: true,
  webpack: (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      crypto: false,
      child_process: false, // Add this line
    };
    config.module.rules.push({
      test: /\.html$/,
      use: "ignore-loader",
    });
  }
  return config;
},
};

export default withNextIntl(nextConfig);
