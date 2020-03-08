const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

  avatar: {
    type: String,
    default: 'https://randomuser.me/api/portraits/'
  },
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  address: String,
  city: String,
  zip_code: String,
  country: String,
  groups: String
}, {
  collection: 'users',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
