<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <span style="fontSize:16px;marginRight:30px">项目数量：99</span>
        <a-input style="width:200px;margin:0 10px" placeholder="请输入项目名称" />
        <a-button style="margin:0 10px 0 0">查询</a-button>
        <a-button type="primary" @click="toggleCurdProjectDialog">新增项目</a-button>
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
              <a>操作二</a> -->
            </template>
            <span slot="extra" style="fontSize:18px" class="extra iconfont">&#xe710;</span>
            <span slot="extra" style="fontSize:17px;margin:0 5px" class="extra iconfont">&#xe64c;</span>
            <span slot="extra" style="fontSize:15px" class="extra iconfont">&#xe62f;</span>
          </a-card>
        </template>
      </a-list-item>
    </CardList>
    <CrudProjectDialog :title="title" ref="curdProject"></CrudProjectDialog>
    <!-- <router-link :to="{path:'/monitor/data'}" @click.native="updateProjectId(1)">kk1k</router-link> -->
  </div>
</template>

<script>
import CardList from 'views/list/CardList'
import PageView from '@/layouts/PageView'
import CrudProjectDialog from './crudProjectDialog'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      title: '新增项目'
    }
  },

  computed: {},

  mounted() {},

  methods: {
    ...mapActions(['updateProjectId']),
    toggleCurdProjectDialog() {
      this.title = '新增项目'
      this.$refs['curdProject'].showModal()
    },
    goToProject(id){
      this.updateProjectId(id)
      this.$router.push({path:'/monitor/data'})
    }
  },

  components: {
    CardList,
    PageView,
    CrudProjectDialog
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
  border-radius: 15px 15px 0 0;
  height: 40px;
}
/deep/.ant-card-body {
  background-color: #fff;
  border-radius:  0 0 15px 15px;
  overflow: hidden;

}
.extra {
  font-weight: bold;
}
</style>