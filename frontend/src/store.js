import Vuex from 'vuex'
import Vue from 'vue'

import 'es6-promise/auto'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        token: null
    },
    mutations: {
        ADD_TOKEN(state, element) {
            state.token = element
        },
        DELETE_TOKEN(state) {
            state.token = null
        }
    },
    actions: {
        ADD_TOKEN(context, element) {
            context.commit("ADD_TOKEN", element)
        },
        DELETE_TOKEN(context) {
            context.commit("DELETE_TOKEN")
        }
    },
    plugins: [createPersistedState()],
})