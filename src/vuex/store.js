import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	user:"",
	userType:""
}

const mutations = {
	isLogin (state,user,userType) {
		state.user = user;
		state.userType = userType;
	}
}



export default new Vuex.Store({
	state,
	mutations
})