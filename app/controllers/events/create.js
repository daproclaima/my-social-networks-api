const Event = require('../../models/event.js')

/**
 * Create
 * @Class
 */
class Create {
  constructor (app, connect) {
    this.app = app
    this.EventModel = connect.model('Event', Event)
    this.run()
  }

  /**
   * middleWare
   */
  middleware () {
    this.app.post('/events/create', (req, res) => {
      try {
        const eventModel = new this.EventModel(req.body)
        
        eventModel.save().then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            'code': 500,
            'message': err
          })
        })
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
