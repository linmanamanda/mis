import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.js'
import App from './App.vue'
import './plugins/element.js'
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes 
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
