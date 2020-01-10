<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <span style="fontSize:16px;marginRight:30px">设备管理：{{4}}</span>
        <a-select style="width: 120px;marginLeft:50px" placeholder="请选择分组" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <a-button type="primary" style="margin:0 10px 0 10px">新增设备</a-button>
      </template>
      <template slot="extra">
        <a-pagination :defaultCurrent="1" :total="500" />
      </template>
    </PageView>
    <CardList>
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
import PageView from '@/layouts/PageView'
import CardList from 'views/list/CardList'
export default {
  data() {
    return {}
  },

  computed: {},

  mounted() {},

  methods: {},

  components: {
    PageView,
    CardList
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
    .meta-content{
      margin: 0;
      p {
        padding: 0;
        margin: 0;
        margin-top: 4px;
        white-space: nowrap;


      }
    }
  }
}
/deep/ .ant-card-head {
  background-color: #c2c8d2;
  border-radius: 5px 5px 0 0;
  height: 40px;
}
/deep/.ant-card-body {
  background-color: #fff;
  border-radius:  0 0 5px 5px;
  overflow: hidden;

}
.extra {
  font-weight: bold;
}
</style>