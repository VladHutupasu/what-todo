/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
