import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';
import scopeObject from './scope'
import AuthManager from '@/services/auth-manager'

const basePath = "http://localhost:3000"

const store = new DataStore();
const httpAdapter = new HttpAdapter({
  basePath: basePath,
  beforeHTTP: function (config, opts) {
    return HttpAdapter.prototype.beforeHTTP.call(this, config, opts);
  },
  afterHTTP: function(config, opts, response) {
    if (response.headers) {
      const accessToken = response.headers["access-token"];
      const client = response.headers["client"];
      const uid = response.headers["uid"];

      if (accessToken && accessToken.length > 0) {
        AuthManager.setStoredAuth(response.headers['access-token'], 
          response.headers['client'], 
          response.headers['uid']);

        configureStore({
          'access-token': accessToken,
          'client': client,
          'uid': uid
        })
      }
    }
  }
});

store.registerAdapter('http', httpAdapter, { 'default': true });
store.defineMapper('user', {
  name: 'user',
  endpoint: 'users'
});

store.defineMapper('auth', {
  name: 'auth',
  endpoint: 'auth'
})

store.defineMapper('campaign', {
  name: 'campaign',
  endpoint: 'campaigns'
})

store.defineMapper('segment', {
  name: 'segment',
  endpoint: 'segments'
})

store.defineMapper('asset', {
  name: 'asset',
  endpoint: 'assets'
})

store.defineMapper('item', {
  name: 'item',
  endpoint: 'items'
})

store.defineMapper('monster', {
  name: 'monster',
  endpoint: 'monsters'
})

store.defineMapper('character', {
  name: 'character',
  endpoint: 'characters'
})

httpAdapter.resourceBasePath = (resourceType, resourceId) => {
  return `${basePath}/${resourceType}/${resourceId}/`
}

function configureStore(authHeaders) {
  httpAdapter.httpConfig = {
    headers: authHeaders
  }
}

function getHttpAdapter() {
  return httpAdapter
}

export {store, getHttpAdapter, configureStore};