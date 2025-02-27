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
import AppPageNew from '@/components/AppPageNew'
import ChurchInfo from '@/components/ChurchInfo'
import Staff from '@/components/Staff'
import Subscription from '@/components/Subscription'
import PrivacyPolicy from '@/components/PrivacyPolicy'

import Splash from '@/views/Splash'
import Welcome from '@/components/splash/Welcome';
import Price from '@/components/splash/Price';
import Questions from '@/components/splash/Questions';
import Product from '@/components/splash/Product';

import FAQ from '@/components/FAQ'

import Inbox from '@/components/Inbox'
import People from '@/components/People'
import Teams from '@/components/Teams'
import Prayer from '@/components/Prayer'
import Calendar from '@/components/Calendar'
import Home from '@/components/Home'
import ThisSunday from '@/components/ThisSunday'
import Giving from '@/components/giving/Giving'
import Me from '@/components/Me'
import MyChurch from '@/components/MyChurch'
import Signup from '@/components/Signup'
import OrgCreation from '@/components/OrgCreation'
import NewEvent from '@/components/NewEvent'

import store from './store'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: '',
      meta: {
        noNav: true,
        requiresAuth: false
      }
    },
    {
      path: '/hello',
      name: 'Splash Screen',
      component: Splash,
      meta: {
        noNav: true,
        requiresAuth: false
      },
      children: [
        {
          path: 'welcome',
          name: 'Welcome',
          component: Welcome,
          meta: {
            noNav: true,
            requiresAuth: false,
          },
        },
        {
          path: 'price',
          name: 'Price',
          component: Price,
          meta: {
            noNav: true,
            requiresAuth: false,
          },
        },
        {
          path: 'questions',
          name: 'Questions',
          component: Questions,
          meta: {
            noNav: true,
            requiresAuth: false,
          },
        },
        {
          path: 'product',
          name: 'Product',
          component: Product,
          meta: {
            noNav: true,
            requiresAuth: false,
          },
        },
      ]
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ,
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
      path: '/signup',
      component: Signup,
      name: 'Signup',
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: 'org-creation',
          name: 'orgCreation',
          component: OrgCreation,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
      meta: {
        noNav: true,
        requiresAuth: false
      }
    },
    {
      path: '/app',
      name: 'AppPageNew',
      component: AppPageNew,
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
          path: 'messages/',
          component: Inbox,
          name: 'Inbox List',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'messages/:id',
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
        {
          path: 'this-sunday/',
          component: ThisSunday,
          name: 'This Sunday',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'this-sunday/:id',
          component: ThisSunday,
          name: 'This Sunday',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'giving',
          component: Giving,
          name: 'Giving',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'me/',
          component: Me,
          name: 'Me',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'my-church/',
          component: MyChurch,
          name: 'My Church',
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

