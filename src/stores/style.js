import { defineStore } from "pinia";
import * as styles from "@/styles";
import { darkModeKey, styleKey } from "@/config";

export const useStyleStore = defineStore("style", {
  state: () => ({
    /* Styles */
    asideStyle: "bg-gray-800",
    asideScrollbarsStyle: "aside-scrollbars-gray",
    asideBrandStyle: "bg-gray-900 text-white",
    asideMenuItemStyle: "text-gray-300 hover:text-white",
    asideMenuItemActiveStyle: "font-bold text-white",
    asideMenuDropdownStyle: "bg-gray-700/50",
    navBarItemLabelStyle: "text-black",
    navBarItemLabelHoverStyle: "hover:text-blue-500",
    navBarItemLabelActiveColorStyle: "text-blue-600",
    overlayStyle: "from-gray-700 via-gray-900 to-gray-700",

    /* Dark mode */
    darkMode: true,
  }),
  actions: {
    setStyle(payload) {
      if (!styles[payload]) {
        return;
      }

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(styleKey, payload);
      }

      const style = styles[payload];

      for (const key in style) {
        this[`${key}Style`] = style[key];
      }
    },

    setDarkMode(payload = null) {
      this.darkMode = payload !== null ? payload : !this.darkMode;

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(darkModeKey, this.darkMode ? "1" : "0");
      }

      if (typeof document !== "undefined") {
        document.body.classList[this.darkMode ? "add" : "remove"](
          "dark-scrollbars"
        );

        document.documentElement.classList[this.darkMode ? "add" : "remove"](
          "dark-scrollbars-compat"
        );
      }
    },
  },
});
