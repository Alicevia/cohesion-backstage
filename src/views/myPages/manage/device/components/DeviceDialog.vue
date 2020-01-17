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
          v-decorator="['groupName', 
          {
            rules:[{required: true, message: '请输入名称'}],
            initialValue:project.groupName
          }
        ]"
        />
      </a-form-item>
      <a-form-item label="设备编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          v-decorator="['remarks', 
          {
            rules:[{required: true, message: '请输入名称'}],
            initialValue:project.remarks
          }
        ]"
        />
      </a-form-item>
      <a-form-item label="所属类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="报警信息推送" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-switch
          v-decorator="['remarks', 
          {
            rules:[{required: true, message: '请输入名称'}],
            initialValue:project.remarks
          }
        ]"
          checkedChildren="开"
          unCheckedChildren="关"
          defaultChecked
        />
      </a-form-item>
      <a-form-item label="报表信息推送" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-checkbox-group
          :options="options"
          v-decorator="['remarks', 
          {
            rules:[{required: true, message: '请输入名称'}],
            initialValue:project.remarks
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

      visible: false,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapState({
      projectId: state => state.projectId
    })
  },
  methods: {
    showModal() {
      this.visible = !this.visible
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
