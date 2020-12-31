import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  // for remote
  API_URL: 'https://pwa.sanish.info/api',  
  sidebarClass: 'd-none',
  showSpinner: false,
  country: '',
  toolsSideBar: 'd-none',
  filterSideBar: 'd-none',
  polygonEditable: false,
  lineEditable: false,
  markerEditable: false,
  map: []
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
  changePolygonEditable(state, status){
    console.log(status)
    state.polygonEditable = status
  },
  changeLineEditable(state, status){
    console.log(status)
    state.lineEditable = status
  },
  changeMarkerEditable(state, status){
    console.log(status)
    state.markerEditable = status
  },
  toggleToolsSideBar(state){
    const currState = state.toolsSideBar
    if(currState == 'd-none'){
        state.toolsSideBar = 'show-sidebar'
    } else {
        state.toolsSideBar = 'd-none'
    }
  },
  toggleFilterSideBar(state){
    const currState = state.filterSideBar
    if(currState == 'd-none'){
        state.filterSideBar = 'show-sidebar'
    } else {
        state.filterSideBar = 'd-none'
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
  },
  changePolygonEditable({commit}, status){
    commit('changePolygonEditable', status)
  }
  ,
  changeLineEditable({commit}, status){
    commit('changeLineEditable', status)
  },
  changeMarkerEditable({commit}, status){
    commit('changeMarkerEditable', status)
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
