/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next");
module.exports =  withPlaiceholder({
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      
    ],
  },
  reactStrictMode: false,

  experimental: {
    appDir: true 
  },

  
});
