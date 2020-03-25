<template>
  <div>
    <PageView :title='false'>
    </PageView>

    <Chart v-for="item in tableNumber" :key="item.id" :id='item.id' :title='item.title'></Chart>    
    <a-button v-show="hideBtn" type="primary"  @click="increament">添加图表</a-button>
    
  </div>
</template>

<script>
import PageView from '@/layouts/PageView'
import Chart from '../components/chart'
export default {
  data () {
    return {
      tableNumber:[
       
      ],

    };
  },

  computed: {
    hideBtn(){
      if(this.tableNumber.length>=2){
        return false
      }
      return true
    }
  },

  mounted(){},

  methods: {
    // 添加图表
    increament(){
      let length = this.tableNumber.length+1
      this.tableNumber.push({id:`myChat${length}`,title:`图表${length}`})
    }
  },

  components: {
    PageView,Chart
  },
}

</script>
<style lang='less' scoped>
</style>