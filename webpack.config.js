const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const packageJson = require("./package.json");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const outputPath = isProduction ? "./dist" : "./dev";
  const projectName = packageJson.name || "main";
  const projectTitle = packageJson.title || projectName;
  const projectDescription = packageJson.description || projectName;
  return {
    entry: "./index.jsx",
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: `${projectName}.js`,
    },
    resolve: {
      extensions: ["", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-class-properties"],
            },
          },
        },
        {
          test: /\.css?$/,
          use: ["style-loader", "css-loader"],
          include: /node_modules/,
        },
        {
          test: /\.(png|j?g|svg|gif)?$/,
          use: "file-loader?name=./images/[name].[ext]",
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: isProduction,
            },
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "template.html",
        inject: true,
        templateParameters: {
          projectName: projectName,
          projectTitle: projectTitle,
          projectDescription: projectDescription,
        },
      }),
      new webpack.DefinePlugin({
        "process.env.TRAINING": JSON.stringify(!isProduction),
        "process.env.PROJECT_NAME": JSON.stringify(projectName),
        "process.env.PROJECT_TITLE": JSON.stringify(projectTitle),
        "process.env.PROJECT_DESCRIPTION": JSON.stringify(projectDescription),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "favicon.png",
            to: path.resolve(__dirname, outputPath),
            noErrorOnMissing: true,
          },
          {
            from: "logo.png",
            to: path.resolve(__dirname, outputPath),
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
  };
};
