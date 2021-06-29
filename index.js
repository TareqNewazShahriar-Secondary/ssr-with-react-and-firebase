import * as functions from 'firebase-functions';
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './src/App';
import getFacts from './src/facts';
import * as express from 'express';
import fs from 'fs';

console.log(__dirname);

const indexHtml = fs.readFileSync(__dirname+'\\public\\index.html', {encoding: 'utf8'});

const app = express();
app.get('**', (req, res) => {
   getFacts().then(facts => {
      const appHtml = renderToString(<App facts={facts} />);
      res.set('Cache-Control', 'public, max-age:600, s-maxage:1200');
      const finalHtml = indexHtml.replace('<!--::APP::-->', html);
      res.send(appHtml);
   });
});
