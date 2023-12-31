/** @type {import('next').NextConfig} */
const nextConfig = {
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
