const JWT = require('../app/jwt')
const jwt = new JWT()

const user = {
  id: '00778972',
  email: 'anymail@gmail.com'
}

const token = jwt.JWTgenerator(user)

jwt.saveToken(token.signature)
jwt.saveToken('abcdefgh')

console.log(jwt.getTokens())
console.log(jwt.getToken('abcdefgh'))
