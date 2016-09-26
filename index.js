/* eslint-disable no-console */

const express = require('express');
const morgan = require('morgan');
const stormpath = require('express-stormpath');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const path = require('path');

const config = require('./webpack.config');

const app = express();

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
});

app.use(middleware);
app.use(morgan('dev'));
app.use(stormpath.init(app, {
  web: {
    produces: ['application/json'],
  },
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.on('stormpath.ready', () => {
  app.listen(3000, 'localhost', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Connection to Stormpath successful 🙂');
  });
});
