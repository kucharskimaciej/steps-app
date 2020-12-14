const BASE_COLORS = {
  "yellow-orange": "#ffbb44",
  "orange-peel": "#ff9900",
  sambuca: "#332211",
  "wood-bark": "#221100",
  "chateau-green": "#33AA66",
  eucalyptus: "#288751",
  "eastern-blue": "#1199BB",
  "surfie-green": "#116688",
  "tall-poppy": "#bb3322",
  "dark-tan": "#771111",
  cardinal: "#cc2233",
  gray: {
    100: "#fafafa",
    200: "#F4F5F7",
    300: "#EBECF0",
    400: "#E1E1E1",
    500: "#C1C7D0",
    600: "#97A0A3",
    700: "#505050"
  },
  blue: {
    darker: "#126eca",
    dark: "#157be3",
    base: "#1789fc",
    light: "#2e95fc",
    lighter: "#45a1fd"
  },
  green: {
    darker: "#298852",
    dark: "#2e995c",
    base: "#33aa66",
    light: "#47b375",
    lighter: "#5cbb85"
  },
  yellow: {
    darker: "#cc7a00",
    dark: "#e68a00",
    base: "#ff9900",
    light: "#ffa31a",
    lighter: "#ffad33"
  },
  red: {
    darker: "#96291b",
    dark: "#a82e1f",
    base: "#bb3322",
    light: "#c24738",
    lighter: "#c95c4e"
  }
};

module.exports = {
  purge: false,
  theme: {
    extend: {
      lineHeight: {
        "0": 0
      },
      maxHeight: {
        "80": "80%"
      }
    },
    colors: {
      ...BASE_COLORS,
      transparent: "transparent",
      white: "#fff",
      black: "#000"
    },
    fontFamily: {
      primary: ["Cabin", "sans-serif"],
      heading: ["Roboto Condensed", "sans-serif"]
    },
    fontSize: {
      "2xs": ".675rem",
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "5rem"
    },
    screens: {
      desktop: "75rem"
    }
  },
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled"
  ],
  plugins: []
};
