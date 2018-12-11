import Vue from 'vue'
import store from './store.js'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Dashboard from './views/Dashboard.vue'
import History_view from './views/History.vue'
import Settings from './views/Settings.vue'
import Profile from './views/Profile.vue'
import Messages from './views/Messages.vue'
import Notification_view from './views/Notification.vue'
import Change_password from './views/Change_password.vue'
import Change_email from '@/views/Change_email.vue'
import Blocked from '@/views/Blocked.vue'
import Reset_password from '@/views/Reset_password.vue'
import Confirm_account from '@/views/Confirm_account.vue'
import Confirm_new_email from '@/views/Confirm_new_email.vue'
import Admin from '@/views/Admin.vue'

Vue.use(Router)

const if_isNotAuth = (to, from, next) => {
  if (!store.getters.is_loggued) {
    next();
    return ;
  }
  next('/dashboard');
}

const if_isAuth = (to, from, next) => {
  if (store.getters.is_loggued) {
    next();
    return ;
  }
  next('/');
}

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        guest: true
      }
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/history',
      name: 'history',
      component: History_view,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/notification',
      name: 'notification',
      component: Notification_view,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      component: Settings,
      redirect: '/settings/profile',
      children: [
        {
          path: 'profile',
          component: Profile,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'change_password',
          component: Change_password,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'change_email',
          component: Change_email,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'blacklist',
          component: Blocked,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/reset/:id',
      name: 'reset',
      component: Reset_password,
      meta: {
        guest: true
      }
    },
    {
      path: '/confirm/:token',
      name: 'confirm',
      component: Confirm_account,
      meta: {
        guest: true
      }
    },
    {
      path: '/confirmnewemail/:confirm_code',
      name: 'confirmnewemail',
      component: Confirm_new_email,
      meta: {
        guest: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth))
    localStorage.getItem('token') == null ? next('/') : next();
  else if (to.matched.some(record => record.meta.guest))
    localStorage.getItem('token') == null ? next() : next('/dashboard');
  else
    next();
})

export default router