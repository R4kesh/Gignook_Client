/** @type {import('next').NextConfig} */
const nextConfig = {

    images:{
        domains:["lh3.googleusercontent.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'files.edgestore.dev',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'c7.alamy.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'gignook.s3.eu-north-1.amazonaws.com',
                pathname: '**',
            },
          ],
    },
    reactStrictMode:false
};

export default nextConfig;
