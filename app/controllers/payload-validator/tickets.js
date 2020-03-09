const _ = require('node-validator')

module.exports = _.isObject()
  .withOptional('owner', _.isString())
  .withOptional('price', _.isString())
  .withOptional('event', _.isString())
  .withOptional('purchase_date', _.isString())
