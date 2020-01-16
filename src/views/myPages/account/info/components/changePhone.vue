<template>
  <div>
    <a-modal title="更换手机号(密码不会改变)" v-model="visible" @ok="handleOk">
      <a-form
        id="components-form-demo-normal-login"
        layout="horizontal"
        :form="form"
        class="login-form"
      >
        <a-form-item label="新手机号" v-bind="formItemLayout">
          <a-input
            v-decorator="[
            'phone',
            { 
              rules: [
                { required: true,message: '手机号不能为空'},
                {len:11,message: '手机号为11位',}
              ] 
            },
           ]"
            placeholder="请输入新手机号"
          >
            <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="原密码" v-bind="formItemLayout">
          <a-input
            v-decorator="[
            'password',
                { 
                  rules: [
                    { required: true,message: '请输入密码'},
                    {min:6,message: '密码不少于6位',},
                  ] 
                },
            ]"
            type="password"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="验证码" v-bind="formItemLayout">
          <a-row :gutter="0">
            <a-col class="gutter-row" :span="16">
              <a-input
                type="text"
                placeholder="验证码"
                v-decorator="['verificationCode', {rules: [{ required: true, len:6, message: '请输入6位验证码' }], validateTrigger: 'blur'}]"
              >
                <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { reqChangePhone, reqWxBindPhoneCode } from '@/api/user'
import utils from '@/utils/myUtils'
import { mapActions } from 'vuex'
import { message } from 'ant-design-vue'
export default {
  data() {
    return {
      state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false,
        progressColor: '#FF0000'
      },
      formItemLayout: {
        labelCol: {
          sm: { span: 6 }
        },
        wrapperCol: {
          sm: { span: 15 }
        }
      },
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),
    showModal() {
      this.visible = !this.visible
    },
    // 获取短信验证码
    getCaptcha(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        $message,
        $notification
      } = this
      validateFields(['phone'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true
          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)
          // const hide = $message.loading('验证码已发送，请查看手机', 0)
          reqWxBindPhoneCode({ phone: values.phone })
            .then(res => {
              let {data} = res
              utils.detailBackCode(data,{s:'验证码已经发送'})
              // setTimeout(hide, 1000)
            })
            .catch(err => {
              // setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              message.error('获取短信出错')
            })
        }
      })
    },
    // 更换手机号
    handleOk(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          reqChangePhone(values).then(({data})=>{
            utils.detailBackCode(data, { s: '更换手机成功' }, () => {
              this.getUserInfo()
              this.visible = !this.visible
              this.form.resetFields()
            })
          })
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.getCaptcha {
  width: 100%;
  height: 30px;
}
</style>