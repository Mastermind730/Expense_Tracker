/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "res.cloudinary.com",
        "avatars.githubusercontent.com",
        "lh3.googleusercontent.com",
        "images.unsplash.com"
      ]
    },
    // experimental: {
    //   swcPlugins: [
    //     ["next-superjson-plugin", {}]
    //   ]
    // }
  };
  
  export default nextConfig;