import express from "express";
import cors from "cors";
import React from "react";
import compression from 'compression';
import serialize from "serialize-javascript";

import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";

import routes from "./routes";
import App from "./App";

const app = express();
app.use(compression())
app.use(cors());

app.get('*.js', (req, res, next) => {
    if (req.header('Accept-Encoding').includes('br')) {
      req.url = req.url + '.br';
      res.set('Content-Encoding', 'br');
      res.set('Content-Type', 'application/javascript; charset=UTF-8');
    }
    next();
  });
app.get('*.css', (req, res, next) => {
  if (req.header('Accept-Encoding').includes('br')) {
    req.url = req.url + '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'text/css; charset=UTF-8');
  }
  next();
});
app.use(express.static("public"));

app.get("*", (req, res, next) => {
    const activeRoute = routes.find(route => matchPath(req.url, route));
    try {
        const requestInitialData =
    activeRoute.requestInitialData && activeRoute.requestInitialData();
  
      Promise.resolve(requestInitialData)
        .then(initialData => {
          const context = { initialData };
          const markup = renderToString(
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          );
  
          res.send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>SSR</title>
              <script src="/bundle.js" defer></script>
              <link rel="stylesheet" type="text/css" href="css/style.css">
              <script>window.__initialData__ = ${serialize(initialData)}</script>
            </head>
  
            <body>
              <div id="root">${markup}</div>
            </body>
          </html>
          `);
        })
        .catch(next);  
    } catch (error) {
        //console.log(error)
    }
     
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on ::${PORT}`);
});
  