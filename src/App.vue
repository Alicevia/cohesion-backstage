<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'
import qs from 'qs'
import { reqWeChatLogin } from '@/api/login'
export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {
      locale: zhCN
    }
  },
  created() {
    this.handleWeChatLogin()
  },
  mounted() {
  },
  methods: {
    async handleWeChatLogin() {
      let search = location.search
      let { accessToken, openid } = qs.parse(search, {
        ignoreQueryPrefix: true
      })
      let { data, headers } = await reqWeChatLogin({ accessToken, openid })
      if (data.succeed) {
        let userToken = headers['user-token']
        Vue.ls.set(ACCESS_TOKEN, userToken, 7 * 24 * 60 * 60 * 1000)
        this.$store.commit('SET_TOKEN', userToken)
      }
    }
  }
}
</script>
<style>
@import '~@/assets/iconfont/iconfont.css';
#app {
  height: 100%;
}
</style>
