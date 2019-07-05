// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Home.vue'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import EventDetails from '@/components/EventDetails'
import AppPage from '@/components/AppPage'
import ChurchInfo from '@/components/ChurchInfo'
import Staff from '@/components/Staff'
import Subscription from '@/components/Subscription'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import Splash from '@/components/Splash'

import Inbox from '@/components/Inbox'
import People from '@/components/People'
import Teams from '@/components/Teams'
import Prayer from '@/components/Prayer'
import Calendar from '@/components/Calendar'
import Home from '@/components/Home'
import ThisSunday from '@/components/ThisSunday'
import Me from '@/components/Me'

import NewEvent from '@/components/NewEvent'

import store from '@/store'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Splash Screen',
      component: Splash,
      meta: {
        noNav: true,
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        noNav: true,
        requiresAuth: false
      }
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
      meta: { noNav: true }
    },
    {
      path: '/app',
      name: 'AppPage',
      component: AppPage,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'home',
          component: Home,
          name: 'Home',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'inbox/',
          component: Inbox,
          name: 'Inbox List',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'inbox/:id',
          component: Inbox,
          name: 'Inbox',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'teams',
          component: Teams,
          name: 'Teams List',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'teams/:id',
          component: Teams,
          name: 'Teams',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'prayer',
          component: Prayer,
          name: 'Prayer List',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'prayer/:id',
          component: Prayer,
          name: 'Prayer',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'people',
          component: People,
          name: 'People List',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'people/:id',
          component: People,
          name: 'People',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'calendar',
          component: Calendar,
          name: 'Calendar List',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'calendar/:id',
          component: Calendar,
          name: 'Calendar',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'staff/',
          component: Staff,
          name: 'Staff',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'staff/:id',
          component: Staff,
          name: 'Staff',
          meta: {
            requiresAuth: true
          }
        },
        // {
        //   path: 'this-sunday/',
        //   component: ThisSunday,
        //   name: 'This Sunday',
        //   meta: {
        //     requiresAuth: true
        //   }
        // },
        {
          path: 'me/',
          component: Me,
          name: 'Me',
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth === false) {
    next()
  } else {
    if (store.getters.authStatus) {
      next()
    } else {
      await store.dispatch('checkLogin')
      if (!store.getters.authStatus) {
        next('/login')
      }
    }
  }
  next()
})

export default router

