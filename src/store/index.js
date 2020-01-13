import Vue from 'vue'
import Vuex from '../views/Vuex'

Vue.use(Vuex);//用插件使用的方法

export default new Vuex.Store({
  state: {
    age:10
  },
  getters:{
    myAge(state){
      return state.age + 10
    }
  },
  mutations:{
    syncAdd(state,payload){
      state.age += payload;
    },
    asyncMinus(state,payload){
      state.age -= payload;
    }
  },
  actions:{
    asyncMinus({commit,dispatch},payload){
      setTimeout(()=>{
        commit('asyncMinus',payload)
      },1000)
    }
  }
})
