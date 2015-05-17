module.exports = function(ShoppingCart) {

  ShoppingCart.findWithItems = function(userId, cb) {
    ShoppingCart.findOne({
      where: {
        userId: userId
      },
      include: {
        relation: 'items'
      }
    }, function (err, shoppingCart) {
      if (err) {
        return cb(err);
      }
      cb(null, shoppingCart);
    });
  };
  ShoppingCart.remoteMethod(
    'findWithItems', {
      accepts: {arg: 'userId', type: 'string'},
      returns: {root: true},
      http: {path: '/with-items', verb: 'get'}
    }
  );

};
