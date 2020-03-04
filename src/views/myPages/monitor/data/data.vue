<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <a-radio-group @change="onChange" v-model="showMethod">
          <a-radio value="data">数据</a-radio>
          <a-radio value="table">列表</a-radio>
        </a-radio-group>

        <a-select style="width: 120px;marginLeft:50px" placeholder="请选择分组" @change="handleChange">
          <a-select-option v-for="item in equipmentGroup.list" :key="item.id" :value="item.id">{{item.groupName}}</a-select-option>
        </a-select>
        <a-input style="width:200px;margin:0 10px"  @change="onSearchChange"  v-model="searchDevice" placeholder="请输入设备名称" />

        <a-button type="primary" style="margin:0 10px 0 0">查询</a-button>
      </template>
      <template slot="extra">
        <a-pagination :defaultCurrent="1" :total="500" />
      </template>
    </PageView>
    <TableShow
      :columns="columns"
      :tableData="monitorEquipmentList.equipmentList||[]"
      :pagination="false"
      v-if="showMethod==='table'"
    >
    <template #status='{record}'>
    <span >{{record.isRun?'正常':'故障'}}</span>

    </template>
    </TableShow>
    <CardList :dataSource="monitorEquipmentList.equipmentList||[]" v-else>
      <a-list-item slot="renderItem" slot-scope="{item}">
        <template>
          <a-card :hoverable="true" :title="item.name" size="small" class="card">
            <a-card-meta class="card-body" @click="goToProject(item.id)">
              <a-avatar class="card-avatar" slot="avatar" :src="item.modelImg" size="large" />
              <div class="meta-content" slot="description">
                <p>设备状态：{{item.isRun?'正常':'故障'}}</p>
                <p>设备数值：{{item.strTemplate}}</p>
                <p>所在分组：{{item.groupName}}</p>
              </div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <!-- <a>操作一</a>
              <a>操作二</a>-->
            </template>
            <span slot="extra" style="fontSize:18px" class="extra iconfont">&#xe710;</span>
            <span slot="extra" style="fontSize:17px;margin:0 5px" class="extra iconfont">&#xe64c;</span>
            <span slot="extra" style="fontSize:15px" class="extra iconfont">&#xe62f;</span>
          </a-card>
        </template>
      </a-list-item>
    </CardList>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CardList from 'views/list/CardList'
import TableShow from '@/components/MyComponents/TableShow'
import PageView from '@/layouts/PageView'
let columns = [
  {
    align: 'center',
    title: '序号',
    key: 'sort',
    scopedSlots: { customRender: 'sort' },
    width: 70
  },
  { align: 'center', title: '设备名称', dataIndex: 'name', key: 'name' },
  { align: 'center', title: '设备类型', dataIndex: 'modelType', key: 'modelType' },
  { align: 'center', title: '当前数值', dataIndex: 'strTemplate', key: 'strTemplate' },
  { align: 'center', title: '设备分组', dataIndex: 'groupName', key: 'groupName' },
  {
    align: 'center',
    title: '报警',
    dataIndex: 'count',
    key: 'count'
  },
    {
    align: 'center',
    title: '设备状态',
    dataIndex: 'isRun',
    key: 'isRun',
    scopedSlots: { customRender: 'status' }
  },
  {
    align: 'center',
    title: '设备编号',
    dataIndex: 'imei',
    key: 'imei'
  },
  

  {
    align: 'center',
    title: '刷新时间',
    key: 'date',
    dataIndex: 'date'
    
  }
]


export default {
  data() {
    return {
      showMethod: 'data',
      columns,
      size:16,
      page:0,
      searchDevice:''

    }
  },

  computed: {
    ...mapState({
      monitorEquipmentList: state => state.monitor.monitorEquipmentList,
      projectId: state => state.projectId,
      equipmentGroup:state=>state.manage.equipmentGroup
    })
  },
  created(){
      this.getMonitorEquipmentList({ projectId: this.projectId,size:this.size,page:this.page })
      
  },

  mounted() {
    if (!this.equipmentGroup.total) {
      this.getEquipmentGroup({projectId:this.projectId})
    }
  },

  methods: {
    ...mapActions(['getMonitorEquipmentList','getEquipmentGroup']),
    // 单选框
    onChange(e) {
      console.log('radio checked', e.target.value)
    },
    // 搜索框
    onSearchChange(e){
      console.log(e.target.value)
      if (e.target.value.trim()==='') {
        this.page=0
         this.getMonitorEquipmentList({ projectId: this.projectId,size:this.size,page:0})
      }
    },
    // 分组
    handleChange(value) {
      this.page=0
      this.getMonitorEquipmentList({ projectId: this.projectId,size:this.size,page:this.page,groupId:value })
     
    }
  },
  watch:{
    
  },
  components: {
    CardList,
    PageView,
    TableShow
  }
}
</script>
<style lang='less' scoped>
/deep/ .card {
  background-color: rgb(240, 242, 245) !important;
  border: none;
  border-radius: 15px;
  .card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;

    .card-avatar {
      border-radius: 0;
     
    }
    .meta-content {
      height: 100%;
      margin: 0;
      p {
        padding: 0;
        margin: 0;
        margin-top: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        
      }
    }
  }
}
/deep/ .ant-card-head {
  background-color: #c2c8d2;
  border-radius: 15px 15px 0 0;
  height: 40px;
}
/deep/.ant-card-body {
  background-color: #fff;
  border-radius: 0 0 15px 15px;
  overflow: hidden;
}
.extra {
  font-weight: bold;
}
</style>