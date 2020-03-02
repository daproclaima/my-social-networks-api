let faker = require('faker/locale/fr')
const fs = require('fs')

// let randomName = faker.name.findName();
let members = []
let managers = []

let fakeEvents = []

function createMembers () {
  let maxAmount = 100
  let amount = Math.floor(Math.random() * maxAmount)
  
  for (let i = 0; i < amount; i++) {
    let member = `${faker.name.firstName()} ${faker.name.lastName()}`
    members.push(member)
  }
}

function createManagers () {
  for (let i = 0; i < 5; i++) {
    let managerId = Math.floor(Math.random() * members.length)
    managers.push(members[managerId])
  }
}

function createFakeEvents () { 
  for (let i = 0; i < 10; i++) {
    let name = faker.lorem.word()
    let description = faker.lorem.words()
    let startDate = faker.date.past()
    let endDate = faker.date.future()
    let location = `${faker.address.streetAddress()} ${faker.address.city()}`
    let coverPicture = faker.image.image()
    let privacy = ['private', 'public']
    createMembers()
    createManagers()

    const fakeEvent = {
      'id': i,
      'name': name,
      'description': description,
      'start_date': startDate,
      'end_date': endDate,
      'location': location, 
      'cover_picture': coverPicture,
      'privacy': privacy[Math.floor(Math.random() * privacy.length)],
      'managers': managers,
      'members': members
    }

    fakeEvents.push(JSON.stringify(fakeEvent))
  }

  fs.writeFile(`${__dirname}/mocks/events.js`, `module.exports = [${fakeEvents}]`, 'utf-8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }
    console.log('JSON file has been saved.')
  })
}
console.log()
createFakeEvents()
