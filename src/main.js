// import Vue from 'vue'
// console.log(ELEMENT)
// console.log(Mock)
import 'normalize.css/normalize.css'// A modern alternative to CSS resets

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css
import uploader from 'vue-simple-uploader'
import App from './App'
import router from './router'
// 引入音频文件
import audio from "./assets/mp3/2479.mp3"
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import seeImage from '@/plugin/SeeImage'
import echarts from 'echarts'  //引入Echarts
Vue.prototype.$echarts = echarts  //定义为全局变量
Vue.use(seeImage);
// import axios from 'axios'
import { getToken } from '@/utils/auth'
import * as filters from './filters'
import i18n from './lang'
import elCascaderMulti from "el-cascader-multi";
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import WebSocket from "./WebSocket"

Vue.use(Viewer)
Vue.use(elCascaderMulti);
Vue.use(VueLazyLoad, {
  error: 'http://hly.1000da.com.cn/assets/img/error.jpg',
  dispatchEvent: true,
  loading: 'http://hly.1000da.com.cn/assets/img/loading.gif',
});
// 遍历所有导出的过滤器并添加到全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
})

import '@/icons' // icon
// import '@/permission' // permission control
Vue.use(uploader)

axios.interceptors.request.use(function (config) {  //配置发送请求的信息\
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  if (response.data.code == 10101) {
    router.push({ name: 'Login' })
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

// 注册播放音频事件到Vue实例上
Vue.prototype.playAudio = () => {
  let buttonAudio = document.getElementById('eventAudio');
  buttonAudio.setAttribute('src',audio)
  buttonAudio.play()
}
Vue.use(ELEMENT, ELEMENT.lang.zhCN)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'https://www.cc360.com.cn/';
// axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
Vue.prototype.WebSocket = WebSocket;

Vue.config.productionTip = false
let vm = new Vue({
  el: '#app',
})
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem("userInfo")) {
    // 判断缓存里面是否有 userInfo  //在登录的时候缓存userInfo
    let userId = JSON.stringify(JSON.parse(sessionStorage.getItem("userInfo")).data.data) 
    let token = JSON.parse(sessionStorage.getItem("userInfo")).data.data.token
    let navigationBar = JSON.parse(sessionStorage.getItem("userInfo")).data.data.user_navigation_bar_permission // 获取路由权限菜单
    let nav = ""    // 定义一个路由   
    for (let i = 0; i < navigationBar.length; i++) {
      // 判断即将进入的路由是否在路由权限菜单中
      if (to.name == navigationBar[i]) {
        nav = navigationBar[i]
      }
    }
    if (nav != "") {
      // 如果即将进入的路由在权限菜单中就继续执行
      next()
    } else {
         // 如果不在权限菜单中就返回首页
      router.push({ name: "dashboard" });
      vm.$message({
        showClose: true,
        message: "你的账号没有权限！！！",
        type: "error"
      })
    }
    // 一登录就开启WebSocket
    WebSocket.createWebSocket("wss://www.cc360.com.cn/wss/message/?" + userId,token)
    // wss://www.cc360.com.cn/wss/message/?{'id':31,'token':'123123123','user_type':5,'agent_id':2}
    
 
  } else {
    if (to.name == "Login") {
      next()
    }
  }

});
import VCharts from 'v-charts'//echarts调用
// Vue.use(VCharts)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})

