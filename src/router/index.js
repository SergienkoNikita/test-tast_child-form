import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '@/pages/Form'
import Preview from '@/pages/Preview'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Form',
    component: Form,
    props: true,
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
