const groups = require('../../../factory/mocks/groups.js')

/**
 * Update
 * @Class
 */
class Update {
  constructor (app) {
    this.app = app
    this.run()
  }

  /**
   * middleWare
   */
  middleware () {
    this.app.put('/groups/update/:id', (req, res) => {
      try {
        const { id } = req.params
        const { body } = req
        let group = groups.find(group => parseInt(group.id) === parseInt(id) ? group : false)
        if (group) {
          group = body
          res.status(200).json(group)
        } else {
          return {}
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
   * Run
   */
  run () {
    this.middleware()
  }
}

module.exports = Update
