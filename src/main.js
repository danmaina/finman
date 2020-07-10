import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './storage/store'
import vuetify from './views/frameworks/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
