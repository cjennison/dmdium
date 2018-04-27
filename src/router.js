import Vue from 'vue'
import Router from 'vue-router'
import RouterView from './views/RouteView.vue'

import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import Segments from './views/Segments.vue'

//  Segments
import NewSegment from './views/segments/NewSegment.vue'

import CampaignSummary from './views/CampaignSummary.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/app/:campaign_slug',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          component: CampaignSummary
        },
        {
          path: 'segments',
          name: 'segments',
          component: RouterView,
          children: [
            {
              path: '',
              component: Segments
            },
            {
              path: 'new',
              component: NewSegment
            }
          ]
        }
      ]
    }
  ]
})
