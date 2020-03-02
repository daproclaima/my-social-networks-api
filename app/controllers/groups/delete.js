const groups = require('../../models/factory/mocks/groups.js')
/**
 * Delete
 * @Class
 */
class Delete {
  constructor (app) {
    this.app = app
    this.run()
  }

  /**
   * middleWare
   */
  middleware () {
    this.app.delete('/groups/delete/:id', (req, res) => {
      try {
        const { id } = req.params
        res.status(200).json(groups.find(group => parseInt(group.id) === parseInt(id)) || {})
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

module.exports = Delete
