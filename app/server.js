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
    new routes.Surveys(this.app, this.connect) 
    new routes.Carpoolings(this.app, this.connect)
    new routes.Ticketings(this.app, this.connect)
    new routes.Tickets(this.app, this.connect)
    new routes.Messages(this.app, this.connect)
    new routes.Users(this.app, this.connect)

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
