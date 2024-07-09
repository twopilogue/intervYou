const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/community",
        destination: "/community/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
