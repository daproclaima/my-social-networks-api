const Message = require('../models/message.js')
const validator = require('node-validator')
const check = require('./payload-validator/messages.js')
const JWT = require('../jwt.js')
const jwt = new JWT()

/**
 * Messages
 * @class
 */
class Messages {
  constructor (app, connect) {
    this.app = app
    this.MsgModel = connect.model('Message', Message)

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
    this.app.post('/messages/create', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          const msgModel = new this.MsgModel(req.body)
          
          msgModel.save().then(result => {
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
    this.app.delete('/messages/delete/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.MsgModel.findOneAndDelete({_id: req.params.id})
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
    this.app.get('/messages/show/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.MsgModel.findOne({_id: req.params.id}).then(result => {
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
    this.app.put('/messages/update/:id', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.MsgModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, doc) => {
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
    this.app.get('/messages/list', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.MsgModel.find({}, function (err, result) {
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

module.exports = Messages
