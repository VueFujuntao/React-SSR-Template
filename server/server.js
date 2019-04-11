const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const serverRender = require('./util/server-render');

const isDev = process.env.NODE_ENV === 'development';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react conde class'
}));

app.use(favicon(path.join(__dirname, '../favicon.ico')));

app.use('/api/user', require('./util/handle-login'));
app.use('/api', require('./util/proxy'));

if (!isDev) {
  const serverEntry = require('../dist/server-entry.js');
  const templateHtml = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf-8');
  app.use('/public', express.static(path.join(__dirname, '../dist')));
  app.get('*', function(req, res, next) {
    serverRender(serverEntry, templateHtml, req, res).catch(next)
  });
} else {
  const devStatic = require('./util/dev-static.js');
  devStatic(app);
}

app.use(function(error, req, res, next) {
  console.log(error);
  res.status(500).send(error);
})

app.listen(3000, function() {
  console.log('server is listening 3000');
})