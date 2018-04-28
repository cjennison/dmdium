
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

  getMonster(id) {
    return new Promise((resolve, reject) => {
      this.makeFlatRequest('monsters').then((monsters) => {
        resolve(_.find(monsters, monster => monster.id == id))
      })
    })
  },

  getItem(id) {
    return new Promise((resolve, reject) => {
      this.makeFlatRequest('items').then((items) => {
        resolve(_.find(items, item => item.id == id))
      })
    })
  },

  getSegmentsForCampaign(campaignId) {
    return new Promise((resolve, reject) => {
      this.makeFlatRequest('segments').then((segments) => {
        resolve(_.filter(segments, segment => segment.campaign_id == campaignId))
      })
    })
  },

  getItemsForCampaign(campaignId) {
    return new Promise((resolve, reject) => {
      this.makeFlatRequest('items').then((items) => {
        resolve(_.filter(items, item => item.campaign_id == campaignId))
      })
    })
  },

  getMonstersForCampaign(campaignId) {
    return new Promise((resolve, reject) => {
      this.makeFlatRequest('monsters').then((monsters) => {
        resolve(_.filter(monsters, monster => monster.campaign_id == campaignId))
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