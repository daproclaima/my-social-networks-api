const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

  name: String,
  description: String,
  cover_picture: {
    type: String,
    default: 'https://randomuser.me/api/portraits/'
  },
  icone_picture: {
    type: String,
    default: 'https://randomuser.me/api/portraits/'
  },
  privacy: String,
  grant_publish: String,
  grant_create_event: String,
  managers: String,
  members: String,
  events: String
}, {
  collection: 'groups',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
