let Vue; // vue的构造函数
//vue的组件渲染 先渲染父组件 再渲染子组件 深度优先
const forEach = (obj, callback) => {
    Object.keys(obj).forEach(key => {
        callback(key, obj[key])
    })
}
const install = (_Vue) => {
    console.log('install')
    Vue = _Vue
    //需要给每个组件都注册一个this.$store属性
    Vue.mixin({
        beforeCreate() { //声明周期 组件创建之前
            console.log(this.$options.name)
            //需要先判别是父组件还是子组件，如果是子组件，应该把父组件的store增加给子组件
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}
class Store {
    constructor(options) {
        this._vm = new Vue({
            data: {
                state: options.state //把对象变成了可监控的对象
            }
        });
        let getters = options.getters || {} //用户传递过来的getters
        this.getters = {};
        forEach(getters, (getterName, value) => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    //    console.log(this)
                    return value(this.state)
                }
            })
        })
        console.log(options)
        let mutations = options.mutations || {};
        this.mutations = {};
        forEach(mutations, (mutationName, value) => {
            console.log(mutationName)
            this.mutations[mutationName] = (payload) => {
                value(this.state, payload)
            }
        })
        let actions = options.actions || {}
        this.actions = {}
        forEach(actions,(actionName,value)=>{
            this.actions[actionName] = (payload)=>{
                value(this,payload)
            }
        })
    }
    dispatch(type,payload){
        this.actions[type](payload)
    }
    commit(type, payload) {
        this.mutations[type](payload);
    }
    get state() {
        return this._vm.state
    }
}
export default {
    install,
    Store
}