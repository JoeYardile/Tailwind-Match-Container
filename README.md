# Tailwind Match Container

> A tailwind plugin to allow you to add padding that matches the lines up with the existing container

Install the plugin from npm:

```
$ npm install tailwind-match-container
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  plugins: [
    // ...
    require('tailwind-match-container'),
    // ...
  ],
};
```

This plugin will generate following classes:

pr-match-container
pl-match-container
px-match-container

## License

Tailwind Match Container is licensed under the MIT License.

## Credits

Created with [create-tailwind-plugin](https://github.com/Landish/create-tailwind-plugin).
