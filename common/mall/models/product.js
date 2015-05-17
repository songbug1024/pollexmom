module.exports = function(Product) {

  Product.detail = function(id, cb) {
    Product.findById(id, {
      fields: {
        status: 0
      },
      include: [{
        relation: 'specifications',
        scope: {
          fields: ['id', 'name', 'price', 'referencePrice', 'unit', 'inventoryCount', 'saleCount', 'transportationCost']
        }
      }]
    }, function (err, product) {
      if (err) {
        return cb(err);
      }
      cb(null, product);
    });
  };
  Product.remoteMethod(
    'detail', {
      accepts: {arg: 'id', type: 'string'},
      returns: {root: true},
      http: {verb: 'get'}
    }
  );

};
