const Carpooling = require('../models/carpooling.js')
const validator = require('node-validator')
const check = require('./payload-validator/carpoolings.js')
const JWT = require('../jwt.js')
const jwt = new JWT()

/**
 * Carpoolings
 * @class
 */
class Carpoolings {
  constructor (app, connect) {
    this.app = app
    this.CarpModel = connect.model('Carpooling', Carpooling)

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
    this.app.post('/carpoolings/create', validator.express(check), (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          const carpModel = new this.CarpModel(req.body)
          
          carpModel.save().then(result => {
            res.status(200).json(result || {})
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
    this.app.delete('/carpoolings/delete/:id', (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.CarpModel.findOneAndDelete({_id: req.params.id})
            .then(result => {
              res.status(200).json(result || {})
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
    this.app.get('/carpoolings/show/:id', (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.CarpModel.findOne({_id: req.params.id}).then(result => {
            res.status(200).json(result || {})
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
    this.app.put('/carpoolings/update/:id', validator.express(check), (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.CarpModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, doc) => {
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
    this.app.get('/carpoolings/list', (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.CarpModel.find({}, function (err, result) {
            if (err) {
              return res.status(500).json({
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

module.exports = Carpoolings
