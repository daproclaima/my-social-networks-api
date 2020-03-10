const Ticketing = require('../models/ticketing.js')
const validator = require('node-validator')
const check = require('./payload-validator/ticketings.js')
const JWT = require('../jwt.js')
const jwt = new JWT()
/**
 * Ticketing 
 * @class
 */
class Ticketings {
  constructor (app, connect) {
    this.app = app
    this.TickModel = connect.model('Ticketing', Ticketing)

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
    this.app.post('/ticketings/create', validator.express(check), (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          const tickModel = new this.TickModel(req.body)
          
          tickModel.save().then(result => {
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
    this.app.delete('/ticketings/delete/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.TickModel.findOneAndDelete({_id: req.params.id})
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
    this.app.get('/ticketings/show/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.TickModel.findOne({_id: req.params.id}).then(result => {
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
    this.app.put('/ticketings/update/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.TickModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, doc) => {
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
    this.app.get('/ticketings/list', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.TickModel.find({}, function (err, result) {
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

module.exports = Ticketings
