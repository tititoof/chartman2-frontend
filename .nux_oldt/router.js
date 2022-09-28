import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6f8a95ef = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _715b6d48 = () => interopDefault(import('../pages/authenticate.vue' /* webpackChunkName: "pages/authenticate" */))
const _418b6a32 = () => interopDefault(import('../pages/legal_notices.vue' /* webpackChunkName: "pages/legal_notices" */))
const _4eb3c84f = () => interopDefault(import('../pages/redirect.vue' /* webpackChunkName: "pages/redirect" */))
const _62cd7975 = () => interopDefault(import('../pages/tutorials/index.vue' /* webpackChunkName: "pages/tutorials/index" */))
const _cc02d1d4 = () => interopDefault(import('../pages/admin/article/index.vue' /* webpackChunkName: "pages/admin/article/index" */))
const _dbc6b800 = () => interopDefault(import('../pages/admin/cards.vue' /* webpackChunkName: "pages/admin/cards" */))
const _a6549e98 = () => interopDefault(import('../pages/admin/category/index.vue' /* webpackChunkName: "pages/admin/category/index" */))
const _a94b9c3e = () => interopDefault(import('../pages/blog/my_ror_design.vue' /* webpackChunkName: "pages/blog/my_ror_design" */))
const _f5ed8838 = () => interopDefault(import('../pages/admin/article/new.vue' /* webpackChunkName: "pages/admin/article/new" */))
const _7f762502 = () => interopDefault(import('../pages/admin/category/new.vue' /* webpackChunkName: "pages/admin/category/new" */))
const _715366fe = () => interopDefault(import('../pages/admin/article/_id.vue' /* webpackChunkName: "pages/admin/article/_id" */))
const _6bc0501c = () => interopDefault(import('../pages/admin/category/_id.vue' /* webpackChunkName: "pages/admin/category/_id" */))
const _42230e04 = () => interopDefault(import('../pages/tutorials/article/_id.vue' /* webpackChunkName: "pages/tutorials/article/_id" */))
const _9634ec54 = () => interopDefault(import('../pages/tutorials/category/_id.vue' /* webpackChunkName: "pages/tutorials/category/_id" */))
const _1839bc6f = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _6f8a95ef,
    name: "admin"
  }, {
    path: "/authenticate",
    component: _715b6d48,
    name: "authenticate"
  }, {
    path: "/legal_notices",
    component: _418b6a32,
    name: "legal_notices"
  }, {
    path: "/redirect",
    component: _4eb3c84f,
    name: "redirect"
  }, {
    path: "/tutorials",
    component: _62cd7975,
    name: "tutorials"
  }, {
    path: "/admin/article",
    component: _cc02d1d4,
    name: "admin-article"
  }, {
    path: "/admin/cards",
    component: _dbc6b800,
    name: "admin-cards"
  }, {
    path: "/admin/category",
    component: _a6549e98,
    name: "admin-category"
  }, {
    path: "/blog/my_ror_design",
    component: _a94b9c3e,
    name: "blog-my_ror_design"
  }, {
    path: "/admin/article/new",
    component: _f5ed8838,
    name: "admin-article-new"
  }, {
    path: "/admin/category/new",
    component: _7f762502,
    name: "admin-category-new"
  }, {
    path: "/admin/article/:id",
    component: _715366fe,
    name: "admin-article-id"
  }, {
    path: "/admin/category/:id",
    component: _6bc0501c,
    name: "admin-category-id"
  }, {
    path: "/tutorials/article/:id?",
    component: _42230e04,
    name: "tutorials-article-id"
  }, {
    path: "/tutorials/category/:id?",
    component: _9634ec54,
    name: "tutorials-category-id"
  }, {
    path: "/",
    component: _1839bc6f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
