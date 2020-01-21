<template>
  <a-modal
    :centered="true"
    :width="750"
    :visible="visible"
    :title="title"
    @ok="handleSubmit"
    @cancel="visible = false"
    :destroyOnClose="true"
  >
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="设备名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="name" :disabled="true" />
      </a-form-item>
      <a-form-item label="水质检测方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group @change="waterCheckWay" v-model="checkWay">
          <a-radio :value="0">手动</a-radio>
          <a-radio :value="1">定时</a-radio>
          <a-radio :value="2">间隔</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="checkWay===0" label="检测" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-button type="primary">开始检测</a-button>
      </a-form-item>
      <a-form-item label="整点检测" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-time-picker style="marginRight:20px" :use12Hours="false" @change="timeOnChange" />
   
        <a-button type="primary" ghost size="small">添加</a-button>
        <a-button type="primary" size="small">应用</a-button>
      </a-form-item>
      <a-form-item label="间隔检测" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-time-picker :use12Hours="false" @change="timeOnChange" />
      </a-form-item>

      <a-form-item label="报警设置" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
      </a-form-item>
      <a-form-item label="水质检测报告推送" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group defaultValue="a" buttonStyle="solid">
          <a-radio-button value="a">是</a-radio-button>
          <a-radio-button value="b">否</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="上线通知" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group defaultValue="a" buttonStyle="solid">
          <a-radio-button value="a">是</a-radio-button>
          <a-radio-button value="b">否</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="下线通知" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group defaultValue="a" buttonStyle="solid">
          <a-radio-button value="a">是</a-radio-button>
          <a-radio-button value="b">否</a-radio-button>
        </a-radio-group>
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
  { label: '日报表', value: 'Apple' },
  { label: '周报表', value: 'Pear' },
  { label: '月报表', value: 'Orange' }
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
      visible: true,
      form: this.$form.createForm(this),
      name: '水质检测', //设备名称
      checkWay: 0 // 检测方式
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
    handleChange() {},
    // 水质检测方式
    waterCheckWay() {},
    // 搜集时间
    timeOnChange(time, timeString) {
      console.log(time, timeString)
    },
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
      console.log('value = ', this.value)
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      if (this.img) {
        this.form.setFieldsValue({ file: this.img })
      }
      validateFields((errors, values) => {
        if (!errors) {
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
    // 图片回显
    getUploadImg(img) {
      this.img = img
    }
  },
  components: {
    PicUpload
  }
}
</script>
