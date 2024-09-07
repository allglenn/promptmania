import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        domains: ['localhost'],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };


        return config;
    },
};

export default nextConfig;