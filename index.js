/* eslint-disable no-console */

const express = require('express');
const morgan = require('morgan');
const stormpath = require('express-stormpath');
const webpack = require('webpack');
const config = require('./webpack.config');

const app = express();

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler), {
  noInfo: true,
  publicPath: config.output.publicPath,
});

app.use(morgan('dev'));
app.use(stormpath.init(app, {
  web: {
    produces: ['application/json'],
  },
}));

app.on('stormpath.ready', () => {
  app.listen(3000, 'localhost', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Connection to Stormpath successful 🙂');
  });
});
