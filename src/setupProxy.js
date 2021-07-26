const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/api",
    proxy({
      target: "http://liwachapi.herokuapp.com",
      changeOrigin: true
    })
  );
};