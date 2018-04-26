
const db = require('./api.json')

module.exports = {
  login() {
    return this.getUser()
  },

  getUser() {
    return this.makeFlatRequest('user')
  },

  getCampaigns() {
    return this.makeFlatRequest('campaigns')
  },

  makeFlatRequest(field) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(db[field])
      }, Math.random()*1000)
    })
  }
}