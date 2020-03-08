const Event = require('../models/event.js')

/**
 * Events
 * @class
 */
class Events {
  constructor (app, connect) {
    this.app = app
    this.EventModel = connect.model('Event', Event)

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
    this.app.post('/events/create', (req, res) => {
      try {
        const eventModel = new this.EventModel(req.body)
        
        eventModel.save().then(event => {
          res.status(200).json(event || {})
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

  delete () {
    this.app.delete('/events/delete/:id', (req, res) => {
      try {
        this.EventModel.findOneAndDelete({_id: req.params.id})
          .then(event => {
            res.status(200).json(event || {})
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

  show () {
    this.app.get('/events/show/:id', (req, res) => {
      try {
        this.EventModel.findOne({_id: req.params.id}).then(event => {
          res.status(200).json(event || {})
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

  update () {
    this.app.put('/events/update/:id', (req, res) => {
      try {
        this.EventModel.findOneAndUpdate({}, {_id: req.params.id}, req.body).then(event => {
          res.status(200).json(event || {})
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

  list () {
    this.app.get('/events/list', (req, res) => {
      try {
        this.EventModel.find({}, function (err, result) {
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

module.exports = Events
