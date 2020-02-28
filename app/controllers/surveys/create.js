const surveys = require('../../models/surveys.js')

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
    this.app.post('/surveys/create', (req, res) => {
      try {
        surveys.push(req.body)
        res.status(200).json(surveys)
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
