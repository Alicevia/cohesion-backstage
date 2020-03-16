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
        <span  style="marginLeft:30px">设备：</span>
        <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </div>
      <a-button style="float:right" type="primary">导出数据</a-button>
    </div>
    <div class="parameter">
      <a-radio-group name="radioGroup" :defaultValue="1">
        <a-radio :value="1">温度</a-radio>
        <a-radio :value="2">压力</a-radio>
        <a-radio :value="3">温度</a-radio>
        <a-radio :value="4">压力</a-radio>
      </a-radio-group>
    </div>
    <div class="sheet">4</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  computed: {},

  mounted() {},

  methods: {
    handleChange(value) {
      console.log(value)
    }
  },

  components: {}
}
</script>
<style lang='less' scoped>
.chart {
  display: flex;
  flex-direction: column;
  .parameter{
    padding-top: 20px;
    padding-left: 40px;
    margin-bottom: 20px;

  }
}
</style>