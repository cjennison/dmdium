import Vue from 'vue'
import Router from 'vue-router'
import RouterView from './views/RouteView.vue'

import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import Segments from './views/Segments.vue'
import Monsters from './views/Monsters.vue'
import Items from './views/Items.vue'


//  Segments
import NewSegment from './views/segments/NewSegment.vue'

//  Monsters
import NewMonster from './views/monsters/NewMonster.vue'
import EditMonster from './views/monsters/EditMonster.vue'

//  Monsters
import NewItem from './views/items/NewItem.vue'
import EditItem from './views/items/EditItem.vue'

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
      component: Dashboard,
      children: [
        {
          name: 'dashboard',
          path: '',
          component: CampaignSummary
        },
        {
          path: 'segments',
          component: RouterView,
          children: [
            {
              name: 'segments',
              path: '',
              component: Segments
            },
            {
              path: 'new',
              component: NewSegment
            }
          ]
        },
        {
          path: 'monsters',
          component: RouterView,
          children: [
            {
              name: 'monsters',
              path: '',
              component: Monsters
            },
            {
              path: 'new',
              component: NewMonster
            },
            {
              path: ':monster_id/edit',
              component: EditMonster
            }
          ]
        },
        {
          path: 'items',
          component: RouterView,
          children: [
            {
              name: 'items',
              path: '',
              component: Items
            },
            {
              path: 'new',
              component: NewItem
            },
            {
              path: ':item_id/edit',
              component: EditItem
            }
          ]
        }
      ]
    }
  ]
})
