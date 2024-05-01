/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/discover/movie",
        destination: `${process.env.BASE_API_URL}/discover/movie?api_key=${process.env.API_KEY}&language=en-US`,
      },
      {
        source: "/genre/movie/list",
        destination: `${process.env.BASE_API_URL}/genre/movie/list?api_key=${process.env.API_KEY}`,
      },
      {
        source: "/movie/:movieId",
        destination: `${process.env.BASE_API_URL}/movie/:movieId?api_key=${process.env.API_KEY}&append_to_response=videos`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
export default nextConfig;
