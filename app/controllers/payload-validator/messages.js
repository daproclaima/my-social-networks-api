const _ = require('node-validator')

module.exports = _.isObject()

  .withOptional('content', _.isString())
  .withOptional('author', _.isString())
