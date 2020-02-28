const events = require('../../models/events.js')

/**
 * Show
 * @Class
 */
class ShowAll {
  constructor (app) {
    this.app = app
    this.run()
  }

  /**
   * middleWare
   */
  middleware () {
    this.app.get('/events/show/all', (req, res) => {
      try {
        res.status(200).json(events || {})
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

module.exports = ShowAll
