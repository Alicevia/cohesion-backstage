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
      <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          v-decorator="['projectName', 
          {
            rules:[{required: true, message: '请输入名称'}],
            initialValue:project.name
          }
        ]"
        />
      </a-form-item>
      <a-form-item label="图标" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <PicUpload
          @getUploadImg="getUploadImg"
          v-decorator="['file',
            { 
              rules: [{ required: true,message: '请上传图片' }], 
              initialValue:project.projectImg
              }]"
          :picture="picture"
        ></PicUpload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import PicUpload from '@/components/MyComponents/PicUpload'
import { reqAddProjectEquip, reqModiProjectEquip } from '@/api/project'
import utils from '../../../../utils/myUtils'
import { mapActions } from 'vuex'
export default {
  name: 'TaskForm',
  props: ['title', 'project', 'page'],
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
  computed: {
    picture() {
      return this.project.projectImg
    }
  },
  methods: {
    ...mapActions(['getProjectList']),

    showModal() {
      this.visible = !this.visible
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
          let formdata = new FormData()
          for (const key in values) {
            if (!values.hasOwnProperty(key)) return
            formdata.append([key], values[key])
          }
          if (this.project.id) {
            //修改项目
            formdata.append('projectId', this.project.id)
            reqModiProjectEquip(formdata).then(({ data }) => {
              utils.detailBackCode(data, { s: '修改项目成功' })
              this.getProjectList({ page: this.page, size: 16 })
            })
          } else {
            //新增项目
            reqAddProjectEquip(formdata).then(({ data }) => {
              utils.detailBackCode(data, { s: '添加项目成功' })
              this.getProjectList({ page: 0, size: 16 })
            })
          }
          this.$emit('clearProject')
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
