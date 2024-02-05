/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    taint:true,    
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
