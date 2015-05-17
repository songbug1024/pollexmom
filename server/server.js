var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var chatServer = require('./chat-server');

var app = module.exports = loopback();

app.start = function() {
  var server = app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });

  chatServer(server);
};

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(loopback.static(path.resolve(__dirname, '../client')));

boot(app, __dirname, function(err) {
  if (err) throw err;

  if (require.main === module) {
    app.start();
  }
});
