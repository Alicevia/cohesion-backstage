<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import { AppDeviceEnquire } from '@/utils/mixin'

import { mapState } from 'vuex'
export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {}
  },
  created() {
  },
  mounted() {
    
  },
  computed: {
    ...mapState({
      token: state => state.user.token
    })
  },
  methods: {
    
   
  },
  components: {
   
  }
}
</script>
<style>
@import '~@/assets/iconfont/iconfont.css';
#app {
  height: 100%;
}
</style>
