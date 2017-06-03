
import Vue from 'vue'
import store from './vuex/store'
import Login from './components/Login'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routes from './router/routes'
import App from './App'

import './assets/bootstrap/css/bootstrap.min.css'
import './assets/bootstrap/js/bootstrap.min.js'
// import './assets/css/reset.css'

//引入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
	routes
})

 // 全局导航钩子
 router.beforeEach((to, from, next) => {
	 next();
 	// if (to.meta.auth) {
 	// 	if(!isEmptyObject(store.state.user)) {   
 	// 		next();
 	// 	}
 	// 	else { 
 	// 		next({
 	// 			path: '/login',
    //             query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //         })
 	// 	}
 	// }
 	// else {
 	// 	next();
 	// }
 })

 router.afterEach((to, from) => {

 })

 function isEmptyObject(obj) {
 	for (var key in obj) {
 		return false;
 	}
 	return true;
 }

 new Vue({
 	store, 
 	router, 
 	el: '#app',
 	render: h => h(App)
 })
