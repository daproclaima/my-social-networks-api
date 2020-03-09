const _ = require('node-validator')

module.exports = _.isObject()
  .withOptional('creator', _.isString())
  .withOptional('title', _.isString())
  .withOptional('answers', _.isString())
  .withOptional('participants', _.isString())
  .withOptional('participants_choices', _.isString())
  .withOptional('parent_group', _.isString())
