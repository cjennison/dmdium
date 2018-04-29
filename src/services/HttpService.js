import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';
import scopeObject from './scope'

const basePath = "http://localhost:3000"

const store = new DataStore();
const httpAdapter = new HttpAdapter({
  basePath: basePath,
  beforeHTTP: function (config, opts) {
    // Now do the default behavior
    return HttpAdapter.prototype.beforeHTTP.call(this, config, opts);
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

httpAdapter.resourceBasePath = (resourceType, resourceId) => {
  return `${basePath}/${resourceType}/${resourceId}/`
}

function configureStore(authHeaders) {
  httpAdapter.httpConfig = {
    headers: authHeaders
  }
}

export {store, httpAdapter, configureStore};