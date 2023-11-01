/** @type {import('tailwindcss').Config} */
export default {
	content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
	theme: {
		extend: {
			colors: {
				primary: {
					100: "#fff1cf",
					500: "#daa520",
				},
			},
			fontFamily: {
				inter: ["inter"],
				intermedium: ["intermedium"],
				intersemibold: ["intersemibold"],
				interbold: ["interbold"],
				interbolder: ["interbolder"],
			},
			screens: {
				xs: '375px',
				xsl: '455px'
			}
		},
	},
	plugins: [],
};

