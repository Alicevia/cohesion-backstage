<template>
  <div class="logo" style="height:110px;lineHeight:110px;backgroundColor:#354052">
    <router-link :to="{name:'index'}">
      <!-- <LogoSvg alt="logo" /> -->
      <img class="logo-nj-icon" src="@/assets/images/logo-icon.png" alt />
      <img class="logo-nj" v-if="showTitle" src="@/assets/images/nj.png" alt />
      <!-- <h1 v-if="showTitle" >{{ title }}</h1> -->
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '凝聚通讯',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
<style lang='less' scoped >
.logo {
  .logo-nj-icon{
    width: 45px;
    height: 45px;
  }
  .logo-nj {
    width: 130px;
    height:50px;
  }
}
</style>