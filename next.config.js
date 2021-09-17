const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const webpack = require("webpack");
const path = require("path");

const isProd = process.env.NODE_ENV === 'production'

module.exports = withPlugins([[withSass], [withImages], [withCSS]], {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
  assetPrefix: isProd ? 'https://unpkg.com/aos@2.3.1/dist/aos.css' : '',
  assetPrefix: isProd ? 'https://unpkg.com/aos@2.3.1/dist/aos.js' : '',
  assetPrefix: isProd ? 'https://kit.fontawesome.com/747940bb1c.js' : '',



}, 
{
  env: {
    server: 'http://ffd0-105-112-63-114.ngrok.io',
  },
});
