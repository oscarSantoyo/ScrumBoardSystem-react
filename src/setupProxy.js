const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

module.exports = function (app) {
  app.use(
    "/apiprojects",
    createProxyMiddleware({
      target: process.env.REACT_APP_URL_API_PROJECTS,
      changeOrigin: true,
      pathRewrite: { "/apiprojects": "" },
    })
  );
  app.use(
    "/apiuserstories",
    createProxyMiddleware({
      target: process.env.REACT_APP_URL_API_USER_STORIES,
      changeOrigin: true,
      pathRewrite: { "/apiuserstories": "" },
    })
  );
};
