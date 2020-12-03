const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  webpack: function (config) {
    // The default webpack configuration from `Create React App` can be used
    // if the app is not built as a chrome extension with `npm run build:extension`.
    if (process.env.REACT_APP_BUILD_TARGET !== "extension") {
      return config;
    }
    // The webpack configuration will be updated
    // for the production build of the extension.
    else {
      // Disable bundle splitting,
      // a single bundle file has to loaded as `content_script`.
      config.optimization.splitChunks = {
        cacheGroups: {
          default: false,
        },
      };

      // `false`: each entry chunk embeds runtime.
      // The extension is built with a single entry including all JS.
      // https://symfonycasts.com/screencast/webpack-encore/single-runtime-chunk
      config.optimization.runtimeChunk = false;

      // The name of the extension bundle must not include `[contenthash]`,
      // so it can be referenced in `manifest.json` as `content_script`.
      config.output.filename = "main.js";

      // `MiniCssExtractPlugin` is used by the default CRA webpack configuration for
      // extracting CSS into separate files. The plugin has to be removed because it
      // uses `[contenthash]` in filenames of the separate CSS files.
      config.plugins = config.plugins
        .filter((plugin) => !(plugin instanceof MiniCssExtractPlugin))
        .concat(
          // `MiniCssExtractPlugin` is used with its default config instead,
          // which doesn't contain `[contenthash]`.
          new MiniCssExtractPlugin()
        );

      return config;
    }
  },
};
