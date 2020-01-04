<template>
  <div class="logo" style="height:110px;lineHeight:110px;backgroundColor:#354052">
    <router-link :to="{name:'index'}">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle" >{{ title }}</h1>
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
