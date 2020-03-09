const Group = require('../models/group.js')
const validator = require('node-validator')
const check = require('./payload-validator/groups.js')

/**
 * Groups
 * @class
 */
class Groups {
  constructor (app, connect) {
    this.app = app
    this.GroupModel = connect.model('Group', Group)

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
    this.app.post('/groups/create', validator.express(check), (req, res) => {
      try {
        const groupModel = new this.GroupModel(req.body)
        
        groupModel.save().then(group => {
          res.status(200).json(group || {})
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
    this.app.delete('/groups/delete/:id', (req, res) => {
      try {
        this.GroupModel.findOneAndDelete({_id: req.params.id})
          .then(group => {
            res.status(200).json(group || {})
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
    this.app.get('/groups/show/:id', (req, res) => {
      try {
        this.GroupModel.findOne({_id: req.params.id}).then(group => {
          res.status(200).json(group || {})
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
    this.app.put('/groups/update/:id', validator.express(check), (req, res) => {
      try {
        this.GroupModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, doc) => {
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
    this.app.get('/groups/list', (req, res) => {
      try {
        this.GroupModel.find({}, function (err, result) {
          if (err) {
            res.status(500).json({
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

module.exports = Groups
