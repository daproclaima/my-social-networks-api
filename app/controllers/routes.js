const Events = require('./events.js')

const SurveysShow = require('./surveys/show.js')
const SurveysShowAll = require('./surveys/showAll.js')
const SurveysUpdate = require('./surveys/update.js')
const SurveysCreate = require('./surveys/create.js')
const SurveysDelete = require('./surveys/delete.js')

const GroupsShow = require('./groups/show.js')
const GroupsShowAll = require('./groups/showAll.js')
const GroupsUpdate = require('./groups/update.js')
const GroupsCreate = require('./groups/create.js')
const GroupsDelete = require('./groups/delete.js')

const UsersShow = require('./Users/show.js')
const UsersShowAll = require('./Users/showAll.js')
const UsersUpdate = require('./Users/update.js')
const UsersCreate = require('./Users/create.js')
const UsersDelete = require('./Users/delete.js')
module.exports = {
  Events,
  surveys: {
    SurveysCreate,
    SurveysShowAll,
    SurveysShow,
    SurveysUpdate,
    SurveysDelete
  },
  groups: {
    GroupsCreate,
    GroupsShowAll,
    GroupsShow,
    GroupsUpdate,
    GroupsDelete
  },
  users: {
    UsersCreate,
    UsersShowAll,
    UsersShow,
    UsersUpdate,
    UsersDelete
  }
}
