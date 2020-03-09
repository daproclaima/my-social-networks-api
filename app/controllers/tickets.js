const Ticket = require('../models/ticket.js')
const validator = require('node-validator')
const check = require('./payload-validator/tickets.js')
const JWT = require('../jwt.js')
const jwt = new JWT()

/**
 * Tickets
 * @class
 */
class Tickets {
  constructor (app, connect) {
    this.app = app
    this.TickModel = connect.model('Ticket', Ticket)

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
    this.app.post('/tickets/create', validator.express(check), (req, res) => {
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
    this.app.delete('/tickets/delete/:id', (req, res) => {
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
    this.app.get('/tickets/show/:id', (req, res) => {
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
    this.app.put('/tickets/update/:id', validator.express(check), (req, res) => {
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
    this.app.get('/tickets/list', (req, res) => {
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

module.exports = Tickets
