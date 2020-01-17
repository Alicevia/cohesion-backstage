<template>
  <div class="content-item">
    <!-- <div class="current-position">
      <slot name="title"></slot>
      <slot name="opreate"></slot>
    </div> -->
    <a-table
      :rowSelection="rowSelection"
      :columns="columns"
      :customRow="customRow"
      rowKey="id"
      :pagination="pagination"
      :dataSource="tableData"
      class="table-header"
      :bordered='true'
    >
      <template slot="alarm" slot-scope="record,item,index">
        <slot name="alarm" :record='record' ></slot>
      </template>
      <template slot="status" slot-scope="record,item,index">
        <slot name="status" :record='record' ></slot>
      </template>
      <template slot="action" slot-scope="record,item,index">
        <slot name="action" :record='record' ></slot>
      </template>
           <template slot="set" slot-scope="record,item,index">
        <slot name="set" :record='record' ></slot>
      </template>
      <template slot="remarks" slot-scope="record">
        <slot name="remarks" :record='record'></slot>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  props: ["rowSelection", "columns", "tableData", "customRow",'pagination'],
  data() {
    return {};
  },
  computed: {
  },

  mounted() {},

  methods: {
    onSearch(value) {},
  
  },

  components: {}
};
</script>
<style lang='less' scoped>
.table-header{
  background-color: #fff;
  /deep/ .ant-table-tbody > tr > td {
    padding: 7px 16px;
  }
  /deep/ .ant-table-thead th {
    background-color:#C2C8D2;
    padding:11px;
  }
  /deep/.ant-table-tbody > tr:hover > td{
    background-color:#F6F6F6
  }
}

</style>