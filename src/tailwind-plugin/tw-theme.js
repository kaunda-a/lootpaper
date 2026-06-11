import plugin from "tailwindcss/plugin";

const colors = {
  primary: "#D76D77",
  dark: "#151515",
  light: "#f6f6f6",
  "lightmode-primary": "#D76D77",
  "lightmode-light": "#181818",
  "lightmode-dark": "#f7f7f7",
};

export default plugin.withOptions(() => {
  return function ({ addBase }) {
    addBase({
      ":root": {
        "--color-primary": "#D76D77",
        "--color-dark": "#151515",
        "--color-light": "#f6f6f6",
        "--color-lightmode-primary": "#D76D77",
        "--color-lightmode-light": "#181818",
        "--color-lightmode-dark": "#f7f7f7",
      },
    });
  };
});
