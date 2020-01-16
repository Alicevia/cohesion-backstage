<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <span style="fontSize:16px;marginRight:30px">设备管理：{{4}}</span>
        <a-select style="width: 120px;marginLeft:20px" placeholder="请选择分组" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <a-button type="primary" style="margin:0 10px 0 10px">新增设备</a-button>
      </template>
      <template slot="extra">
        <a-pagination :defaultCurrent="1" :total="equipment.total" />
      </template>
    </PageView>
    <TableShow :columns="columns" :pagination='false' :tableData="equipment.list">
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

import TableShow from '@/components/MyComponents/TableShow'
import PageView from '@/layouts/PageView'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      columns,
      dataSource,
      page:0,
      total:0,
      size:16
    }
  },

  computed: {
    ...mapState({
      equipment:state=>state.manage.equipment,
      projectId:state=>state.projectId
    })
  },

  mounted() {
    this.getAllEquipment({page:0,size:16,projectId:26 })
  },

  methods: {
    ...mapActions(['getAllEquipment']),
    handleChange(id){
      console.log(id)
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