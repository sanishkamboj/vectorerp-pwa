import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  // for remote
  API_URL: 'https://pwa.sanish.info/api',  
  sidebarClass: 'd-none',
  showSpinner: false,
  country: ''
}

const mutations = {
  changeSpinnerStatus(state, status) {
    state.showSpinner = status
  },
  toggleSidebarMobile(state) {
    const currState = state.sidebarClass
    if(currState == 'd-none'){
        state.sidebarClass = 'show-sidebar'
    } else {
        state.sidebarClass = 'd-none'
    }
  },
  setCountry(state, country){
    state.country = country
  },
  set(state, [variable, value]) {
    state[variable] = value
  }
}

const actions = {
  changeSpinnerStatus({ commit }, status) {
    commit('changeSpinnerStatus', status)
  },
  setCountry({commit}, country){
    commit('setCountry', country)
  }
}

const getters = {
  showSpinner(state) {
    return state.showSpinner
  },
  getCountry(state){
    return state.country
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
