import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import PageConstructor from 'src/views/page-constructor/page-constructor.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'PageConstructor',
    component: PageConstructor,
  },
]

const router = new VueRouter({
  routes,
})

export default router
