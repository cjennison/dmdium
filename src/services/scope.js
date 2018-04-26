class ScopeObject {
  get auth_token() {
    return this._auth_token
  }
  set auth_token(token) {
    this._auth_token = JSON.parse(token)
  }

  get current_campaign() {
    return this._current_campaign
  }
  set current_campaign(campaign) {
    this._current_campaign = campaign
  }
}


export default new ScopeObject();