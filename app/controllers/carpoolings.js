const Carpooling = require('../models/carpooling.js')

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
    this.app.post('/carpoolings/create', (req, res) => {
      try {
        const carpModel = new this.CarpModel(req.body)
        
        carpModel.save().then(result => {
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
    this.app.delete('/carpoolings/delete/:id', (req, res) => {
      try {
        this.CarpModel.findOneAndDelete({_id: req.params.id})
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
    this.app.get('/carpoolings/show/:id', (req, res) => {
      try {
        this.CarpModel.findOne({_id: req.params.id}).then(result => {
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
    this.app.put('/carpoolings/update/:id', (req, res) => {
      try {
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
