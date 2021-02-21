/* eslint-disable */
const compose = plugins => ({
  webpack(config, options) {
    return plugins.reduce((pluginConfig, plugin) => {
      if (plugin instanceof Array) {
        const [_plugin, ...args] = plugin
        plugin = _plugin(...args)
      }
      if (plugin instanceof Function) {
        plugin = plugin()
      }
      if (plugin && plugin.webpack instanceof Function) {
        return plugin.webpack(pluginConfig, options)
      }
      return pluginConfig
    }, config)
  },

  webpackDevMiddleware(config) {
    return plugins.reduce((pluginConfig, plugin) => {
      if (plugin instanceof Array) {
        const [_plugin, ...args] = plugin
        plugin = _plugin(...args)
      }
      if (plugin instanceof Function) {
        plugin = plugin()
      }
      if (plugin && plugin.webpackDevMiddleware instanceof Function) {
        return plugin.webpackDevMiddleware(pluginConfig)
      }
      return pluginConfig
    }, config)
  },
})

const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const fileLoader = require('file-loader')
const withOptimizedImages = require('next-optimized-images');


// where antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)



module.exports = withCss({
  ...withLess({
    // cssModules: true,
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make antd custom effective
    },

    rules: [
      {
        test: /\.less$/i,
        loader: "less-loader", // compiles Less to CSS
      },
    ],
    poweredByHeader: false,
    generateEtags: false,
    assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_ASSET_PREFIX : '',

    publicRuntimeConfig: {
      // Will be available on both server and client
      cookieAuthnBaseurl: process.env.NEXT_PUBLIC_COOKIE_AUTHN_URL || '/',
    },
    webpack: (config, { dev, isServer, defaultLoaders, webpack }) => {
      const prod = !dev;
      const origConfig = config;

      origConfig.node = {
        fs: 'empty',
      };

      // To load external antd styles
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...origConfig.externals];
        origConfig.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ];

        origConfig.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        });
      }
      origConfig.resolve.alias = {
        ...origConfig.resolve.alias,
        '@ant-design/icons$': path.resolve(path.join(__dirname, 'src/utils/antdIcons.ts')),
      };

      // For module resolution
      origConfig.resolve.alias['~'] = path.join(path.resolve(__dirname), 'src');
      origConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
      // Strips out tests
      origConfig.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
      origConfig.module.rules.push({
        test: /\.(png|svg|jpe?g|gif|woff2?|ttf|eot)$/, use: 'file-loader'
      }); origConfig.module.rules.push({
        test: /\.(png|svg|jpe?g|gif|woff2?|ttf|eot)$/, use: 'file-loader'
      });
      return origConfig;
    },
  })
})

module.exports = {
  env: {
    PUBLIC_URL: '/',
  }
};

/* eslint-enable */
