const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  name: String,
  description: String,
  start_date: String,
  end_date: String,
  location: String, 
  cover_picture: {
    type: String,
    default: 'https://randomuser.me/api/portraits/'
  },
  privacy: String,
  managers: String,
  members: String
}, {
  collection: 'events',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
