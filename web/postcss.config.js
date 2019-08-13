const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");
const atimport = require("postcss-import");
module.exports = {
    plugins: [
        atimport(),
        tailwindcss("./tailwind.config.js"),
        autoprefixer({
            add: true,
            grid: true
        }),
        process.env.NODE_ENV === "production"? purgecss({
            content: ['./src/**/*.vue'],
            extractors: [
                {
                    extractor: class TailwindExtractor {
                        static extract(content) {
                            return content.match(/[A-z0-9-:\/]+/g) || [];
                        }
                    },
                    extensions: ['vue']
                }
            ]
        }) : null
    ]
};
