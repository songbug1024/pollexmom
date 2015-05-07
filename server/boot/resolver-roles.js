module.exports = function(server) {
  var Role = server.models.Role;

  Role.registerResolver('admin', function(role, context, callback) {
    function reject() {
      process.nextTick(function() {
        callback(null, false);
      });
    }
    if (!context || !context.model || !context.modelId) {
      return reject();
    }

    var userId = context.getUserId();
    if (!userId) {
      return reject();
    }

    var modelClass = context.model;
    var modelId = context.modelId;

    callback(null, false);
  });

}
