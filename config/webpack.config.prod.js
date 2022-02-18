const CopyPlugin = require("copy-webpack-plugin")
const config = require("./webpack.config")
const ZipperPlugin = require("./ZipperPlugin")
const path = require("path")

module.exports = {
  ...config,
  mode: "production",
  // add the zipper plugin to the list of plugins
  plugins: [
    ...config.plugins,
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          filter: async (filePath) => {
            const f = path.basename(filePath);
            return (f !== "index.html" && f !== ".dir-locals.el");
          }
        }
      ]
    }),
    new ZipperPlugin()
  ]
}
