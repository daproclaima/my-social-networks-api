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
    new routes.events.EventsShow(this.app)
    new routes.events.EventsShowAll(this.app)
    new routes.events.EventsUpdate(this.app)
    new routes.events.EventsCreate(this.app)
    new routes.events.EventsDelete(this.app) 
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
