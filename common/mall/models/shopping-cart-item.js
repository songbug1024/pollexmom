module.exports = function(ShoppingCartItem) {

  ShoppingCartItem.addOne = function(userId, cb) {
    ShoppingCartItem.findOne({where: {userId: userId}}, {
      include: [{
        relation: 'items'
      }]
    }, function (err, shoppingCart) {
      if (err) {
        return cb(err);
      }
      cb(null, shoppingCart);
    });
  };
  ShoppingCartItem.remoteMethod(
    'addOne', {
      accepts: {arg: 'userId', type: 'string'},
      returns: {root: true},
      http: {path: '/with-items', verb: 'get'}
    }
  );


};
