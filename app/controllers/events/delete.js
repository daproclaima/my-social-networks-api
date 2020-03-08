const events = require('../../models/event.js')

/**
 * Delete
 * @Class
 */
class Delete {
  constructor (app) {
    this.app = app
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.delete('/events/delete/:id', (req, res) => {
      try {
        const { id } = req.params
        res.status(200).json(events.findOneAndDelete({'_id': id}))
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

module.exports = Delete
