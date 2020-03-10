import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routes/index'
import db from './database/sqlite'

Vue.config.productionTip = false;
db.init();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
