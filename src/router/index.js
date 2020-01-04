import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap,asyncRouterMap } from '@/config/router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes:constantRouterMap.concat(asyncRouterMap)
  // routes: constantRouterMap//先传入的是基本路由 后期通过addRoutes添加新路由
})