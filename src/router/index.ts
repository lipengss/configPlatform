import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    name: 'manage',
    redirect: '/dashboard',
    component: () => import('@/views/manage/manage.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          icon: 'dashboard',
          title: '我的可视化',
        },
        component: () => import('@/views/manage/dashboard/dashboard.vue')
      },
      // {
      //   path: '/data',
      //   name: 'data',
      //   meta: {
      //     icon: 'data',
      //     title: '我的数据'
          
      //   },
      //   component: () => import('@/views/manage/data/data.vue')
      // },
      // {
      //   path: '/assets',
      //   name: 'assets',
      //   meta: {
      //     icon: 'assets',
      //     title: '我的资产'
      //   },
      //   component: () => import('@/views/manage/assets/assets.vue')
      // }
    ]
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    redirect: '/editor',
    children: [
      {
        path: '/editor/:id',
        name: 'editor',
        component: () => import('@/views/editor/editor.vue')
      }
    ]
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('@/views/preview/preview.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
