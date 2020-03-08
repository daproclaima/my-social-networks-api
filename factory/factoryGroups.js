let faker = require('faker/locale/fr')
const fs = require('fs')

// let randomName = faker.name.findName();
let members = []
let managers = []

let fakeGroups = []

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

function createFakeGroups () { 
  for (let i = 0; i < 10; i++) {
    let name = faker.lorem.word()
    let description = faker.lorem.words()
    let coverPicture = faker.image.image()
    let iconePicture = faker.image.imageUrl()
    let privacy = ['private', 'public', 'sercret']
    let grantPublish = [true, false]
    let grantCreateEvent = [true, false]  
    let events = []
    createMembers()
    createManagers()

    const fakeGroup = {
      'id': i,
      'name': name,
      'description': description,
      'cover_picture': coverPicture,
      'icone_picture': iconePicture,
      'privacy': privacy[Math.floor(Math.random() * privacy.length)],
      'grant_publish': grantPublish[Math.floor(Math.random() * grantPublish.length)],
      'grant_create_event': grantCreateEvent[Math.floor(Math.random() * grantCreateEvent.length)],
      'managers': managers,
      'members': members,
      'events': events
    }

    fakeGroups.push(JSON.stringify(fakeGroup))
  }

  fs.writeFile(`${__dirname}/mocks/groups.js`, `module.exports = [${fakeGroups}]`, 'utf-8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }
    console.log('JSON file has been saved.')
  })
}
console.log()
createFakeGroups()
