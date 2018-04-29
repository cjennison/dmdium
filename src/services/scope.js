class ScopeObject {
  get current_user() {
    return this._current_user
  }

  set current_user(user) {
    this._current_user = user
  }

  get current_campaign() {
    return this._current_campaign
  }
  
  set current_campaign(campaign) {
    this._current_campaign = campaign
  }
}


export default new ScopeObject();