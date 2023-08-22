const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (config) => {
  require("react-app-rewire-postcss")(config, {
    plugins: (loader) => [
      require("postcss-rtl")({
        onlyDirection: "rtl",
      }),
    ],
  });
  if (process.env.NODE_ENV === "production") {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production"),
        },
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks,
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            passes: 2,
            toplevel: true,
            dead_code: true,
          },
          mangle: true,
          toplevel: false,
          keep_fnames: false,
          comments: false,
          output: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      })
    );
  }
  return config;
};
