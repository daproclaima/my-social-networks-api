const users = require('../../../factory/mocks/users.js')

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
    this.app.put('/users/update/:id', (req, res) => {
      try {
        const { id } = req.params
        const { body } = req
        let user = users.find(user => parseInt(user.id) === parseInt(id) ? user : false)
        if (user) {
          user = body
          res.status(200).json(user)
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
