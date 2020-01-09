<template>
  <a-modal
    :centered="true"
    :width="640"
    :visible="visible"
    style="top:-40px"
    :title="title"
    @ok="handleSubmit"
    @cancel="visible = false"
  >
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['taskName', {rules:[{required: true, message: '请输入任务名称'}]}]" />
      </a-form-item>
      <a-form-item label="图标" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <PicUpload
          @getUploadImg="getUploadImg"
          v-decorator="['file',
            { 
              rules: [{ required: true,message: '请上传图片' }], 
              initialValue:''
              }]"
          :picture="''"
        ></PicUpload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import PicUpload from '@/components/MyComponents/PicUpload'
export default {
  name: 'TaskForm',
  props:['title'],
  data() {
    return {
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
  methods: {
    showModal() {
      this.visible = !this.visible
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
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
