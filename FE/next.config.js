const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/users/login",
        has: [
          {
            type: "query",
            key: "code",
            value: "(?<code>.*)",
          },
        ],
        destination: "http://ec2-3-35-20-75.ap-northeast-2.compute.amazonaws.com:8080/api/users/login?code=:code",
      },
    ];
  },
};

module.exports = nextConfig;
