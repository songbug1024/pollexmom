module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();

  router.get('/', server.loopback.status());

  router.get('/wechat', function(req, res) {
    res.render('wechat/index');
  });
  server.use(router);
};
