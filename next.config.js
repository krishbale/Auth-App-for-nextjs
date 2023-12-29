/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverComponentsExternalPackages:['mongoose','bcrypt','jwt', 'cookie'],
    }
}

module.exports = nextConfig
