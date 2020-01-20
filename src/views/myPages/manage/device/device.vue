<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <span style="fontSize:16px;marginRight:30px">设备管理：{{equipment.total}}</span>
        <a-select
          style="width: 180px;marginLeft:20px"
          placeholder="查询设备分组下的设备"
          @change="handleChange"
          :defaultValue="type"
        >
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
      <template #modelImg="{record}">
        <img class="modelImg" :src="record.modelImg" alt />
      </template>
      <template #action="{record}">
        <a-button @click="modiEquipment(record)" type="link" size="small">编辑</a-button>|
        <a-button @click="deleteEquipment(record.id)" type="danger" size="small">删除</a-button>
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
    scopedSlots: { customRender: 'modelImg' },
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
    title: '设备分组',
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
import { reqDeleteEquipment } from '@/api/manage'
import utils from '../../../../utils/myUtils'
export default {
  data() {
    return {
      columns,
      page: 0,
      total: 0,
      size: 16,
      title: '新增设备',
      device: {},
      type: 'all'
    }
  },

  computed: {
    ...mapState({
      equipment: state => state.manage.equipment,
      projectId: state => state.projectId,
      equipmentGroupList: state => state.manage.equipmentGroup.list //分组列表
    })
  },
  created() {},
  mounted() {
    this.getAllEquipment({ page: 0, size: 16, projectId: this.projectId })
    if (!this.equipmentGroupList.total) {
      this.getEquipmentGroup({ projectId: this.projectId })
    }
  },

  methods: {
    ...mapActions(['getAllEquipment', 'getGroupEquipment', 'getEquipmentGroup']),
    // 切换分组获取分组下的项目
    handleChange(type) {
      this.type = type
      this.updateEquipmentList(type)
    },
    // 更新设备列表
    updateEquipmentList(type = 'all') {
      if (type === 'all') {
        this.getAllEquipment({ page: 0, size: 16, projectId: this.projectId })
      } else {
        this.getGroupEquipment({ page: 0, size: 16, groupId: type })
      }
    },
    // 设置各种类型设备
    deviceSet() {
      this.$refs['deviceset'].showModal()
    },
    // 新增项目
    addEquipment() {
      this.title = '新增设备'
      this.device = {}
      this.$refs['device'].showModal()
    },
    // 修改设备
    modiEquipment(item) {
      this.device = item
      this.title = '修改设备'
      this.$refs['device'].showModal()
    },
    // 删除设备
    deleteEquipment(id) {
      // id为设备id
      reqDeleteEquipment({ equipmentId: id, projectId: this.projectId }).then(({ data }) => {
        utils.detailBackCode(data, { s: '删除设备成功' }, () => {
          this.updateEquipmentList(this.type)
        })
      })
    },
    updateInfo(type) {
      this.type = type
      this.updateEquipmentList(type)
    },
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
.modelImg {
  width: 30px;
  height: 30px;
}
</style>