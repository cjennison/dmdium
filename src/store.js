import Vue from 'vue'
import Vuex from 'vuex'

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: true
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    login({ commit }/*, creds*/) {
      commit(LOGIN);
      return new Promise(resolve => {
        setTimeout(() => {
          // ADD JWT
          commit(LOGIN_SUCCESS);
          resolve();
        }, 1000);
      });
    },
    logout({ commit }) {
      // REMOVE JWT
      commit(LOGOUT);
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
     }
  }
})
