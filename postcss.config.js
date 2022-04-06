const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");
const atimport = require("postcss-import");
const _ = require("lodash");

module.exports = {
  plugins: [
    atimport(),
    tailwindcss(),
    process.env.NODE_ENV === "production"
      ? purgecss({
          content: ["./src/**/*.vue"],
          whitelist: [
            /* buttons colors classes */
            ..._.flatten(
              ["blue", "green", "red", "yellow"].map((color) => {
                return [
                  `bg-${color}-base`,
                  `border-${color}-base`,
                  `hover:bg-${color}-light`,
                  `hover:border-${color}-light`,
                  `text-white`,
                  `active:shadow-inner`,
                  `focus:shadow`,
                  `bg-transparent`,
                  `text-${color}-base`,
                  `hover:text-${color}-light`,
                  `border-transparent`,
                  `hover:bg-gray-100`,
                ];
              })
            ),
            /* buttons spacing classes */
            ..."px-6 py-1 border text-sm".split(" "),
            ..."px-3 py-1 border text-sm".split(" "),
            ..."px-4 py-1 border text-2xs".split(" "),
            ..."px-2 py-1 border text-2xs".split(" "),
            ..."px-10 py-1 border-2 text-xl".split(" "),
            ..."px-4 py-1 border-2 text-xl".split(" "),
            "body",
            "html",
            "ready",
            "page-mode",
            "direction-vertical",
            "overflow-hidden",
          ],
          whitelistPatterns: [/^vue-recycle-scroller/],
          extractors: [
            {
              extractor: class TailwindExtractor {
                static extract(content) {
                  return content.match(/[A-z0-9-:\/]+/g) || [];
                }
              },
              extensions: ["vue"],
            },
          ],
        })
      : null,
  ],
};
