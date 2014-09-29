module.exports = function(app) {
  app.use('/api/categories', require('./routes/categories'));
  app.use('/api/goods', require('./routes/goods'));
  app.use('/api/cart', require('./routes/cart'));
  app.use('/api/payment', require('./routes/payment'));
  app.use('/api/id', require('./routes/id'));
};
