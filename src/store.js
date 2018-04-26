import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      "id": 1,
      "first_name": "Chris",
      "last_name": "Jennison"
    }
  },
  mutations: {
    login(state, user) {
      state.user = user;
    }
  },
  getters: {
    getUser: state => {
      return state.user
    }
  }
});
