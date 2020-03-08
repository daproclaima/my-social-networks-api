const Events = require('./events.js')
const Groups = require('./groups.js')
const Surveys = require('./surveys.js')
const Carpoolings = require('./carpoolings.js')
const Ticketings = require('./ticketings.js')
const Tickets = require('./tickets.js')

const UsersShow = require('./Users/show.js')
const UsersShowAll = require('./Users/showAll.js')
const UsersUpdate = require('./Users/update.js')
const UsersCreate = require('./Users/create.js')
const UsersDelete = require('./Users/delete.js')
module.exports = {
  Events,
  Groups,
  Surveys,
  Carpoolings,
  Ticketings,
  Tickets,
  users: {
    UsersCreate,
    UsersShowAll,
    UsersShow,
    UsersUpdate,
    UsersDelete
  }
}
