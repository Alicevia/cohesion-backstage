<template>
  <div>
    <PageView :title="false">
      <template #headerContent>
        <span style="fontSize:16px;marginRight:30px">项目数量：{{projectList.total}}</span>
        <a-input v-model="search" style="width:200px;margin:0 10px" placeholder="请输入项目名称" />
        <a-button @click="searchProject" style="margin:0 10px 0 0">查询</a-button>
        <a-button type="primary" @click="addProject">新增项目</a-button>
      </template>
      <template slot="extra">
        <a-pagination :defaultCurrent="1" :defaultPageSize='size' @change="changePage" :total="projectList.total" />
      </template>
    </PageView>
    <CardList :dataSource="projectList.list">
      <a-list-item slot="renderItem" slot-scope="{item}">
        <template>
          <a-card :hoverable="true" :title="item.name" size="small" class="card">
            <a-card-meta class="card-body" @click="goToProject(item.id)">
              <a-avatar class="card-avatar" slot="avatar" :src="item.projectImg" size="large" />
              <div class="meta-content" slot="description">
                <p>正常设备：{{item.normalEquipment}}</p>
                <p>报警设备：{{item.warningEquipment}}</p>
              </div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <!-- <a>操作一</a>
              <a>操作二</a>-->
            </template>
            <span
              slot="extra"
              @click="modiProject(item)"
              style="fontSize:18px"
              class="extra iconfont"
            >&#xe710;</span>
            <span slot="extra" style="fontSize:17px;margin:0 5px" class="extra iconfont">&#xe64c;</span>
            <span
              slot="extra"
              @click="deleteProject(item.id)"
              style="fontSize:15px"
              class="extra iconfont"
            >&#xe62f;</span>
          </a-card>
        </template>
      </a-list-item>
    </CardList>
    <CrudProjectDialog
      :title="title"
      :page="page"
      @clearProject="clearProject"
      @searchProject='searchProject'
      :project="project"
      ref="curdProject"
    ></CrudProjectDialog>
    <!-- <router-link :to="{path:'/monitor/data'}" @click.native="updateProjectId(1)">kk1k</router-link> -->
  </div>
</template>

<script>
import CardList from 'views/list/CardList'
import PageView from '@/layouts/PageView'
import CrudProjectDialog from './crudProjectDialog'
import { mapActions, mapState } from 'vuex'
import { reqProjectEquip, reqDeleteProjectEquip, reqSearchProjectEquip } from '@/api/project'
import utils from '../../../../utils/myUtils'
import { message } from 'ant-design-vue'

export default {
  data() {
    return {
      title: '新增项目',
      project: {},
      page: 0,
      size:16,
      search: ''
    }
  },

  computed: {
    ...mapState({
      projectList: state => state.project.projectList
    })
  },
  created() {
  },
  mounted() {
    this.getProjectList({ page: 0, size: 16,projectName:this.search })
    console.log(this.$store)
  },

  methods: {
    ...mapActions(['updateProjectId', 'getProjectList']),
    // ...mapActions({

    // }),
    //
    // 查询项目
    searchProject() {
      this.getProjectList({page:this.page,size:16,projectName:this.search})
    },
    // 添加项目
    addProject() {
      this.title = '新增项目'
      this.$refs['curdProject'].showModal()
    },
    // 修改项目
    modiProject(item) {
      this.project = item
      this.title = '修改项目'
      this.$refs['curdProject'].showModal()
    },
    // 删除项目
    async deleteProject(id) {
      let { data } = await reqDeleteProjectEquip({projectId:id})
      utils.detailBackCode(data, { s: '删除成功' })
      this.getProjectList({ page: this.page, size: 16,projectName:this.search })
    },

    // 存储项目id
    goToProject(id) {
      this.updateProjectId(id)
      this.$router.push({ path: '/monitor/data' })
    },
    // 改变页码
    changePage(page) {
      page--
      this.page = page
      this.getProjectList({ page, size: 16 ,projectName:this.search})

    },
    // 清空传递的project
    clearProject() {
      this.project = {}
    }
  },
  watch: {
    search(newValue, oldValue) {
      if (!newValue.trim()) {
        this.getProjectList({ page: 0, size: 16,projectName:this.search })
      }
      
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