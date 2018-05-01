import Vue from 'vue'
import Router from 'vue-router'
import RouterView from './views/RouteView.vue'

import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Assets from './views/Assets.vue'
import Segments from './views/Segments.vue'
import Monsters from './views/Monsters.vue'
import Characters from './views/Characters.vue'
import Items from './views/Items.vue'
import Account from './views/Account.vue'
import Campaigns from './views/Campaigns.vue'
import AccountManagerDashboard from './views/AccountManagerDashboard.vue';
import CampaignSummary from './views/CampaignSummary.vue'

//  Segments
import NewSegment from './views/segments/NewSegment.vue'

//  Monsters
import NewMonster from './views/monsters/NewMonster.vue'
import EditMonster from './views/monsters/EditMonster.vue'

//  Monsters
import NewItem from './views/items/NewItem.vue'
import EditItem from './views/items/EditItem.vue'

//  Characters
import NewCharacter from './views/characters/NewCharacter.vue'
import EditCharacter from './views/characters/EditCharacter.vue'

// Campaigns
import NewCampaign from './views/campaigns/NewCampaign.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        bypassAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        bypassAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        bypassAuth: true
      }
    },
    {
      path: '/account',
      component: AccountManagerDashboard,
      children: [
        {
          name: 'account',
          path: '',
          component: Account
        }
      ]
    },
    {
      path: '/campaigns',
      component: AccountManagerDashboard,
      children: [
        {
          name: 'campaigns',
          path: '',
          component: Campaigns
        },
        {
          name: 'new',
          path: 'new',
          component: NewCampaign
        }
      ]
    },
    {
      path: '/assets',
      component: RouterView,
      children: [
        {
          name: 'assets',
          path: '',
          component: Assets
        }
      ]
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
          path: 'npcs',
          component: RouterView,
          children: [
            {
              name: 'npcs',
              path: '',
              component: Characters
            },
            {
              path: 'new',
              component: NewCharacter
            },
            {
              path: ':character_id/edit',
              component: EditCharacter
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
