import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routes/index'
import db from './database/sqlite'

Vue.config.productionTip = false;
db.init();

// fixme: When app starts the DB file is created but the tables are not created until second run

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
