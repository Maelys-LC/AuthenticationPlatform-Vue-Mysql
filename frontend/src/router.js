import Vue from "vue";
import Router from "vue-router";
import Home from './components/Home.vue'
import Dashboard from "./components/Dashboard.vue"
import store from './store.js'

Vue.use(Router);

let router = new Router ({
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/dashboard",
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.meta.requiresAuth)) {
        if(!store.state.token) {
            next({
                path: '/',
                params: {nextUrl: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router