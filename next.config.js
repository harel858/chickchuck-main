/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    taint:true,    
  },  webpack: (config, { isServer }) => {
    // Add rule to handle HTML files
    config.module.rules.push({
      test: /\.html$/,
      use: 'html-loader'
    });

    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
/*   api: {
    bodyParser: false,
  }, */
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: {
    domains: [
      "imgixs3.imgix.net",
      "cdn.pixabay.com"
    ],
  },
};
