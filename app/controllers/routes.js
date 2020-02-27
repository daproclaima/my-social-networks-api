const EventsShow = require('./events/show.js')
const EventsShowAll = require('./events/showAll.js')
const EventsUpdate = require('./events/update.js')
const EventsCreate = require('./events/create.js')
const EventsDelete = require('./events/delete.js')
module.exports = {
  events: {
    EventsShow,
    EventsShowAll,
    EventsUpdate,
    EventsCreate,
    EventsDelete
  }
}
