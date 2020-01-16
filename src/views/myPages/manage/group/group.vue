<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <span style="fontSize:16px;marginRight:30px">分组管理：{{equipmentGroup.total}}</span>
        <a-button @click="addEquipmentGroup" type="primary" style="margin:0 10px 0 0">新增分组</a-button>
      </template>
      <template slot="extra">
        <!-- <a-pagination :defaultCurrent="1" :total="equipmentGroup.total" /> -->
      </template>
    </PageView>
    <TableShow :columns="columns" :pagination="false" :tableData="equipmentGroup.list">
      <template #action="{record}">
        <a-button @click="modiEquipmentGroup(record)" type="link" size="small">编辑</a-button>|
        <a-button @click="deleteEquipmentGroup(record.id)" type="danger" size="small">删除</a-button>
      </template>
      <template #remarks="{record}">
        <a-popover>
          <template slot="content">
            <p>{{record.remarks}}</p>
          </template>
          <span class="hide-rest">{{record.remarks}}</span>
        </a-popover>
      </template>
    </TableShow>
    <EquipmentGroupDialog
      ref="egroup"
      @clearInfo="clearInfo"
      @updateInfo="updateInfo"
      :title="title"
      :project="group"
      :page="page"
    ></EquipmentGroupDialog>
  </div>
</template>

<script>
let columns = [
  {
    align: 'center',
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 70
  },
  {
    align: 'center',
    title: '名称',
    dataIndex: 'groupName',
    key: 'groupName'
  },
  {
    align: 'center',
    title: '备注',
    scopedSlots: { customRender: 'remarks' },
    key: 'remarks'
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
import EquipmentGroupDialog from './components/EquipmentGroupDialog'
import {reqDeleteEquipmentGroup} from '@/api/manage'
import utils from '../../../../utils/myUtils'
export default {
  data() {
    return {
      columns,
      size: 16,
      page: 0,
      group: {},
      title: '新增设备分组'
    }
  },

  computed: {
    ...mapState({
      equipmentGroup: state => state.manage.equipmentGroup,
      projectId: state => state.projectId
    })
  },
  created() {
    this.getEquipmentGroup({ projectId: this.projectId })
  },
  mounted() {},
  activated() {
    this.getEquipmentGroup({ projectId: this.projectId })
  },
  methods: {
    ...mapActions(['getEquipmentGroup']),
    // 新增分组
    addEquipmentGroup() {
      this.title = '新增设备分组'
      this.group={}
      this.$refs['egroup'].showModal()
    },
    // 修改分组
    modiEquipmentGroup(item) {
      this.group = item
      this.title = '修改设备分组'
      this.$refs['egroup'].showModal()
    },
    // 修改分组
    deleteEquipmentGroup(id) {
      reqDeleteEquipmentGroup({equipmentGroupId:id}).then(({data})=>{
        utils.detailBackCode(data,{s:'删除设备分组成功'},()=>{
          this.getEquipmentGroup({ projectId: this.projectId })
        })
      })
    },
    updateInfo() {
      this.getEquipmentGroup({ projectId: this.projectId })
    },
    clearInfo() {
      this.group = {}
    }
  },
  watch: {},
  components: {
    TableShow,
    PageView,
    EquipmentGroupDialog
  }
}
</script>
<style lang='less' scoped>
.hide-rest {
  display: block;
  text-align: center;
  margin: 0 auto;
  width: 220px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>