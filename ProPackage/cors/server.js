const express = require('express');
const path = require('path');
const fs = require('fs');
const serverRender = require('./render.js');

const serverEntry = require('../project/server-entry.js');
const templateHtml = fs.readFileSync(path.join(__dirname, '../project/server.ejs'), 'utf-8');

const app = express();

app.use('/public', express.static(path.join(__dirname, '../project')));
app.get('*', function(req, res, next) {
    serverRender(serverEntry, templateHtml, req, res).catch(next)
  });

app.listen(3001, function () {
    console.log('server is listening 3000');
})