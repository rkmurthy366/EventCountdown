module.exports = {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        webpackConfig.entry = {
          main: [
            env === 'development' &&
            require.resolve('react-dev-utils/webpackHotDevClient'),
            paths.appIndexJs,
          ].filter(Boolean),
        };
  
        webpackConfig.output = {
          ...webpackConfig.output,
          filename: 'static/js/[name].js',
        };
  
        return webpackConfig;
      },
    },
  };
  