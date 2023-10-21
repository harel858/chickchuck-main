/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions:true,    
  },  
  images: {
    domains: [
      "imgixs3.imgix.net"
    ],
  },
};
