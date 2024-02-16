/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "warmChart": "#FFA25B",
                "coldChart": "#5B8CFF",
                "warmCardBG": "#FFFAF1",
                "coldCardBG": "#F1F2FF",
                "coldStatCol": "#459DE9",
                "dropDownElCol": "#F2F2F2",
                "secTextCol": "#C5C5C5",
                "inActiveTempCol": "#8D8D8D",
                "chartGradientCol": "#FFF4F4",
                "shadowEfCol": "#00000029"
            },
            fontFamily: {
                "jost": ['"Jost"', 'sans-serif']
            },
            fontWeight: {
                'light': 300,
                'normal': 400,
                'semibold': 600
            }
        },
    },
    plugins: [],
}
