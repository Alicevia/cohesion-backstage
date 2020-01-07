<template>
  <div>{{projectId}}</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
    };
  },

  computed: {
    ...mapState(['projectId'])
  },

  mounted(){
    // console.log(this.$route)
  },

  methods: {},

  components: {},
}

</script>
<style lang='less' scoped>
</style>