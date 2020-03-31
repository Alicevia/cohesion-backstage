<template>
  <div class="chart">
    <div class="title">{{title}}</div>
    <div class="select">
      <a-spin :spinning="spinning">
        <div style="float:left;marginLeft:40px">
          <span>数据：</span>
          <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
            <a-select-option value="jack">实时</a-select-option>
            <a-select-option value="lucy">日</a-select-option>
            <a-select-option value="Yiminghe">周</a-select-option>
            <a-select-option value="23">月</a-select-option>
          </a-select>
          <span style="marginLeft:30px">分组：</span>
          <a-select
            v-model="equipmentGroup"
            placeholder="请选择分组"
            style="width: 120px"
            @change="handleGroupChange"
          >
            <a-select-option
              v-for="item in equipmentGroupList"
              :key="item.id"
              :value="item.id"
            >{{item.groupName}}</a-select-option>
          </a-select>

          <span style="marginLeft:30px">设备：</span>
          <a-select
            :disabled="!equipmentGroup"
            v-model="equipmentId"
            placeholder="请选择设备"
            style="width: 120px"
            @change="handleEquipmentChange"
          >
            <a-select-option
              v-for="item in groupAllEquipment"
              :key="item.id"
              :value="item.id"
            >{{item.name}}</a-select-option>
          </a-select>
        </div>
        <a-button style="float:right" type="primary">导出数据</a-button>
      </a-spin>
    </div>
    <div class="parameter" style="paddingLeft:80px;paddingTop:30px;width:90%">
      <a-radio-group name="radioGroup" @change="handleParameterChange" v-model="parameter">
        <a-radio
          style="width:120px"
          v-for="(value,key) in equipmentParameter"
          :key="value"
          :value="value"
        >{{key}}</a-radio>
      </a-radio-group>
    </div>
    <div class="sheet" :id="id"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {reqGetEquipmentLiveData} from '@/api/datum'
import { message } from 'ant-design-vue'
export default {
  props: {
    id: {
      type: String,
      default: 'myChart'
    },
    title: {
      type: String
    },
    type:String
  },
  data() {
    return {
      equipmentGroup: undefined,//设备分组
      equipmentId: undefined,//设备id
      parameter: undefined,//当前选择的参数
      spinning: false,
      parameterData: [],//所有设备的参数类别
      equipmentLiveData:{}//设备的实时数据
    }
  },

  computed: {
    ...mapState({
      equipmentGroupList: state => state.manage.equipmentGroup.list,
      groupAllEquipment: state => state.manage.groupAllEquipment.list,
      allEquipmentParameter: state => state.datum.allEquipmentParameter,

    }),
    equipmentParameter() {
      let equipmentId = this.equipmentId
      if (equipmentId) {
        return this.allEquipmentParameter[equipmentId]
      }
      return {}
    },
    options: {
      get() {
        let { equipmentLiveData, parameter, parameterData,type } = this
        console.log(equipmentLiveData, parameter)

        if (parameterData.length >= 20) {
          parameterData.push(equipmentLiveData[parameter])
          parameterData.shift()
        } else {
          parameterData.push(equipmentLiveData[parameter])
        }

        console.log(parameterData)
        return {
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: parameterData,
              type,
              smooth: true
            }
          ]
        }
      }
    }
  },

  mounted() {
    this.drawLine()
  },

  methods: {
    ...mapActions(['getGroupAllEquipment']),
    // 切换实时日周月回调
    handleChange(value) {
      // clearInterval(this.timer)
    },
    // 轮询选中设备的实时的数据
    pollingEquipmentData(payload) {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.getEquipmentLiveData(payload).catch(()=>{
          clearInterval(this.timer)
        })
      },1000)
    },
    // 获取选择设备的实时信息
    async getEquipmentLiveData(payload){
    let {data:{succeed,data,message:status}} =await reqGetEquipmentLiveData(payload)
      if (succeed) {
        this.equipmentLiveData = data
      }else{
        message.error(status)
        return Promise.reject()
      }
    },
    // 选择参数的回调
    handleParameterChange() {
      this.parameterData = []
      this.pollingEquipmentData({equipmentId:this.equipmentId })
    },
    // 选择设备的回调
    handleEquipmentChange(equipmentId) {
      if (this.timer) {
        clearInterval(this.timer)
      }
       this.parameter=undefined
    },
    // 选择设备分组的回调
    handleGroupChange(groupId) {
      if (this.timer) {
        clearInterval(this.timer)
      }
      let payload = { groupId, page: 0, size: 999 }
      this.spinning = true
      this.getGroupAllEquipment(payload).then(() => {
        this.spinning = false
        // if (this.groupAllEquipment.length !== 0) {
        //   this.equipment = this.groupAllEquipment[0].id
        // }else{
        //   this.equipment = ''
        // }
        this.equipmentId = undefined,
        this.parameter=undefined
      })
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.id))
      // 绘制图表
      this.myChart = myChart
      this.myChart.setOption(this.options)
    }
  },
  deactivated() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  watch: {
    equipmentLiveData: {
      handler: function() {
        this.myChart.setOption(this.options)
      }
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
  .sheet {
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