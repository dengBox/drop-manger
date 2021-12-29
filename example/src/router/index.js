import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { read, save } from '@/storage'

// 引入路由
import Home from '@/views/Home.vue'

NProgress.configure({ showSpinner: false })

Vue.use(VueRouter)

// 自动导入其他 router 文件
const context = require.context('./', true, /.js$/)
let routerList = []
context.keys().forEach(k => {
  if (k !== './index.js') {
    routerList = [...routerList, ...context(k).default]
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      // redirect: '/login'
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: []
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test/Index.vue')
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('@/views/docs/Index.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/views/editor/Index.vue')
    },
    {
      path: '/color',
      name: 'color',
      component: () => import('@/views/color/Index.vue')
    },
    {
      path: '/blendColor',
      name: 'blendColor',
      component: () => import('@/views/color/BlendColor.vue')
    },
    {
      path: '/createImg',
      name: 'createImg',
      component: () => import('@/views/color/CreateImg.vue')
    },
    ...routerList,
    {
      path: '*',
      name: '404',
      component: () => {
        return '找不到该页面！'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
