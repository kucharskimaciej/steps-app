module.exports = {
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
    },
  },
  chainWebpack: (config) => {
    config.optimization.minimizer("terser").tap((args) => {
      const { terserOptions } = args[0];
      terserOptions.keep_classnames = true;
      return args;
    });

    config.module
      .rule("vue")
      .use("vue-svg-inline-loader")
      .loader("vue-svg-inline-loader")
      .options({
        /* ... */
      });
  },
};
