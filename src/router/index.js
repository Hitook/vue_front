import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Trivia from '../views/Trivia.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'log-in',
    component: LogIn
  },
  {
    path: '/my-account',
    name: 'my-account',
    component: MyAccount
  },
  {
    path: '/:category_slug',
    name: 'Category',
    component: Category
  },
  {
    path: '/:trivia_slug',
    name: 'Trivia',
    component: Trivia
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
