import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'
import notification from 'ant-design-vue/es/notification'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)



let router = new Router({
  mode: 'hash',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap)
  // routes: constantRouterMap//先传入的是基本路由 后期通过addRoutes添加新路由
})

router.beforeEach((to, from, next) => {
  let token = store.state.user.token
  if (to.matched[0].path.includes('/user')) {
    next()
  } else {
    if (token) {
      next()
    } else {
      notification.error({
        message: '您还未登录',
        description: '请登录'
      })
      next({ path: '/user' })
    }
  }

})


export default router