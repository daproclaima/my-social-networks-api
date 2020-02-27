let faker = require('faker/locale/fr');

// let randomName = faker.name.findName();

let name = faker.lorem.word()
let description = faker.lorem.words()
let startDate = faker.date.past()
let endDate = faker.date.future()
let location = `${faker.address.streetAddress()} ${faker.address.city()}`
let coverPicture = faker.image.image()
let privacy = ["private", "public", "secret"]
let members  = []
let managers = []

function createMembers() {
  let maxAmount = 100
  let amount = Math.floor(Math.random()*maxAmount)
  
  for ( let i = 0 ; i < amount; i++) {
    let member = `${faker.name.firstName()} ${faker.name.lastName()}`
    members.push(member)
  }
}

function createManagers(){
  for(let i = 0; i < 5 ; i++){
    let managerId = Math.floor(Math.random()*members.length)
    managers.push(members[managerId])
  }
}

createMembers()
// console.log(members)
createManagers()
// console.log(managers)

const FakeEvent = {
	"name": name,
  "description": description,
  "start_date" : startDate,
  "end_date": endDate,
  "location": location, 
  "cover_picture": coverPicture,
  "privacy": privacy[Math.floor(Math.random()*privacy.length)],
  "managers": managers,
  "members" : members
}


console.log(FakeEvent)
