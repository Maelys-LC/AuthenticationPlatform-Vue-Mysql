import Vuex from 'vuex'
import Vue from 'vue'

import 'es6-promise/auto'

Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        token: ""
    },
    mutations: {
        ADD_TOKEN(state, element) {
            state.token = element
        }
    },
    actions: {
        ADD_TOKEN(context, element) {
            context.commit("ADD_TOKEN", element)
        }
    },
    getters: {
          
    }
})