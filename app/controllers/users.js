const User = require('../models/user.js')
const validator = require('node-validator')
const check = require('./payload-validator/users.js')

/**
 * Users
 * @class
 */
class Users {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', User)

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
    this.app.post('/users/create', validator.express(check), (req, res) => {
      try {
        const userModel = new this.UserModel(req.body)
        
        userModel.save().then(result => {
          res.status(200).json(result || {})
        }).catch(err => {
          res.status(500).json({
            'code': 500,
            'message': err
          })
        })
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
    this.app.delete('/users/delete/:id', (req, res) => {
      try {
        this.UserModel.findOneAndDelete({_id: req.params.id})
          .then(result => {
            res.status(200).json(result || {})
          }).catch(err => {
            res.status(500).json({
              'code': 500,
              'message': err
            })
          })
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
    this.app.get('/users/show/:id', (req, res) => {
      try {
        this.UserModel.findOne({_id: req.params.id}).then(result => {
          res.status(200).json(result || {})
        }).catch(err => {
          res.status(500).json({
            'code': 500,
            'message': err
          })
        })
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
    this.app.put('/users/update/:id', validator.express(check), (req, res) => {
      try {
        this.UserModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, doc) => {
          if (err) {
            res.status(500).json({
              'code': 500,
              'message': err
            })
          } else {
            res.status(200).json(doc || {})
          }
        })
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
    this.app.get('/users/list', (req, res) => {
      try {
        this.UserModel.find({}, function (err, result) {
          if (err) {
            return res.status(500).json({
              'code': 500,
              'message': err
            })
          } else {
            res.status(200).json(result)
          }   
        })
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }
}

module.exports = Users
