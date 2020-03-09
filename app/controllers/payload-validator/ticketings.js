const _ = require('node-validator')

module.exports = _.isObject()
  .withOptional('event', _.isString())
  .withOptional('ticket_collection', _.isString())
  .withOptional('opening_date', _.isString())
  .withOptional('closing_date', _.isString())
  .withOptional('available_ticket_num', _.isString())
