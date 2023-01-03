// @ts-check
/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  // Note: This experimental feature is required to use NextJS Image in SSG mode.
  // See https://nextjs.org/docs/messages/export-image-api for different workarounds.
  images: {
    loader: "custom",
    loaderFile: "./src/utils/image/Loader.ts",
    // unoptimized: true,
  },
};
export default config;
