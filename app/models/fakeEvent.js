let faker = require('faker/locale/fr')
const fs = require('fs')

// let randomName = faker.name.findName();
let members = []
let managers = []

let FakeEvents = []

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

    const FakeEvent = {
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

    FakeEvents.push(JSON.stringify(FakeEvent))
  }

  fs.writeFile(`${__dirname}/fakeEvents.js`, FakeEvents, 'utf-8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }
    console.log('JSON file has been saved.')
  })
}
console.log()
createFakeEvents()
