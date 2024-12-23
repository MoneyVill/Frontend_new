/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
	dest: "public",
	disable: process.env.NODE_ENV === "production",
})
  
  module.exports = withPWA({
	reactStrictMode: false,
	swcMinify: true,
	compiler: {
	  emotion: true,
	},
	images: {
	  domains: ["placehold.it", "placeimg.com", "d3bkfkkihwj5ql.cloudfront.net"],
	},

	async rewrites() {
	  console.log('Rewriting API calls...')
	  return [
		{
		  source: "/api/:path*",
		  destination: process.env.NODE_ENV === "production"
		  	? "https://moneyvill.xyz/api/:path*"
		  	: "http://localhost:8081/api/:path*"
		},
	  ];
	},
  
})

module.exports = {
	...module.exports,
	compilerOptions: {
		target: "es2015",
	},

	async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NODE_ENV === "production"
		  	? "https://moneyvill.xyz/api/:path*"
		  	: "http://localhost:8081/api/:path*"
      },
    ];
  },
  
}
  