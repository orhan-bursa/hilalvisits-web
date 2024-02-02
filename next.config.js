/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "scontent.cdninstagram.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "scontent-sof1-2.cdninstagram.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "www.instagram.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
                port: "",
                pathname: "/**"
            }
        ]
    }
}

module.exports = nextConfig
