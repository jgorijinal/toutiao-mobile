import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      // {
      //   path: 'qa',
      //   name: 'qa',
      //   component: () => import('@/views/qa/index.vue')
      // },
      // {
      //   path: 'video',
      //   name: 'video',
      //   component: () => import('@/views/video/index.vue')
      // },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/index.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    props: true // 把路由参数映射到组件的 props里面
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
