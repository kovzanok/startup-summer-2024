/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/discover/movie",
        destination: `${process.env.BASE_API_URL}/discover/movie?api_key=${process.env.API_KEY}`,
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
  },
};

export default nextConfig;
