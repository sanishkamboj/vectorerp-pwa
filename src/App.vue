<template>
  <div id="app">
    <notifications group="login" position="top center" />
    <notifications group="app" />
	  <loading :active.sync="showSpinner" 
        :can-cancel="false" 
		    :opacity="0.7"
        :is-full-page="true"></loading>
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
