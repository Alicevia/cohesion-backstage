<template>
  <div>
    <router-view />
    <BindPhone ref="bindphone"></BindPhone>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import BindPhone from '@/components/MyComponents/BindPhone'
import qs from 'qs'
import { reqWeChatLogin } from '@/api/login'
export default {
  name: 'BlankLayout',
  computed: {
    ...mapState({
      token: state => state.user.token
    })
  },
  created() {
    if (location.search) {
      this.handleWeChatLogin()
    }else{
      if (this.token) {
        this.$router.push({path:'/index/view'})
      }else{
        this.$router.push({path:'/user'})
      }
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),
    async handleWeChatLogin() {
      let search = location.search
      let { accessToken, openid } = qs.parse(search, {
        ignoreQueryPrefix: true
      })
      let { data, headers } = await reqWeChatLogin({ accessToken, openid })
      console.log(data)
      if (data.succeed) {
        let userToken = headers['user-token']
        Vue.ls.set(ACCESS_TOKEN, userToken, 7 * 24 * 60 * 60 * 1000)
        this.$store.commit('SET_TOKEN', userToken)
        this.$router.replace({path:'/index/view'})
      } else {
        this.$refs['bindphone'].showModal()
      }
    }
  },
  components: {
    BindPhone
  }
}
</script>

<style scoped>
</style>
