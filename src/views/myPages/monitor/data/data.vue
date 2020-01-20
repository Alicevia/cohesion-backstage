<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <a-radio-group @change="onChange" v-model="showMethod">
          <a-radio value="data">数据</a-radio>
          <a-radio value="table">列表</a-radio>
        </a-radio-group>

        <a-select style="width: 120px;marginLeft:50px" placeholder="请选择分组" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <a-input style="width:200px;margin:0 10px" placeholder="请输入项目名称" />

        <a-button type="primary" style="margin:0 10px 0 0">查询</a-button>
      </template>
      <template slot="extra">
        <a-pagination :defaultCurrent="1" :total="500" />
      </template>
    </PageView>
    <TableShow
      :columns="columns"
      :tableData="dataSource"
      :pagination="false"
      v-if="showMethod==='table'"
    ></TableShow>
    <CardList :dataSource="dataSource" v-else>
      <a-list-item slot="renderItem" slot-scope="{item}">
        <template>
          <a-card :hoverable="true" :title="item.title" size="small" class="card">
            <a-card-meta class="card-body" @click="goToProject(item.id)">
              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large" />
              <div class="meta-content" slot="description">
                <p>正常设备：{{item.normal}}</p>
                <p>报警设备：{{item.unnormal}}</p>
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
import { mapState } from 'vuex'
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
  { align: 'center', title: '设备类型', dataIndex: 'type', key: 'type' },
  { align: 'center', title: '当前数值', dataIndex: 'value', key: 'value' },
  { align: 'center', title: '设备分组', dataIndex: 'group', key: 'group' },
  {
    align: 'center',
    title: '报警',
    dataIndex: 'warning',
    key: 'warning'
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
    key: 'time',
    dataIndex: 'time'
    // scopedSlots: { customRender: 'action' }
  }
]
let dataSource = []
for (let i = 0; i < 16; i++) {
  dataSource.push({
    id: i,
    sort: i,
    name: '张三' + i,
    type: 1,
    value: i + 10,
    group: '分组',
    warning: '否',
    number: 1000 + i,
    time: 2019
  })
}

export default {
  data() {
    return {
      showMethod: 'data',
      columns,
      dataSource
    }
  },

  computed: {
    ...mapState(['projectId'])
  },

  mounted() {
    // console.log(this.$route)
  },

  methods: {
    // 单选框
    onChange(e) {
      console.log('radio checked', e.target.value)
    },
    // 分组
    handleChange(value) {
      console.log(`selected ${value}`)
    }
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
      width: 70px;
      height: 70px;
    }
    .meta-content {
      margin: 0;
      p {
        padding: 0;
        margin: 0;
        margin-top: 8px;
        white-space: nowrap;
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