<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <!-- <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer> -->

    <side-menu

      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="false"
      :collapsible="true"
    ></side-menu>

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
    >
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout-content
        :style="{height: '100%',backgroundColor:'#F1F1F1', margin: '24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }"
      >
        <multi-tab v-if="multiTab"></multi-tab>
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <!-- <a-layout-footer>
        <global-footer />
      </a-layout-footer>-->

      <!-- Setting Drawer (show in development mode) -->
      <setting-drawer v-if="!production"></setting-drawer>
    </a-layout>
  </a-layout>
</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'

import RouteView from './RouteView'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import SettingDrawer from '@/components/SettingDrawer'

import { asyncRouterMap } from '@/config/router.config.js' //新增用于自己控制路由
import Bus from '@/utils/bus'
export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer
  },
  data() {
    return {
      production: config.production,
      collapsed: false,
      goBack: false,
      menus: [],
      marginValue: '24px 24px 0'
    }
  },
  computed: {
    ...mapState({
      // 动态主路由 addRouters里面是动态生成的路由 通过发请求之类
      mainMenu: state => state.permission.addRouters,
      projectId:state=>state.projectId
    }),
    contentPaddingLeft() {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      if (this.sidebarOpened) {
        return '256px'
      }
      return '80px'
    }
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val
    }
  },
  created() {
    
    // console.log(asyncRouterMap)
    // console.log(this.$route)//当前路由
    let { path } = this.$route.matched[0]
    // console.log(path)
    // console.log(asyncRouterMap)
    this.menus = asyncRouterMap.find(item => item.path === path).children //用于自己控制路由
    // this.menus = asyncRouterMap.find((item) => item.path === '/').children//用于自己控制路由
    //this.menus = this.mainMenu.find(item => item.path === '/').children
    // this.menus = asyncRouterMap.find(item=>item.path)
    // console.log(this.menus)
    this.collapsed = !this.sidebarOpened
  },

  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    let { path } = to
    // console.log(path)
    // console.log(asyncRouterMap)
    let menus = asyncRouterMap.find(item => item.path !== '/' && path.includes(item.path))
    // console.log(menus)
    this.menus = menus.children
    next()
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
    // 获取所有项目以及具体项目下的分组
    this.getProjectList({ page: 0, size: 16, projectName: this.search||'' })
    if (this.projectId) {
      this.getEquipmentGroup({projectId:this.projectId})
      this.getProjectDeviceParameter({projectId:this.projectId})
      
    }
  },
  methods: {
    ...mapActions(['setSidebar','getProjectList','getEquipmentGroup','getProjectDeviceParameter']),

    toggle() {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc() {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '256px' : '80px'
      } else {
        left = (this.isMobile() && '0') || ((this.fixSidebar && '80px') || '0')
      }
      return left
    },
    menuSelect() {},
    drawerClose() {
      this.collapsed = false
    }
  },
  watch: {
    // $route: {
    //   handler: function(to, from) {
        
    //     if (to.fullPath==='/monitor/map') {
    //       this.marginValue = '24px0 0'
    //     }else{
    //       this.marginValue = '24px 24px 0'
    //     }
    //   },
    //   // 深度观察监听
    //   deep: true
    // }
  }
}
</script>

<style lang="less">
/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
