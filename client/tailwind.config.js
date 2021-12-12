const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        warmGray: colors.warmGray,
        emerald: colors.emerald,
        violet: colors.violet,
        rose: colors.rose,
        teal: colors.teal,
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
