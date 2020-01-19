<template>
  <a-modal
    :centered="true"
    :width="640"
    :visible="visible"
    style="top:-40px"
    :title="title"
    @ok="handleSubmit"
    @cancel="visible = false"
    :destroyOnClose="true"
  >
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="设备名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          v-decorator="['name', 
          {
            rules:[{required: true, message: '请输入设备名称'}],
            initialValue:project.name
          }
        ]"
        />
      </a-form-item>
      <a-form-item label="设备编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          v-decorator="['imei', 
          {
            rules:[{required: true, message: '请输入名称'}],
            initialValue:project.imei
          }
        ]"
        />
      </a-form-item>
      <a-form-item label="所属类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select style="width: 180px" placeholder="请选择分组" @change="handleChange"
            v-decorator="['type', 
          {
            rules:[{required: true, message: '请选择所属类型'}],
            initialValue:project.type
          }
        ]"
        >
          <a-select-option value="all">查看所有分组设备</a-select-option>
          <a-select-option
            v-for="item in equipmentGroupList"
            :value="item.id"
            :key="item.id"
          >{{item.groupName}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="报警信息推送" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-switch
          v-decorator="['alarmInfo', 
          {
            rules:[{required: true, message: '请输入设备编号'}],
            initialValue:project.alarmInfo
          }
        ]"
          checkedChildren="开"
          unCheckedChildren="关"
          defaultChecked
        />
      </a-form-item>
      <a-form-item label="报表信息推送" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-checkbox-group
          @change='selectReport'
          :options="options"
          v-decorator="['report', 
          {
            rules:[{required: true, message: '请选择推送周期'}],
            initialValue:project.report
          }
        ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import PicUpload from '@/components/MyComponents/PicUpload'
import { reqAddEquipmentGroup, reqModiEquipmentGroup } from '@/api/manage'
import utils from '@/utils/myUtils'
import { mapState } from 'vuex'
const options = [
  { label: '日报表', value: 'dailyReport' },
  { label: '周报表', value: 'weeklyReport' },
  { label: '月报表', value: 'monthlyReport' }
]
export default {
  name: 'TaskForm',
  props: ['title', 'project', 'page'],
  data() {
    return {
      options,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  computed: {
  ...mapState({
      projectId: state => state.projectId,
      equipmentGroupList: state => state.manage.equipmentGroup.list
    })
  },
  methods: {
    showModal() {
      this.visible = !this.visible
    },
    // 报表选择
    selectReport(value){
      console.log(value)
    },
    handleChange() {},
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
      console.log('value = ', this.value)
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
 
      validateFields((errors, values) => {
        if (!errors) {
          console.log(values)
          return
          if (this.project.id) {
            //修改项目
            values.id = this.project.id
            values.projectId = this.projectId

            reqModiEquipmentGroup(values).then(({ data }) => {
              utils.detailBackCode(data, { s: '修改项目分组成功' }, () => {
                this.$emit('updateInfo')
              })
            })
          } else {
            //新增项目
            values.projectId = this.projectId
            reqAddEquipmentGroup(values).then(({ data }) => {
              utils.detailBackCode(data, { s: '添加项目分组成功' }, () => {
                this.$emit('updateInfo')
              })
            })
          }
          this.$emit('clearInfo')
          this.showModal()
        }
      })
    },

  },
  components: {
    PicUpload
  }
}
</script>
