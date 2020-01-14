<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
      size='large'
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center',borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号登录">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px;"
            message="账户或密码错误"
          />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入手机号"
              v-decorator="[
                'phone',
                {rules: [{ required: true, len:11, message: '请输入11位手机号' }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="phone" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="请输入密码"
              v-decorator="[
                'password',
                {rules: [{ required: true,min:6, message: '密码不少于6位' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            >确定</a-button>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="微信登陆">
          <div class="qrcode" id="qrcode" style="textAlign:center"></div>
          <!-- <div>
            <img class="qrcode" src="~@/assets/images/wechat.png" alt />
          </div>-->
        </a-tab-pane>
        <a-tab-pane key="tab3" tab="忘记密码">
          <template v-if="flow===1">
            <a-form-item>
              <a-input
                size="large"
                type="text"
                placeholder="请输入手机号"
                v-decorator="[
                'mobile',
                {rules: [{ required: true, len:11, message: '请输入11位手机号' }], validateTrigger: 'change'}
              ]"
              >
                <a-icon slot="prefix" type="phone" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="16">
                <a-form-item>
                  <a-input
                    size="large"
                    type="text"
                    placeholder="验证码"
                    v-decorator="['captcha', {rules: [{ required: true, len:6, message: '请输入6位验证码' }], validateTrigger: 'blur'}]"
                  >
                    <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="8">
                <a-button
                  class="getCaptcha"
                  size="large"
                  :disabled="state.smsSendBtn"
                  @click.stop.prevent="getCaptcha"
                  v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"
                ></a-button>
              </a-col>
            </a-row>
            <a-form-item>
              <a-button
                size="large"
                type="primary"
                htmlType="submit"
                class="login-button"
                @click="checkSMS"
              >下一步</a-button>
            </a-form-item>
          </template>
          <template v-else>
            <a-form-item>
              <a-input
                size="large"
                type="text"
                placeholder="请输入手机号"
                v-decorator="[
                'phoneReset',
                {rules: [{ required: true, len:11, message: '请输入11位手机号' }],
                  initialValue:recordPhone,
                 validateTrigger: 'change'}
              ]"
              >
                <a-icon slot="prefix" type="phone" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                type="password"
                autocomplete="false"
                placeholder="请输入密码"
                v-decorator="[
                'passwordReset',
                {rules: [{ required: true,min:6, message: '密码不少于6位' }], validateTrigger: 'blur'}
              ]"
              >
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                size="large"
                type="primary"
                htmlType="submit"
                class="login-button"
                @click="resetPW"
              >完成</a-button>
            </a-form-item>
          </template>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { reqWeChatQRCode, reqResetAuthCode,reqCheckSMS,reqResetPW } from '@/api/login'

export default {
  components: {},
  data() {
    return {
      recordPhone:'',
      flow: 1,
      customActiveKey: 'tab1',
      loginBtn: false,
      loginType: 0,
      isLoginError: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false,
        progressColor: '#FF0000'
      }
    }
  },
  created() {},
  methods: {
    ...mapActions(['Login']),

    // 切换登录窗口
    handleTabClick(key) {
      this.customActiveKey = key
      if (this.customActiveKey === 'tab2') {
        this.getWeChatQRCode()
      }
      // this.form.resetFields()
    },
    // 点击获取验证码

    // 获取二维码
    async getWeChatQRCode() {
      let origin = window.location.origin
      let pathname = window.location.pathname
      let href = origin + pathname
      let result = await reqWeChatQRCode({ trueUrl: href })
      if (result.data.code === 0) {
        let { appid, login, redirect_uri } = result.data.data
        new WxLogin({
          id: 'qrcode',
          appid,
          scope: 'snsapi_login',
          redirect_uri: encodeURIComponent(redirect_uri),
          state: Math.ceil(Math.random() * 1000),
          self_redirect: false,
          style: 'black',
          href:
            'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDI1MHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDIwMHB4O30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9'
        })
        let iframe = document.querySelector('#qrcode>iframe')
        iframe.sandbox = 'allow-scripts allow-top-navigation allow-same-origin'
      } else {
        this.$notification['error']({
          message: '错误',
          description: '微信二维码获取失败,请刷新页面',
          duration: 4
        })
      }
      //  iframe.sandbox = 'allow-top-navigation'
      // iframe.security='restrict'
      // iframe.sandbox = ''
      // http://192.168.50.236:8000/user/login?openid=oBUh059mnb-GkVYeGmJNouSQOBAo&accessToken=29_tglUAxMF2vGd1gGpTa5LfnDKV5GVIBMjo_t9RcXdrnr_HVNP9g7lzfXhnD0XIrZ8uTMHv06UdG2cL5H1cbLoRAt7zfR0UAWJR7goJu0l6MA
    },
    // 密码登录
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this
      state.loginBtn = true
      validateFields(['password','phone'],(err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          let timer = setTimeout(() => {
            clearTimeout(timer)
            state.loginBtn = false
          }, 600)
        }
      })
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
      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true
          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)
          const hide = $message.loading('验证码发送中..', 0)
          reqResetAuthCode({ phone: values.mobile })
            .then(res => {
              setTimeout(hide, 2500)
              $notification['success']({
                message: '提示',
                description: '验证码获取成功，请查看手机',
                duration: 3
              })
            })
            .catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    // 验证验证码是否正确
    checkSMS(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this
      validateFields(['mobile', 'captcha'], async (err, values) => {
        if (!err) {
          this.recordPhone = values.mobile//记录用户输入的手机号
          let {data} = await reqCheckSMS({phone:values.mobile,code:values.captcha})
          if(data.succeed){
            this.$notification['success']({
              message: '验证通过',
              description:'请输入新密码',
              duration: 4
            })
            this.flow = 2
          }else{
             this.$notification['error']({
              message: data.message,
              duration: 4
            })
          }  
     
        }
      })
    },
    // 重置密码
    resetPW(e){
      e.preventDefault()
      this.form.validateFields(['phoneReset', 'passwordReset'], async (err, values) => {
        if (!err) {
          let {data} = await reqResetPW({phone:values.phoneReset,password:values.passwordReset})
          if(data.succeed){
            this.$notification['success']({
              message: '密码重置成功',
              description:'请重新登录',
              duration: 4
            })
            this.flow = 1
            this.customActiveKey = 'tab1'
          }else {
             this.$notification['error']({
              message: '密码重置失败',
              description:'网络或者服务器错误，请稍后再试',
              duration: 4
            })
          }  
        }
      })

    },
    // 登录成功的处理
    loginSuccess() {
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    // 登录失败的处理
    requestFailed(err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: err || '请求出错，服务器或者网络出现问题',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 430px !important;
  #qrcode {
    width: 100%;
    height: 300px;
    background-size: contain;
  }
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
