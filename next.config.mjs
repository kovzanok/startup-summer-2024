/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/discover/movie",
        destination: `${process.env.BASE_API_URL}/discover/movie?api_key=${process.env.API_KEY}`,
      },
    ];
  },
};

export default nextConfig;
