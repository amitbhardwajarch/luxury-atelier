/** @type {import('next').Next.jsConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Also ignore eslint errors during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;