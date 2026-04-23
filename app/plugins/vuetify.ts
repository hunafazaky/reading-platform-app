// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

import colors from "vuetify/util/colors";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            background: "#f2f2f2",
            dark: "#0b192c",
            fire: "#dc143c",
            dusk: "#ff6500",
            dawn: "#ffc55a",
            army: "#41a67e",
            navy: "#1055c9",
          },
        },
        dark: {
          colors: {
            background: "#0b192c",
            surface: "#0b192c",
            light: "#f2f2f2",
            fire: "#dc143c",
            dusk: "#ff6500",
            dawn: "#ffc55a",
            army: "#41a67e",
            navy: "#1055c9",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
