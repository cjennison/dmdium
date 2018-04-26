
const db = require('./api.json')

module.exports = {
  getUser() {
    return this.makeFlatRequest('user')
  }

  makeFlatRequest(field) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(db[field])
      }, Math.random()*1000)
    })
  }
}