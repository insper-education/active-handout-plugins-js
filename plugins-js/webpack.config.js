const path = require("path");
// Source: https://medium.com/age-of-awareness/setup-react-with-webpack-and-babel-5114a14a47e9

module.exports = {
  entry: path.join(__dirname, "src", "plugin-bundle.js"),
  output: {
    path: path.resolve(__dirname, "..", "content", "js"),
    filename: "plugin-bundle.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.?(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat", // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
};
