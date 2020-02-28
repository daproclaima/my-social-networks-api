const events = require('../../models/events.js')

/**
 * Create
 * @Class
 */
class Create {
  constructor (app, connect) {
    this.app = app
    this.run()
  }

  /**
   * middleWare
   */
  middleware () {
    this.app.post('/events/create', (req, res) => {
      try {
        events.push(req.body)
        res.status(200).json(events)
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }

  /**
   * Run
   */
  run () {
    this.middleware()
  }
}

module.exports = Create
