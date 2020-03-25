<template>
    <div class="chart">
      <div class="title">{{title}}</div>
      <div class="select">
        <div style="float:left;marginLeft:40px">
          <span>数据：</span>
          <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
            <a-select-option value="jack">实时</a-select-option>
            <a-select-option value="lucy">日</a-select-option>
            <a-select-option value="Yiminghe">周</a-select-option>
            <a-select-option value="Yiminghe">月</a-select-option>
          </a-select>
          <span style="marginLeft:30px">分组：</span>
          <a-select placeholder='请选择分组' style="width: 120px" @change="handleGroupChange">
            <a-select-option v-for="item in equipmentGroupList" :key='item.id' :value="item.id">{{item.groupName}}</a-select-option>
          </a-select>
          <span style="marginLeft:30px">设备：</span>
          <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
            <a-select-option v-for="item in groupAllEquipment" :key="item.equipmentGroupId" :value="item.equipmentGroupId">{{item.name}}</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>
        <a-button style="float:right" type="primary">导出数据</a-button>
      </div>
      <div class="parameter" style="paddingLeft:230px">
        <a-radio-group name="radioGroup" :defaultValue="1">
          <a-radio :value="1">温度</a-radio>
          <a-radio :value="2">压力</a-radio>
          <a-radio :value="3">温度</a-radio>
          <a-radio :value="4">压力</a-radio>
        </a-radio-group>
      </div>
      <div class="sheet" :id="id"></div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: 'myChart'
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  computed: {
    ...mapState({
      equipmentGroupList: state => state.manage.equipmentGroup.list,
      groupAllEquipment:state=>state.manage.groupAllEquipment.list
    })
  },

  mounted() {
    this.drawLine()
  },

  methods: {
    ...mapActions('getGroupAllEquipment'),
    handleChange(value) {
      console.log(value)
    },
    handleGroupChange(groupId){
      let payload = {groupId,page:0,size:999}
      this.getGroupAllEquipment(payload)
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
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px dashed rgb(158, 158, 158);
  margin-bottom: 40px;
  &:last-of-type {
    border: none;
  }
  .parameter {
    padding-top: 20px;
    padding-left: 40px;
    margin-bottom: 20px;
  }
  .sheet{
    position: relative;
    width: 100%;
    height: 400px;
    canvas {
      position: absolute;
      left: 20px;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>