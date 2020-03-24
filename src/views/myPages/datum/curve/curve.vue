<template>
  <div>
    <PageView :title='false'>
    </PageView>

    <Chart v-for="item in tableNumber" :key="item.id" :id='item.id'></Chart>    
    <Button @click="increament">添加</Button>
  </div>
</template>

<script>
import PageView from '@/layouts/PageView'
import Chart from '../components/chart'
export default {
  data () {
    return {
      tableNumber:[
        {id:'myChart'},
      ]
    };
  },

  computed: {},

  mounted(){},

  methods: {
    // 添加图表
    increament(){
      let length = this.tableNumber.length+1
      this.tableNumber.push({id:`myChat${length}`})
    }
  },

  components: {
    PageView,Chart
  },
}

</script>
<style lang='less' scoped>
</style>