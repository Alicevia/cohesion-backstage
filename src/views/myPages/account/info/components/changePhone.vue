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
            'newPhone',
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
        <a-form-item label="原手机号" v-bind="formItemLayout">
          <a-input
            v-decorator="[
                'phone',
                { 
                  rules: [
                    { required: true,message: '手机号不能为空'},
                    {len:11,message: '手机号为11位'}
                  ] 
                },
              ]"
            placeholder="请输入原手机号"
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
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { reqModiPhone } from "@/api/user";
import utils from "@/utils/myUtils";
import { mapActions } from 'vuex';
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
      form: this.$form.createForm(this, { name: "ph" })
    };
  },
  methods: {
    ...mapActions(['getUserInfo']),
    showModal() {
      this.visible = !this.visible;
    },
    handleOk(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let { data } = await reqModiPhone(values);
          utils.detailBackCode(data, { s: "更换手机成功" }, () => {
            this.getUserInfo()
            this.visible = !this.visible;
            this.form.resetFields()
          });
        }
      });
    },
  }
};
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