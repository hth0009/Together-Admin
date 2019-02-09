import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Calendar from '@/components/Calendar'
import EventDetails from '@/components/EventDetails'
import AppPage from '@/components/AppPage'

Vue.use(Router)

export default new Router({
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
      component: Home
    },
    {
      path: '/app',
      name: 'AppPage',
      component: AppPage
    },
    {
      path: '/app/:subpage',
      name: 'AppPage',
      component: AppPage
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/event-details/:eventNumber',
      name: 'Event Details',
      component: EventDetails
    }
  ]
})
