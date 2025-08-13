import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['fakestoreapi.com'],  // add the domain here
    },
};

export default withFlowbiteReact(nextConfig);