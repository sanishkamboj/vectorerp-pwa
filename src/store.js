import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  // for remote
  API_URL: 'http://54.174.107.233/public/api',  
  sidebarClass: 'd-none',
  showSpinner: false,
  loadingText: 'Loading...',
  country: '',
  toolsSideBar: 'd-none',
  filterSideBar: 'd-none',
  searchSidebar: 'd-none',
  polygonEditable: false,
  lineEditable: false,
  markerEditable: false,
  map: []
}

const mutations = {
  changeSpinnerStatus(state, status) {
    state.showSpinner = status
  },
  loadingText(state, status) {
    state.loadingText = status
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
  toggleSearchSideBar(state){
    const currState = state.searchSidebar
    console.log(currState)
    if(currState == 'd-none'){
        state.searchSidebar = 'show-sidebar'
    } else {
        state.searchSidebar = 'd-none'
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
  loadingText({ commit }, status) {
    commit('loadingText', status)
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
  loadingText(state) {
    return state.loadingText
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
