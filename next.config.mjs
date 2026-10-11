import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/work/automate-design-handovers-with-a-figma-to-code-pipeline",
        destination: "/work/gemitech-ecommerce-design",
        permanent: true,
      },
      {
        source: "/work/helloride",
        destination: "/work/yatrafirst-bus-booking-app",
        permanent: true,
      },
      {
        source: "/work/novagrow-brand-identity",
        destination: "/work/solas-health-website-design",
        permanent: true,
      },
    ];
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  // This app relies on API routes and server/runtime features,
  // so static HTML export is not compatible.
};

export default withMDX(nextConfig);
