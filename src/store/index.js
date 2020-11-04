import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    hasLogin: true,
    userInfo:"",
  },
  mutations: {
    login(state,userInfoR){
      state.userInfo=userInfoR;
      state.hasLogin=true;
    },
    logout(state){
      state.hasLogin = false;
      state.userInfo='';
    },
  },
  actions: {

  },
  getters:{
  },
});
