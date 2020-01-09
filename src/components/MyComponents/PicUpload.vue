<template>
  <a-upload
    name="avatar"
    listType="picture-card"
    action
    class="avatar-uploader"
    :showUploadList="false"
    @change="handleChange"
    :customRequest="()=>false"
  >
    <img class="avatar" v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  props:['picture'],//图片的http链接
  data() {
    return {
      loading: false,
      // imageUrl:this.picture||''
      tempimg:''
    };
  },
  computed:{
    imageUrl:{
      get(){
        if (this.tempimg) {
          return this.tempimg
        }else{
          return this.picture
        }
      },
      set(value){
        this.tempimg = value
      }
    }
  },
  mounted(){
  },
 
  methods: {
    handleChange(info) {
      // 传递图片
      this.$emit("getUploadImg", info.file.originFileObj);
      // 回显
      getBase64(info.file.originFileObj, imageUrl => {
        this.imageUrl = imageUrl;
        this.loading = false;
      });
    }
  },
};
</script>
<style>
.avatar {
  height: 110px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
