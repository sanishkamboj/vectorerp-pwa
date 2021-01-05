<template>
  <div id="app">
    <notifications group="login" position="top center" />
    <notifications group="app" />
	  <loading :active.sync="showSpinner" 
        :can-cancel="false" 
		    :opacity="0.7"
        :is-full-page="true">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" fill="none" stroke="#e15b64" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
      </svg>
      <p style="
          font-size: 13px;
          margin-top: 10px;
          text-align: center;
      ">Loading...</p></loading>
   
	<router-view v-bind:key="$route.params.id"></router-view>
	<resize-observer @notify="handleResize" />
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay';
    // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  name: "app",
  components: {
    Loading
  },
  computed: {
    ...mapGetters({ showSpinner: 'showSpinner' })
  },
 methods: {
    handleResize ({ width, height }) {
      if(width < 767){
		  this.$store.commit('set', ['sidebarClass', 'd-none'])
	  } else {
		  this.$store.commit('set', ['sidebarClass', 'show-sidebar'])
	  }
	},
	changeSpinnerStatus(status) {
      this.$store.dispatch('changeSpinnerStatus', status)
    }
  }

};
</script>

<style>
#app {

}
</style>
