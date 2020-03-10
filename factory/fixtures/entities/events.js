const fakingoose = require('fakingoose');
const EventsSchema = require('../models/event.js');
const articleFactory = fakingoose(EventSchema, { _id: { tostring: false }});

module.exports = [
  eventFactory.generate(),
  eventFactory.generate()
];