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

Vue.prototype.downloadFile = function(data, metaType){
  if (!data) {
    return
  }

  let url = window.URL.createObjectURL(new Blob([data]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', `file.${metaType}`)
  document.body.appendChild(link)
  link.click()
};
   

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
