import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import { ResizeObserver } from 'vue-resize'
import Axios from 'axios'
import Notifications from 'vue-notification'

Vue.prototype.$http = Axios;
Vue.config.productionTip = false
import 'vue-resize/dist/vue-resize.css'
 
Vue.component('resize-observer', ResizeObserver)

Vue.use(Notifications)
Vue.config.productionTip = false
Vue.prototype.$log = console.log.bind(console)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBU7Jj9b4KUdoe8z4VyW7f3nzzqZdeIgaM',
    libraries: 'geometry,drawing,places,visualization', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

