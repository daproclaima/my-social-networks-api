let faker = require('faker/locale/fr')
const fs = require('fs')

const fakeUsers = []
const groups = []   
function createGroups () {
  let range = 10
  range = Math.floor(Math.random() * range.length)
  for (let i = 0; i < range; i++) {
    let group = faker.word.word()
    groups.push(group)
  }
}
function createFakeUsers () { 
  for (let i = 0; i < 10; i++) {
    let avatar = faker.image.avatar()
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let address = faker.address.streetAddress()
    let city = faker.address.city()
    let zipCode = faker.address.zipCode()
    let country = faker.address.country()

    createGroups()

    const fakeUser = {
      'id': i,
      'avatar': avatar,
      'first_name': firstName,
      'last_name': lastName,
      'email': email,
      'password': password,
      'address': address,
      'city': city,
      'zip_code': zipCode,
      'country': country,
      'groups': groups
    }

    fakeUsers.push(JSON.stringify(fakeUser))
  }

  fs.writeFile(`${__dirname}/mocks/users.js`, `module.exports = [${fakeUsers}]`, 'utf-8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }
    console.log('JSON file has been saved.')
  })
}
console.log()
createFakeUsers()
