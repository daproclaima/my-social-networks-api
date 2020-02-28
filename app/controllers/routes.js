const EventsShow = require('./events/show.js')
const EventsShowAll = require('./events/showAll.js')
const EventsUpdate = require('./events/update.js')
const EventsCreate = require('./events/create.js')
const EventsDelete = require('./events/delete.js')

const SurveysShow = require('./surveys/show.js')
const SurveysShowAll = require('./surveys/showAll.js')
const SurveysUpdate = require('./surveys/update.js')
const SurveysCreate = require('./surveys/create.js')
const SurveysDelete = require('./surveys/delete.js')
module.exports = {
  events: {
    EventsShow,
    EventsShowAll,
    EventsUpdate,
    EventsCreate,
    EventsDelete
  },
  surveys: {
    SurveysShowAll,
    SurveysShow,
    SurveysUpdate,
    SurveysCreate,
    SurveysDelete
  }
}
