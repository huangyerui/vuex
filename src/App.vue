<template>
  <div id="app">
    hyr{{this.$store.state.age}}
    <br>
    我的年龄是{{this.$store.getters.myAge}}
    <button @click="add">年龄增加</button>
     <button @click="minus">年龄减少</button>
  </div>
</template>
<script>
export default {
  name:'app',
  mounted() {
    console.log(this.$store)
  },
  methods:{
    add(){
      this.$store.commit('syncAdd',3)
    },
    minus(){
       this.$store.dispatch('asyncMinus',3)
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
