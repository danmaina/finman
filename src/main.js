import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routes/index'
import {store} from './store/store'

Vue.config.productionTip = false;

// fixme: When app starts the DB file is created but the tables are not created until second run

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
