const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

module.exports = function(app) {
  app.use(
    '/apiprojects',
    createProxyMiddleware({
      target: 'http://localhost:8090',
      changeOrigin: true,
      pathRewrite:{'/apiprojects':''}
    })
  );
  app.use(
    '/apiuserstories',
    createProxyMiddleware({target:'http://localhost:8080',
    changeOrigin:true,
    pathRewrite:{'/apiuserstories':''}
  })
  );
};