const surveys = require('../../models/factory/mocks/surveys.js')

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
    this.app.put('/surveys/update/:id', (req, res) => {
      try {
        const { id } = req.params
        const { body } = req
        let survey = surveys.find(survey => parseInt(survey.id) === parseInt(id) ? survey : false)
        if (survey) {
          survey = body
          res.status(200).json(survey)
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
