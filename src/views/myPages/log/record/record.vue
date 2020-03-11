<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <span style="fontSize:16px;marginRight:30px">报警记录：{{4}}</span>
        <span>分组查询：</span>
        <a-select v-model="group"  style="width: 120px;marginRight:20px" placeholder="请选择分组" @change="handleChange">
          <a-select-option v-for="item in equipmentGroup " :value="item.id" :key='item.id' >{{item.groupName}}</a-select-option>
        </a-select>
        <span>设备名称查询：</span>
        <a-input-search v-model="search" placeholder="请输入设备名称" style="width:40%"  @search="searchDeviceLog">
          <a-button slot="enterButton">查询</a-button>
        </a-input-search>
        <!-- <a-button type="primary" style="margin:0 10px 0 10px" @>查询</a-button> -->
      </template>
      <template slot="extra">
        <!-- <a-pagination :defaultCurrent="1" :total="500" /> -->
      </template>
    </PageView>
    <TableShow  rowKey='imi' :columns="columns" :pagination="false" :tableData="logList">
      <template #action="{record}">
        <a-button type="link" size="small">编辑</a-button>|
        <a-button type="danger" size="small">删除</a-button>
      </template>
    </TableShow>
  </div>
</template>

<script>
import TableShow from '@/components/MyComponents/TableShow'
import PageView from '@/layouts/PageView'
import { mapActions, mapState } from 'vuex'
let columns = [
  {
    align: 'center',
    title: '编号',
    dataIndex: 'imi',
    key: 'imi'
  },
  {
    align: 'center',
    title: '设备名称名称',
    dataIndex: 'equipmentName',
    key: 'equipmentName'
  },
  {
    align: 'center',
    title: '所属分组',
    dataIndex: 'equipmentGroup',
    key: 'equipmentGroup'
  },
  {
    align: 'center',
    title: '日志类型',
    dataIndex: 'journalType',
    key: 'journalType'
  },
  {
    align: 'center',
    title: '内容',
    key: 'journalText',
    dataIndex: 'journalText'
  },
  {
    align: 'center',
    title: '发生时间',
    key: 'date',
    dataIndex: 'date'
    // scopedSlots: { customRender: 'action' }
  }
]

export default {
  data() {
    return {
      columns,
      group:'请选择分组',
      search:''
    }
  },

  computed: {
    ...mapState({
      projectId: state => state.projectId,
      logList: state => state.log.logList,
      equipmentGroup:state=>state.manage.equipmentGroup.list
    })
  },
  created() {
    this.getLogInfo({ projectId: this.projectId })
  },
  mounted() {},

  methods: {
    ...mapActions(['getLogInfo']),
    // 选择分组回调
    handleChange(value) {
      this.getLogInfo({groupId:value,projectId:this.projectId})

    },
    // 搜索指定设备日志
    searchDeviceLog(value) {
      this.group='请选择分组'
      this.getLogInfo({projectId:this.projectId,groupName:value})
    }
  },
  watch:{
    projectId:{
      handler:function(newValue,oldValue){
        this.getLogInfo({ projectId: newValue })
      } 
    },
    search:{
      handler:function(newValue,oldValue){
        if (!newValue) {
          this.getLogInfo({ projectId: this.projectId叫·的v 
           })
        }
       
      } 
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