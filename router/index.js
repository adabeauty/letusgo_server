module.exports = function(app) {
  app.use('/api/categories', require('./routes/categories'));
  app.use('/api/goods', require('./routes/goods'));
  app.use('/api/boughtGoods', require('./routes/boughtGoods'));
};
