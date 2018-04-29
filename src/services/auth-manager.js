class AuthManager {
  getStoredAuth() {
    return {
      accessToken: localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid')
    }
  }

  setStoredAuth(accessToken, client, uid) {
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('client', client);
    localStorage.setItem('uid', uid);
  }
}

module.exports = new AuthManager()
