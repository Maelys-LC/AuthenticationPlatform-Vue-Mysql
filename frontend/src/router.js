import Vue from "vue";
import Router from "vue-router";
import Home from './components/Home.vue'
import Dashboard from "./components/Dashboard.vue"

Vue.use(Router);

export default new Router ({
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/dashboard",
            component: Dashboard
        }
    ]
})
