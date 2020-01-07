<template>
  <div>
    <router-link :to="{path:'/monitor/data'}" @click.native="updateProjectId(1)">kk1k</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data () {
    return {
    };
  },

  computed: {},

  mounted(){},

  methods: {
    ...mapActions(['updateProjectId']),
    
  },

  components: {},
}

</script>
<style lang='less' scoped>
</style>