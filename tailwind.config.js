/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode:false,
  theme: {
    extend: {
      colors: {
        white: "#C5C6C7",
        bgwhite: "#D6D6D6",
        blue: "#053576",
        liteBlue:'#eaf9ff',
        midBlue:'#007eff',
        btnBlue:'#0065ff',
        red: "#ff0000",
        yellow: "#ffcc00",
        gray1:"#17191c",
        darkslategray: {
          "100": "#444",
          "200": "#333",
        },
        gray: {
          "100": "rgba(0, 0, 0, 0.77)",
          "200": "rgba(255, 255, 255, 0.5)",
          "300": "rgba(0, 0, 0, 0.6)",
        },
        dimgray: {
          "100": "#666",
          "200": "#505050",
        },
        whitesmoke: "#f7f7f7",
        mistyrose: "rgba(252, 221, 207, 0.5)",
        cornflowerblue: "#2ea3f2",
        gainsboro: "#e6e6e6",
      },
      spacing: {},
      fontFamily: {
        "open-sans": "'Open Sans'",
        "cormorant-garamond": "'Cormorant Garamond'",
      },
      borderRadius: {
        "6xs": "7px",
        "15xl": "34px",
      },
    },
    fontSize: {
      sm: "14px",
      mini: "15px",
      "7xl": "26px",
      "2xl": "21px",
      "6xl": "25px",
      xl: "20px",
      lg: "18px",
      "3xl": "22px",
      "21xl": "40px",
      "5xl": "24px",
      "13xl": "32px",
      "smi-8": "12.8px",
      inherit: "inherit",
    },
    screens: {
      mq1826: {
        raw: "screen and (min-width: 1826px)",
      },
      mq1825: {
        raw: "screen and (max-width: 1825px)",
      },
      mq1250: {
        raw: "screen and (max-width: 1250px)",
      },
      mq925: {
        raw: "screen and (max-width: 925px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  backdropBlur: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
  }
};
