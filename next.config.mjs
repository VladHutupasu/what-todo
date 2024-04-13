/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/todos',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
