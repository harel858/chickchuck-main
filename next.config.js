/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    taint:true,    
  },
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
