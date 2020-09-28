import Vuex from 'vuex'
import Vue from 'vue'

import 'es6-promise/auto'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        token: null,
        name: null,
        id: null
    },
    mutations: {
        ADD_TOKEN(state, token) {
            state.token = token            
        },
        CONNECT_USER(state, decoded) {
            state.name = decoded.name
            state.id = decoded.id
        },
        DELETE_TOKEN(state) {
            state.token = null
            state.name = null
            state.id = null
        }
    },
    actions: {
        ADD_TOKEN(context, token) {
            context.commit("ADD_TOKEN", token)
        },
        CONNECT_USER(context, decoded) {
            context.commit("CONNECT_USER", decoded)
        },
        DELETE_TOKEN(context) {
            context.commit("DELETE_TOKEN")
        }
    },
    plugins: [createPersistedState()],
})