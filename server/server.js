const express = require('express');
const ReactSSR = require('react-dom/server');
const path = require('path');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development';

const app = express();

if (!isDev) {
  const serverEntry = require('../dist/server-entry.js').default;
  const templateHtml = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8');
  app.use('/public', express.static(path.join(__dirname, '../dist')));
  app.get('*', function(req, res) {
    const appString = ReactSSR.renderToString(serverEntry);
    res.send(templateHtml.replace(`<!-- APP Build -->`, appString));
  });
} else {
  const devStatic = require('./util/dev-static.js');
  devStatic(app);
}

app.listen(3000, function() {
  console.log('server is listening 3000');
})