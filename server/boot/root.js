module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();

  router.get('/', server.loopback.status());

  router.get('/mall', function(req, res) {
    res.render('mall/index');
  });

  router.get('/chat', function(req, res) {
    res.render('chat/index');
  });
  server.use(router);
};
