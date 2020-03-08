const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  owner: String,
  price: String,
  event: String,
  purchase_date: String

}, {
  collection: 'tickets',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
