const Conversation = require('../models/conversation.js')
const validator = require('node-validator')
const check = require('./payload-validator/conversations.js')
const JWT = require('../jwt.js')
const jwt = new JWT()

/**
 * Conversations
 * @class
 */
class Conversations {
  constructor (app, connect) {
    this.app = app
    this.OModel = connect.model('Conversation', Conversation)

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
    this.app.post('/conversations/create', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          const oModel = new this.OModel(req.body)
          
          oModel.save().then(event => {
            res.status(200).json(event || {})
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
    this.app.delete('/conversations/delete/:id', (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.OModel.findOneAndDelete({_id: req.params.id})
            .then(event => {
              res.status(200).json(event || {})
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
    this.app.get('/conversations/show/:id', (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.OModel.findOne({_id: req.params.id}).then(event => {
            res.status(200).json(event || {})
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
    this.app.put('/conversations/update/:id', validator.express(check), (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.OModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, doc) => {
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
    this.app.get('/conversations/list', validator.express(check), async (req, res) => {
      try {
        if (jwt.getToken(req.body.token)) {
          this.OModel.find({}, function (err, result) {
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

module.exports = Conversations
