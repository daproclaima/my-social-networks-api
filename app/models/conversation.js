const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  messages: String,
  authors: String

}, {
  collection: 'conversations',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
