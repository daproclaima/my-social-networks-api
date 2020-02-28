const surveys = require('../../models/surveys.js')
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
   * middleWare
   */
  middleware () {
    this.app.delete('/surveys/delete/:id', (req, res) => {
      try {
        const { id } = req.params
        surveys.filter(survey => survey.id === id || false)
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

module.exports = Delete