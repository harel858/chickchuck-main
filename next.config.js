/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    taint:true,    
  },  
  images: {
    domains: [
      "imgixs3.imgix.net"
    ],
  },
};
