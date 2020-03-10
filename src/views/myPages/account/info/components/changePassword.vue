<template>
  <div>
    <a-modal title="修改密码" v-model="visible" @ok="handleOk">
      <a-form
        id="components-form-demo-normal-login"
        layout="horizontal"
        :form="form"
        class="login-form"
      >
        <a-form-item label="旧密码" v-bind="formItemLayout">
          <a-input
            v-decorator="[
            'oldpass',
            { 
              rules: [
                { required: true,message: '请输入密码'},
                {min:6,message: '密码不少于6位',}
              ] 
            },
           ]"
            type="password"
            placeholder="请输入原密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="新密码" v-bind="formItemLayout">
          <a-input
            v-decorator="[
                'password',
                { 
                  rules: [
                    { required: true,message: '请输入密码'},
                    {min:6,message: '密码不少于6位',},
                    {validator: handlePass},
                  ]
                },
              ]"
            type="password"
            placeholder="请输入新密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="确认新密码" v-bind="formItemLayout">
          <a-input
            v-decorator="[
          'password2',
            { 
              rules: [
                { required: true,message: '请输入密码'},
                {min:6,message: '密码不少于6位',},
                {validator: handleConfirmPass},
              ] 
            },
        ]"
            type="password"
            placeholder="请再次输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { reqChangePassword } from '@/api/user'
import utils from "@/utils/myUtils";
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          sm: { span: 8 }
        },
        wrapperCol: {
          sm: { span: 12 }
        }
      },
      visible: false,
      form: this.$form.createForm(this, { name: 'pw' })
    }
  },
  methods: {
    showModal() {
      this.visible = !this.visible
    },
    handleOk(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          let payload = {
            newpass: values.password,
            oldpass: values.oldpass
          }
          console.log(values)
          let { data } = await reqChangePassword(payload)
          utils.detailBackCode(data, { s: '修改密码成功' }, () => {
            this.visible = !this.visible
          })
        }
      })
    },

    // 处理验证两次密码是否一致
    handlePass(rule, value, callback) {
      this.password = value
      if (this.password2 && this.password !== this.password2) {
        callback('两次密码输入不一致！')
      }
      callback()
    },
    handleConfirmPass(rule, value, callback) {
      this.password2 = value
      if (this.password && this.password !== value) {
        callback('两次密码输入不一致！')
      }
      callback()
    }
  }
}
</script>
<style lang='less' scoped>
  #components-form-demo-normal-login .login-form {
    max-width:300px

  }
  #components-form-demo-normal-login .login-form-forgot {
    float:right

  }
  #components-form-demo-normal-login .login-form-button{
    width:100%

  }
</style>