const surveys = require('../../../factory/mocks/surveys.js')

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
    this.app.get('/surveys/show/:id', (req, res) => {
      try {
        const { id } = req.params

        res.status(200).json(surveys.find(survey => parseInt(survey.id) === parseInt(id)) || {})
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
