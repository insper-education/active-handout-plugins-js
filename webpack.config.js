const path = require("path");
// Source: https://medium.com/age-of-awareness/setup-react-with-webpack-and-babel-5114a14a47e9

module.exports = {
  entry: path.join(__dirname, "src", "plugin-bundle.js"),
  output: {
    path: path.resolve(__dirname, "package"),
    filename: "plugin-bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "package"),
    },
    hot: false,
    liveReload: false,
    compress: false,
    port: 9000,
  },
  mode: "production",
  module: {
    rules: [
      // {
      //   test: /\.?(jsx|js|tsx|ts)$/,
      //   use: "ts-loader",
      //   exclude: /node_modules/,
      // },
      {
        test: /\.?(tsx|ts|jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat", // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
};
