const express = require('express');
const ReactSSR = require('react-dom/server');
const path = require('path');
const fs = require('fs');
const serverEntry = require('../dist/server-entry.js').default;

const templateHtml = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
const app = express();

app.use('/public', express.static(path.join(__dirname, '../dist')));

app.get('*', function(req, res) {
  const appString = ReactSSR.renderToString(serverEntry);
  res.send(templateHtml.replace(`<!-- APP -->`, appString));
});

app.listen(3000, function() {
  console.log('server is listening 3000');
})