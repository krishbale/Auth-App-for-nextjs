/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'img.icons8.com',
          },
          {
            hostname:   'picsum.photos',
          },
        
        ],
      },
    experimental:{
        serverComponentsExternalPackages:['mongoose','bcrypt','jwt', 'cookie'],
    },
    webpack: (config) => {
        config.resolve.fallback = {
          "mongodb-client-encryption": false ,
          "aws4": false
        };
    
        return config;
    }
}

module.exports = nextConfig
