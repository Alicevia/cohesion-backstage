<template>
  <div class="chart">
    <div class="title">图表一</div>
    <div class="select">
      <div style="float:left;marginLeft:40px">
        <span>实时：</span>
        <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <span style="marginLeft:30px">分组：</span>
        <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <span style="marginLeft:30px">设备：</span>
        <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </div>
      <a-button style="float:right" type="primary">导出数据</a-button>
    </div>
    <div class="parameter" style="paddingLeft:230px" >
      <a-radio-group name="radioGroup" :defaultValue="1">
        <a-radio :value="1">温度</a-radio>
        <a-radio :value="2">压力</a-radio>
        <a-radio :value="3">温度</a-radio>
        <a-radio :value="4">压力</a-radio>
      </a-radio-group>
    </div>
    <div class="sheet">
      <div style="height:400px;width: 90%" :id="id"></div>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    id:{
      type:String,
      default:'myChart'
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  computed: {},

  mounted() {
    this.drawLine()
  },

  methods: {
    handleChange(value) {
      console.log(value)
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.id))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      })
    }
  },

  components: {}
}
</script>
<style lang='less' scoped>
.chart {
  display: flex;
  flex-direction: column;
  .parameter {
    padding-top: 20px;
    padding-left: 40px;
    margin-bottom: 20px;
  }
}
</style>