const _ = require('node-validator')

module.exports = _.isObject()
  .withOptional('messages', _.isString())
  .withOptional('authors', _.isString())
