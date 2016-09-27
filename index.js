/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

const express = require('express');
const morgan = require('morgan');
const stormpath = require('express-stormpath');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const path = require('path');
const bodyParser = require('body-parser');

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

app.post('/me', bodyParser.json(), stormpath.loginRequired, (req, res) => {
  function writeError(message) {
    res.status(400);
    res.json({
      message,
      status: 400,
    });
    res.end();
  }

  function saveAccount() {
    req.user.givenName = req.body.givenName;
    req.user.surname = req.body.surname;
    req.user.email = req.body.email;

    req.user.save((err) => {
      if (err) {
        writeError(err.userMessage || err.message);
        return;
      }
      res.end();
    });
  }

  if (req.body.password) {
    const application = req.app.get('stormpathApplication');

    application.authenticateAccount({
      username: req.user.username,
      password: req.body.existingPassword,
    }, (err) => {
      if (err) {
        writeError('The existing password that you entered was incorrect.');
        return;
      }

      req.user.password = req.body.password;
      saveAccount();
    });
  } else {
    saveAccount();
  }
});

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
