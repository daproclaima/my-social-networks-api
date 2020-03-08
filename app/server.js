const express = require('express')
const routes = require('./controllers/routes.js')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

/**
 * Server
 * @Class
 */
class Server {
  constructor () {
    this.app = express()
  }

  dbConnect () {
    const host = 'mongodb://localhost:27017/my-social-network-api'
    const connect = mongoose.createConnection(host)

    connect.on('error', (err) => {
      setTimeout(() => {
        console.log('[ERROR] api dbConnect() -> mongodb error')
        this.connect = this.dbConnect(host)
      }, 5000)

      console.error(`[ERROR] api dbConnect() -> ${err}`)
    })

    connect.on('disconnected', () => {
      setTimeout(() => {
        console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected')
        this.connect = this.dbConnect(host)
      }, 5000) 
    })

    process.on('SIGINT', () => {
      connect.close(() => {
        console.log('[API END PROCESS] api dbConnect() -> close mongodb connection ')
        process.exit(0)
      })
    })

    return connect
  }

  /**
   * middleware
   */
  middleware () {
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({ 'extended': true }))
    this.app.use(bodyParser.json())
  }

  /**
   * routes
   */
  routes () {
    new routes.Events(this.app, this.connect)
    new routes.Groups(this.app, this.connect)

    new routes.surveys.SurveysCreate(this.app)
    new routes.surveys.SurveysShow(this.app)
    new routes.surveys.SurveysShowAll(this.app)
    new routes.surveys.SurveysUpdate(this.app)
    new routes.surveys.SurveysDelete(this.app) 

    new routes.users.UsersCreate(this.app)
    new routes.users.UsersShow(this.app)
    new routes.users.UsersShowAll(this.app)
    new routes.users.UsersUpdate(this.app)
    new routes.users.UsersDelete(this.app)

    this.app.use((req, res) => {
      res.status(404).json({
        'code': 404,
        'message': 'Not found in API'
      })
    })
  }

  /**
   * run
   */
  run () {
    try {
      this.connect = this.dbConnect()
      this.dbConnect()
      this.middleware()
      this.routes()
      this.app.listen(3000)
    } catch (err) {
      console.error(`[ERROR] Server -> ${err}`)
    }
  }
}

module.exports = Server
