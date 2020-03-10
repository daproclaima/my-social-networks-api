const Survey = require('../models/survey.js')
const validator = require('node-validator')
const check = require('./payload-validator/surveys.js')
const JWT = require('../jwt.js')
const jwt = new JWT()

/**
 * Surveys
 * @class
 */
class Surveys {
  constructor (app, connect) {
    this.app = app
    this.SurveyModel = connect.model('Survey', Survey)

    this.create() 
    this.delete()
    this.show()
    this.update()
    this.list()
  }

  /**
   * Create
   */
  create () {
    this.app.post('/surveys/create', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          const surveyModel = new this.SurveyModel(req.body)
          
          surveyModel.save().then(survey => {
            res.status(200).json(survey || {})
          }).catch(err => {
            res.status(500).json({
              'code': 500,
              'message': err
            })
          })
        } else {
          res.status(401).json({
            'code': 401,
            'message': 'Access Denied' 
          })
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
   * Delete
   */
  delete () {
    this.app.delete('/surveys/delete/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.SurveyModel.findOneAndDelete({_id: req.params.id})
            .then(survey => {
              res.status(200).json(survey || {})
            }).catch(err => {
              res.status(500).json({
                'code': 500,
                'message': err
              })
            })
        } else {
          res.status(401).json({
            'code': 401,
            'message': 'Access Denied' 
          })
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
   * Show
   */
  show () {
    this.app.get('/surveys/show/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.SurveyModel.findOne({_id: req.params.id}).then(survey => {
            res.status(200).json(survey || {})
          }).catch(err => {
            res.status(500).json({
              'code': 500,
              'message': err
            })
          })
        } else {
          res.status(401).json({
            'code': 401,
            'message': 'Access Denied' 
          })
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
   * Update
   */
  update () {
    this.app.put('/surveys/update/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.SurveyModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, doc) => {
            if (err) {
              res.status(500).json({
                'code': 500,
                'message': err
              })
            } else {
              res.status(200).json(doc || {})
            }
          })
        } else {
          res.status(401).json({
            'code': 401,
            'message': 'Access Denied' 
          })
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
   * List all
   */
  list () {
    this.app.get('/surveys/list', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.SurveyModel.find({}, function (err, result) {
            if (err) {
              res.status(500).json({
                'code': 500,
                'message': err
              })
            } else {
              res.status(200).json(result)
            }   
          })
        } else {
          res.status(401).json({
            'code': 401,
            'message': 'Access Denied' 
          })
        }
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }
}

module.exports = Surveys
