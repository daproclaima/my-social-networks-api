const events = require('../../models/factory/mocks/events.js')

/**
 * Update
 * @Class
 */
class Update {
  constructor (app) {
    this.app = app
    this.run()
  }

  /**
   * middleWare
   */
  middleware () {
    this.app.put('/events/update/:id', (req, res) => {
      try {
        const { id } = req.params
        const { body } = req
        let event = events.find(event => parseInt(event.id) === parseInt(id) ? event : false)
        if (event) {
          event = body
          res.status(200).json(event)
        } else {
          return {}
        } 
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

module.exports = Update
