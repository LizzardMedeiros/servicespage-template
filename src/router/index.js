import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)
Vue.use(Router)

export default new Router({
  	routes: [
	    {
	      path: '/',
	      name: 'Home',
	      component: Home
			},
	  	{
	      path: '/login',
	      name: 'Login',
	      component: Login
			},
	  	{
	      path: '/register',
	      name: 'Register',
	      component: Register
	    },
	  	{
	      path: '/dashboard',
	      name: 'Dashboard',
	      component: Dashboard
	    }
  	]
})
