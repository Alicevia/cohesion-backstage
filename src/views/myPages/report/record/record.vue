<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <div>
          <span>报表：</span>
          <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
            <a-select-option value="jack">日</a-select-option>
            <a-select-option value="lucy">周</a-select-option>
            <a-select-option value="month">月</a-select-option>

          </a-select>
        </div>
      </template>
      <template #extra>
        <a-button type="primary">导出数据</a-button>
      </template>
    </PageView>
    <a-checkbox style="marginBottom:10px" @change="onChange">传感器</a-checkbox>
    <TableShow
      :scroll="{y:200}"
      rowKey="imei"
      :columns="columns"
      :tableData="dataSource"
      :pagination="false"
    ></TableShow>
    <a-checkbox style="marginBottom:10px" @change="onChange">传感器</a-checkbox>
    <TableShow
      :scroll="{y:200}"
      rowKey="imei"
      :columns="columns"
      :tableData="dataSource"
      :pagination="false"
    ></TableShow>
        <a-checkbox style="marginBottom:10px" @change="onChange">传感器</a-checkbox>
    <TableShow
      :scroll="{y:200}"
      rowKey="imei"
      :columns="columns"
      :tableData="dataSource"
      :pagination="false"
    ></TableShow>
  </div>
</template>

<script>
import PageView from '@/layouts/PageView'
import TableShow from '@/components/MyComponents/TableShow'
let columns = [
  {
    align: 'center',
    title: '设备名称',
    dataIndex: 'modelImg',
    key: 'modelImg',
    width: '15%'
  },
  {
    align: 'center',
    title: '最大值',
    dataIndex: 'imei',
    key: 'imei',
    width: '15%'
  },

  {
    align: 'center',
    title: '最小值',
    dataIndex: 'name',
    key: 'name',
    width: '15%'
  },
  {
    align: 'center',
    title: '平均值',
    dataIndex: 'isRun',
    key: 'isRun',
    width: '15%'
  },
  {
    align: 'center',
    title: '时间',
    dataIndex: 'groupName',
    key: 'groupName',
    width: '15%'
  }
]
let dataSource = []
for (let i = 0; i < 10; i++) {
  dataSource.push({
    groupName: `张三${i}`,
    isRun: `张三${i}`,
    name: `张三${i}`,
    imei: `张三${i}`,
    modelImg: `张三${i}`
  })
}
export default {
  data() {
    return {
      columns,
      dataSource
    }
  },

  computed: {},

  mounted() {},

  methods: {
    handleChange() {},
    onChange() {}
  },

  components: {
    PageView,
    TableShow
  }
}
</script>
<style lang='less' scoped>
</style>