const fakingoose = require('fakingoose')
const EventSchema = require('../models/event.js')
const eventFactory = fakingoose(EventSchema, {_id: { tostring: false }})

module.exports = [
  eventFactory.generate(),
  eventFactory.generate()
]
