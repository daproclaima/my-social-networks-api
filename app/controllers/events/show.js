const events = require('../../models/factory/mocks/events.js')

/**
 * Show
 * @Class
 */
class Show {
  constructor (app) {
    this.app = app
    this.run()
  }

  /**
   * middleWare
   */
  middleware () {
    this.app.get('/events/show/:id', (req, res) => {
      try {
        const { id } = req.params

        res.status(200).json(events.find(event => event.id === id || {}))
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

module.exports = Show
