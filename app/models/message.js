const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  content: String,
  author: String

}, {
  collection: 'messages',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
