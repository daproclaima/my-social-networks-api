const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  departure_location: String,
  arrival_location: String,
  driver: String,
  seat_numbers: Number,
  departure_hour: String,
  arrival_hour: String,
  passengers: String

}, {
  collection: 'carpoolings',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
