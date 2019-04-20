import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Calendar from '@/components/Calendar'
import EventDetails from '@/components/EventDetails'
import AppPage from '@/components/AppPage'
import ChurchInfo from '@/components/ChurchInfo'
import Staff from '@/components/Staff'
import Subscription from '@/components/Subscription'
import PrivacyPolicy from '@/components/PrivacyPolicy'
// import store from '../store.js'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
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
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
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
    },
    {
      path: '/church-info',
      name: 'Church Info',
      component: ChurchInfo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/staff',
      name: 'Staff',
      component: Staff,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/subscription',
      name: 'Subscription',
      component: Subscription,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to')
  // console.log(to)
  // console.log('from')
  // console.log(from)
  // console.log('next')
  // console.log(next)
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   console.log(store)
  //   console.log(store.getters.isLoggedIn)
  //   if (store.getters.isLoggedIn) {
  //     console.log('hi')
  //     next(to.fullPath)
  //     // return
  //   }
  //   // next('/login')
  // } else {
  //   // next()
  // }
  next()
  // next(to.path)
})

export default router
