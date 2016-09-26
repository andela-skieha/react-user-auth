/* eslint-disable no-console */

const express = require('express');
const morgan = require('morgan');
const stormpath = require('express-stormpath');

const app = express();

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
