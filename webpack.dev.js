import path from "path";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(process.cwd(), "public"),
    },
    watchFiles: ["index.html", "src/**/*"],
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
