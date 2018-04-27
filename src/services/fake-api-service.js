
const db = require('./api.json')
const _ = require('lodash')

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

  getSegmentsForCampaign(campaignId) {
    return new Promise((resolve, reject) => {
      this.makeFlatRequest('segments').then((segments) => {
        resolve(_.filter(segments, segment => segment.campaign_id == campaignId))
      })
    })
  },

  makeFlatRequest(field) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(db[field])
      }, Math.random()*1000)
    })
  }
}