<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <span style="fontSize:16px;marginRight:30px">设备管理：{{4}}</span>
        <a-select style="width: 180px;marginLeft:20px" placeholder="请选择分组" @change="handleChange">
          <a-select-option value="all">查看所有分组设备</a-select-option>
          <a-select-option
            v-for="item in equipmentGroupList"
            :value="item.id"
            :key="item.id"
          >{{item.groupName}}</a-select-option>
        </a-select>
        <a-button @click="addEquipment" type="primary" style="margin:0 10px 0 10px">新增设备</a-button>
      </template>
      <template slot="extra">
        <a-pagination :defaultCurrent="1" :total="equipment.total" />
      </template>
    </PageView>
    <TableShow :columns="columns" :pagination="false" :tableData="equipment.list">
      <template #action="{record}">
        <a-button type="link" size="small">编辑</a-button>|
        <a-button type="danger" size="small">删除</a-button>
      </template>
      <template #alarm="{record}">
        <span>{{record.alarmInfo?'是':'否'}}</span>
      </template>
      <template #status="{record}">
        <span>{{record.isRun?'正常':'故障'}}</span>
      </template>
      <template #set="{record}">
        <a-button @click="deviceSet" type="link" size="small">设置</a-button>
      </template>
    </TableShow>
    <DeviceDialog
      ref="device"
      @clearInfo="clearInfo"
      @updateInfo="updateInfo"
      :page="page"
      :project="device"
      :title="title"
    ></DeviceDialog>
    <DeviceSetDialog
      ref="deviceset"
      @clearInfo="clearInfo"
      @updateInfo="updateInfo"
      :page="page"
      :project="device"
      title="参数设置"
    ></DeviceSetDialog>
  </div>
</template>

<script>
let columns = [
  {
    align: 'center',
    title: '缩略图',
    dataIndex: 'modelImg',
    key: 'modelImg'
  },
  {
    align: 'center',
    title: '设备编号',
    dataIndex: 'imei',
    key: 'imei'
  },

  {
    align: 'center',
    title: '设备名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    align: 'center',
    title: '设备状态',
    scopedSlots: { customRender: 'status' },
    key: 'isRun'
  },
  {
    align: 'center',
    title: '所属类型',
    dataIndex: 'groupName',
    key: 'groupName'
  },
  {
    align: 'center',
    title: '报警信息推送',
    scopedSlots: { customRender: 'alarm' },
    key: 'alarmInfo'
  },
  {
    align: 'center',
    title: '参数设置',
    key: 'set',
    scopedSlots: { customRender: 'set' }
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
import DeviceDialog from './components/DeviceDialog'
import DeviceSetDialog from './components/DeviceSetDialog'
export default {
  data() {
    return {
      columns,
      page: 0,
      total: 0,
      size: 16,
      title: '新增设备',
      device: {},

    }
  },

  computed: {
    ...mapState({
      equipment: state => state.manage.equipment,
      projectId: state => state.projectId,
      equipmentGroupList: state => state.manage.equipmentGroup.list //分组列表
    })
  },

  mounted() {
    this.getAllEquipment({ page: 0, size: 16, projectId: 26 })
  },

  methods: {
    ...mapActions(['getAllEquipment', 'getGroupEquipment']),
    handleChange(type) {
      if (type !== 'all') {
        this.getGroupEquipment({ page: 0, size: 16, groupId: type })
      } else {
        this.getAllEquipment({ page: 0, size: 16, projectId: this.projectId })
      }
    },
    deviceSet(){
      this.$refs['deviceset'].showModal()
    },
    // 新增项目
    addEquipment() {
      this.title = '新增设备'
      this.device = {}
      this.$refs['device'].showModal()
    },
    // 修改项目
    modiEquipment(item) {
      this.device = item
      this.title = '修改设备'
      this.$refs['device'].showModal()
    },
    // 修改项目
    deleteEquipment(id) {
      reqDeleteEquipmentGroup({ equipmentGroupId: id }).then(({ data }) => {
        utils.detailBackCode(data, { s: '删除设备成功' }, () => {
          this.getEquipmentGroup({ projectId: this.projectId })
        })
      })
    },
    updateInfo() {},
    clearInfo() {
      this.device = {}
    }
  },

  components: {
    TableShow,
    PageView,
    DeviceDialog,
    DeviceSetDialog
  }
}
</script>
<style lang='less' scoped>
</style>