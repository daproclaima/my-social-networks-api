const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  event: String,
  tickets: String,
  opening_date: String,
  closing_date: String,
  available_ticket_num: String

}, {
  collection: 'ticketings',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
