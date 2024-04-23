import withPWA from 'next-pwa';
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  reactStrictMode: false,
  swcMinify: true, // Enable SWC minification for improved performance
  redirects: async () => {
    return [
      {
        source: '/todo-list',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

const nextConfig = withPWA({
  dest: 'public',
  register: true, // Register the PWA service worker
  disable: !isProduction,
})(config);

export default nextConfig;
