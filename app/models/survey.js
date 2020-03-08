const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

  creator: String,
  title_question: String,
  answers: String,
  participants: String,
  participants_choices: String,
  parent_group: String
}, {
  collection: 'surveys',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
