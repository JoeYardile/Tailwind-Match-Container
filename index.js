const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  function ({ addUtilities, theme }) {
    const screens = theme('screens');
    const padding = theme('container.padding');

    const utilities = {
      '.pl-match-container': {
        'padding-left': padding,
      },
      '.pr-match-container': {
        'padding-right': padding,
      },
      '.px-match-container': {
        'padding-left': padding,
        'padding-right': padding,
      },
    };

    Object.entries(screens).forEach(([key, screen]) => {
      let screenPadding;

      if (padding) {
        screenPadding = `calc(((100vw - ${screen}) / 2) + ${padding})`;
      } else {
        screenPadding = `calc(((100vw - ${screen}) / 2))`;
      }

      utilities['.pl-match-container'][`@screen ${key}`] = {
        'padding-left': screenPadding,
      };

      utilities['.pr-match-container'][`@screen ${key}`] = {
        'padding-right': screenPadding,
      };

      utilities['.px-match-container'][`@screen ${key}`] = {
        'padding-left': screenPadding,
        'padding-right': screenPadding,
      };
    });

    addUtilities(utilities);
  },
  {
    variants: {
      matchContainer: ['responsive'],
    },
  }
);
