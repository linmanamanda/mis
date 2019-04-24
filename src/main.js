import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.js'
import App from './App.vue'
import moment from 'moment'
import './plugins/element.js'
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes 
})

Vue.filter('timestampTransfer', (value) => {
  if (!value) return ''
  return moment(value - '0').format('YYYY-MM-DD HH:mm:ss');  
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
