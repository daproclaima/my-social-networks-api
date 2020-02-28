const surveys = require('../../models/factory/mocks/surveys.js')

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
    this.app.get('/surveys/show/all', (req, res) => {
      try {
        res.status(200).json(surveys || {})
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
