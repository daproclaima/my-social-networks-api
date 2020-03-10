const chai = require('chai')
const chaiHttp = require('chai-http')
const createEvents = require('../fixtures/event.fixtures.js')
const app = require('../../app/server.js')
const { expect } = chai
chai.use(chaiHttp)
describe('Events', () => {
  let deleteEvents, events, stopDb, dbUrl, app
  before(async () => {
    ({app, dbUrl, stopDb} = await appSetup.init())
    ({cleanup: deleteEvents, entities: events } =
       await createEvents(`${dbUrl}/test-db`))
  })
  after(() => deleteEvents().then(stopDb))
  describe('GET /', () => {
    it('must fetch all events', async () => {
      const response = await chai.request(app).get('/events/list')
      expect(response).to.have.status(200)
      expect(response.body.events).to.have.lengthOf(2)
    })
    it('must fetch a single event by ID', async () => {
      const [, secondEvent] = events
      const response = await chai.request(app)
        .get(`/events/${secondEvent._id}`)
      expect(response).to.have.status(200)
      expect(response.body.event.id).to.eql(secondEvent.id)
    })
    it('must respond with a NOT FOUND error', async () => {
      const response = await chai.request(app)
        .get(`/events/${events[1].authorId}`)
      expect(response).to.have.status(404)
    })
  })
})
