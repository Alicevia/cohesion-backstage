<template>
  <div class="header-list">
    <div class="header-left ">
      <ul class="header-item">
        <router-link tag="li" to='/monitor/1'>监控</router-link>
        <li>管理</li>
        <li>日志</li>
        <li>数据</li>
        <li>报表</li>
      </ul>
    </div>
    <div class="header-right">
        <ul class="header-item">
        <li>首页</li>
        <li>账户</li>
        <li>退出</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  computed: {},

  mounted(){},

  methods: {},

  components: {},
}

</script>
<style lang='less' scoped>
.header-list {
  float: right;
  width: 92%;
  // margin-left: -70px;
  // padding-left: 40px;
  display: flex;
  color: white;
  justify-content:space-between;
  .header-item {
    display: flex;
    list-style: none;
    li {
      width: 100px;
      text-align: center;
    }
  }
}
</style>