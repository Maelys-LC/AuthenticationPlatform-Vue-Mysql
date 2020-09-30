import Vuex from 'vuex'
import Vue from 'vue'

import 'es6-promise/auto'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        token: null,
        name: null,
        id: null,
        contacts: []
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
            state.contacts = []
        },
        ADD_CONTACTS(state, contacts){
            state.contacts = contacts
        },
        NEW_CONTACT(state, contact) {
            state.contacts.push(contact)
        },
        DELETE_SINGLE_CONTACT(state, contact) {
            for (let i=0; i < state.contacts.length; i++) {
                if (state.contacts[i].name === contact.name && state.contacts[i].email === contact.email && state.contacts[i].user_affiliate === contact.user_affiliate) {
                    state.contacts.splice(i, 1)
                }
            }
        },
        DELETE_ALL_CONTACTS(state) {
            state.contacts = []
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
        },
        add_contacts(context, contacts) {
            context.commit("ADD_CONTACTS", contacts)
        },
        new_contact(context, contact) {
            context.commit("NEW_CONTACT", contact)
        },
        deleteSingleContact(context, contact) {
            context.commit("DELETE_SINGLE_CONTACT", contact)
        },
        deleteAllContacts(context) {
            context.commit("DELETE_ALL_CONTACTS")
        }
    },
    plugins: [createPersistedState()],
})