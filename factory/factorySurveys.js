let faker = require('faker/locale/fr')
const fs = require('fs')

// let id
let creator = [] // one manager so a member who s in list of group's managers
// let titleQuestion = [] // string
let answers = [] // array of string
// let parentGroup // IdGroup
let participants = [] // equal to group members with id 
// let participantChoice // assoc {idMember, IdAnswer}
let participantsChoices = [] // assoc {idMember, IdAnswer} 

let fakeSurveys = []

function createParticipants () {
  let maxAmount = 100
  let amount = Math.floor(Math.random() * maxAmount)
  
  for (let i = 0; i < amount; i++) {
    let participant = `${faker.name.firstName()} ${faker.name.lastName()}`
    participants.push(participant)
  }
}

function createCreator () {
  for (let i = 0; i < 5; i++) {
    let creatorId = Math.floor(Math.random() * participants.length)
    creator = participants[creatorId]
  }
}

function chooseAnswer () {
  for (let i = 0; i < participants.length; i++) {
    let participantChoice = {
      'participant': i,
      'choice': Math.floor(Math.random() * answers.length)
    }
    participantsChoices.push(participantChoice)
  }
}

function createAnswers () {
  for (let i = 0; i < 4; i++) {
    let answer = { 'text': faker.lorem.words() }
    answers.push(answer)
  }
}

function createFakeSurveys () { 
  for (let i = 0; i < 2; i++) {
    let titleQuestion = faker.lorem.words()
  
    let parentGroup = faker.lorem.word() // IdGroup
    // let participants // equal to group members with id 

    createParticipants()
    createCreator()
    createAnswers()
    chooseAnswer()

    const fakeSurvey = {
      'id': i,
      'creator': creator,
      'title_question': titleQuestion,
      'answers': answers,
      'participants': participants,
      'participant_choice': participantsChoices,
      'parent_group': parentGroup
    }
    // console.log(FakeSurvey)
    fakeSurveys.push(JSON.stringify(fakeSurvey))
  }
  // console.log(fakeSurveys)
  fs.writeFile(`${__dirname}/mocks/surveys.js`, `module.exports = [${fakeSurveys}]`, 'utf-8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }
    console.log('JSON file has been saved.')
  })
}
createFakeSurveys()
