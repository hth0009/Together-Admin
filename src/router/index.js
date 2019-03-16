import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Calendar from '@/components/Calendar'
import EventDetails from '@/components/EventDetails'
import AppPage from '@/components/AppPage'
import store from '../store.js'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { noNav: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { noNav: true }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/app',
      name: 'AppPage',
      component: AppPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/app/:subpage',
      name: 'AppPage',
      component: AppPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/event-details/:eventNumber',
      name: 'Event Details',
      component: EventDetails,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
