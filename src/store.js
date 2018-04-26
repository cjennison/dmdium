import Vue from 'vue'
import Vuex from 'vuex'

const SET_USER = "SET_USER";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    login({ COMMIT }, user) {
      COMMIT(SET_USER, user);
    }
  },
  getters: {
    user: state => {
      return state.user
    }
  }
});
