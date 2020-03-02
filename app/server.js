const express = require('express')
const routes = require('./controllers/routes.js')
const bodyParser = require('body-parser')

/**
 * Server
 * @Class
 */
class Server {
  constructor () {
    this.app = express()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.use(bodyParser.urlencoded({ 'extended': true }))
    this.app.use(bodyParser.json())
  }

  /**
   * routes
   */
  routes () {
    new routes.events.EventsCreate(this.app)
    new routes.events.EventsShow(this.app)
    new routes.events.EventsShowAll(this.app)
    new routes.events.EventsUpdate(this.app)
    new routes.events.EventsDelete(this.app) 

    new routes.surveys.SurveysCreate(this.app)
    new routes.surveys.SurveysShow(this.app)
    new routes.surveys.SurveysShowAll(this.app)
    new routes.surveys.SurveysUpdate(this.app)
    new routes.surveys.SurveysDelete(this.app) 

    new routes.groups.GroupsCreate(this.app)
    new routes.groups.GroupsShow(this.app)
    new routes.groups.GroupsShowAll(this.app)
    new routes.groups.GroupsUpdate(this.app)
    new routes.groups.GroupsDelete(this.app)

    new routes.users.UsersCreate(this.app)
    new routes.users.UsersShow(this.app)
    new routes.users.UsersShowAll(this.app)
    new routes.users.UsersUpdate(this.app)
    new routes.users.UsersDelete(this.app)

    this.app.use((req, res) => {
      res.status(404).json({
        'code': 404,
        'message': 'Not in API'
      })
    })
  }

  /**
   * run
   */
  run () {
    try {
      this.middleware()
      this.routes()
      this.app.listen(3000)
    } catch (err) {
      console.error(`[ERROR] Server -> ${err}`)
    }
  }
}

module.exports = Server
