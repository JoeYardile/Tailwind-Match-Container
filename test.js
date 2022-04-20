const merge = require('lodash/merge');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const customPlugin = require('./index');

expect.extend({
  toMatchCss: cssMatcher,
});

function generatePluginCss(overrides) {
  const config = {
    theme: {
      screens: {
        sm: '640px',
        md: '760px',
      },
    },
    variants: {
      // Default variants for your plugin.
      matchContainer: ['responsive'],
    },
    corePlugins: false,
    plugins: [customPlugin],
  };

  return postcss(tailwindcss(merge(config, overrides)))
    .process('@tailwind utilities', {
      from: undefined,
    })
    .then(({ css }) => css);
}

test('utility classes are generated based off screens supported', () => {
  return generatePluginCss({}).then(css => {
    expect(css).toMatchCss(`
      @media (min-width: 640px) {
        .pl-match-container {
          padding-left: calc(((100vw - 640px) / 2))
        }
      }

      @media (min-width: 760px) {
        .pl-match-container {
          padding-left: calc(((100vw - 760px) / 2))
        }
      }

      @media (min-width: 640px) {
        .pr-match-container {
          padding-right: calc(((100vw - 640px) / 2))
        }
      }

      @media (min-width: 760px) {
        .pr-match-container {
          padding-right: calc(((100vw - 760px) / 2))
        }
      }

      @media (min-width: 640px) {
        .px-match-container {
          padding-left: calc(((100vw - 640px) / 2));
          padding-right: calc(((100vw - 640px) / 2))
        }
      }

      @media (min-width: 760px) {
        .px-match-container {
          padding-left: calc(((100vw - 760px) / 2));
          padding-right: calc(((100vw - 760px) / 2))
        }
      }
    `);
  });
});
