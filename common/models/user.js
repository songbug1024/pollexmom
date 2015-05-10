module.exports = function(User) {

  User.personalInfo = function(id, cb) {
    User.findById(id, {
      fields: {
        status: 0
      },
      include: [{
        relation: 'personalInfo'
      }]
    }, function (err, user) {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  };
  User.remoteMethod(
    'personalInfo', {
      accepts: {arg: 'id', type: 'string'},
      returns: {root: true},
      http: {path: '/personal-info', verb: 'get'}
    }
  );

};
