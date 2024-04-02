const express = require('express');
const fs = require('fs');
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const App = require('../build/App').default;

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/*', (req, res) => {
  const appMarkup = ReactDOMServer.renderToString(<App />);
  const indexFile = path.resolve(__dirname, '..', 'build', 'index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appMarkup}</div>`)
    );
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});