const groups = require('../../models/factory/mocks/groups.js')

/**
 * Create
 * @Class
 */
class Create {
  constructor (app, connect) {
    this.app = app
    this.run()
  }

  /**
   * middleWare
   */
  middleware () {
    this.app.post('/groups/create', (req, res) => {
      try {
        groups.push(req.body)
        res.status(200).json(groups)
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }

  /**
   * Run
   */
  run () {
    this.middleware()
  }
}

module.exports = Create
