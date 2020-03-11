<template>
  <div>
    <PageView :title='false'>
    </PageView>
    <Chart></Chart>
  </div>
</template>

<script>
import PageView from '@/layouts/PageView'
import Chart from '../components/chart'
export default {
  data () {
    return {
    };
  },

  computed: {},

  mounted(){},

  methods: {},

  components: {
    PageView,Chart
  },
}

</script>
<style lang='less' scoped>
</style>