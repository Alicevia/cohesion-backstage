<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <span style="fontSize:16px;marginRight:30px">报警记录：{{4}}</span>
        <a-select style="width: 120px;marginLeft:50px" placeholder="请选择分组" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <a-button type="primary" style="margin:0 10px 0 10px">查询</a-button>
      </template>
      <template slot="extra">
        <a-pagination :defaultCurrent="1" :total="500" />
      </template>
    </PageView>
    <TableShow :columns="columns" :tableData="dataSource">
      <template #action="{record}">
        <a-button type="link" size="small">编辑</a-button>|
        <a-button type="danger" size="small">删除</a-button>
      </template>
    </TableShow>
  </div>
</template>

<script>
let columns = [
  {
    align: 'center',
    title: '编号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    align: 'center',
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    align: 'center',
    title: '备注',
    dataIndex: 'remark',
    key: 'remark'
  },
  {
    align: 'center',
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
let dataSource = []
for (let i = 0; i < 20; i++) {
  dataSource.push({
    id: i,
    name: '张三' + i,
    remark: '备注' + i
  })
}
console.log(dataSource)
import TableShow from '@/components/MyComponents/TableShow'
import PageView from '@/layouts/PageView'
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
    handleChange(){
      
    }
  },

  components: {
    TableShow,
    PageView
  }
}
</script>
<style lang='less' scoped>
</style>