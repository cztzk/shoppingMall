import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//listData 列表 vantList  参数
export default new Vuex.Store({
    state: {
        loadNum: 0,
        indexProductId: 0,
    },
    mutations: {
        setIndexProductId(state, indexProductId) {
            state.indexProductId = indexProductId;
        },
    },
    actions: {},
    modules: {}
})