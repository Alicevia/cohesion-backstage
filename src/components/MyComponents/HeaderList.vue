<template>
  <div class="header-list">
    <div class="header-left">
      <ul class="header-item" v-show="projectId">
        <router-link tag="li" to="/monitor">
          <span class="iconfont">&#xe60b;</span>
          <p>监控</p>
        </router-link>
        <router-link tag="li" to="/manage">
          <span class="iconfont">&#xe780;</span>
          <p>管理</p>
        </router-link>
        <router-link tag="li" to="/log">
          <span class="iconfont">&#xe601;</span>
          <p>日志</p>
        </router-link>
        <router-link tag="li" to="/report">
          <span class="iconfont">&#xe623;</span>
          <p>报表</p>
        </router-link>
        <router-link tag="li" to="/datum">
          <span class="iconfont">&#xe606;</span>
          <p>数据</p>
        </router-link>
      </ul>
    </div>
    <div class="header-right">
      <ul class="header-item">
        <router-link tag="li" to="/index">
          <span class="iconfont">&#xe600;</span>
          <p>首页</p>
        </router-link>
        <router-link tag="li" to="/account">
          <span class="iconfont">&#xe643;</span>
          <p>账户</p>
        </router-link>
        <li @click="logout" >
          <span class="iconfont">&#xe60c;</span>
          <p>退出</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
export default {
  data() {
    return {}
  },

  computed: {
    ...mapState(['projectId'])
  },

  mounted() {},

  methods: {
    ...mapActions(['updateProjectId', 'Logout']),
    clearProjectId() {
      this.updateProjectId('')
    },
    // 处理退出
    logout() {
      this.Logout()
        .then(() => {
          this.$notification.success({
            message: '操作成功',
            description: `您已经退出登录`
          })
          // this.$router.replace({ path: '/user/login' })
          this.clearProjectId()
          location.href=location.origin+location.pathname+'#/user/login'
        })
        .catch(() => {
          this.$notification.error({
            message: '用户信息已过期',
            description: `您已经退出登录`
          })
          this.$router.replace({ path: '/user/login' })
        })
    },
    kk(){
      let obj={a:0,b:88}
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          console.log(key)
          
        }
      }
    }

  },
  

  components: {}
}
</script>
<style lang='less' scoped>
.header-list {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  // margin-left: -70px;
  // padding-left: 40px;
  display: flex;
  color: white;
  justify-content: space-between;
  flex-flow: row nowrap;
  .header-item {
    display: flex;
    list-style: none;
    line-height: 1;
    padding-left: 10px;
    li {
      width: 130px;
      height: 110px;
      box-sizing: border-box;
      padding-top: 10px;
      text-align: center;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      font-size: 16px;
      &.active {
        background-color: #292e3a;
        background-clip: content-box;
      }
      &:hover {
        background-color: #292e3a;
        background-clip: content-box;
      }
      span {
        font-size: 28px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>