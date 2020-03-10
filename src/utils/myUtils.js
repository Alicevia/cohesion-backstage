import { message } from 'ant-design-vue'

let utils = function (params) {
  function queryURLParameter(str) {
    let link = document.createElement('a');
    link.href = str;
    return link
  }

  function checkLocalStorage() {
    return localStorage.getItem('user-token')
  }

  function dataURLtoFile(dataurl, filename) {//将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }


  function blobToFile(blob, fileName) {//blob转file
    blob.lastModifiedDate = new Date();
    blob.name = fileName;
    return blob;
  }


  function getImgToBase64(url, callback) {//将js图片转换为Base64
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL('image/png');
      callback(dataURL);
      canvas = null;
    };
    img.src = url;

  }


  function dataURLtoBlob(dataurl) {//base64转为blob
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  function blobToDataURL(blob) { //blob转base64
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        resolve(e.target.result);
      };
      // readAsDataURL
      fileReader.readAsDataURL(blob);
      fileReader.onerror = () => {
        reject(new Error('文件流异常'));
      };
    });



  }
  // 一维数组转二维数组
  function changeAry(array, num) {
    let ary = []
    let temp = []
    if (!array || array.length === 0) {
      return ary
    }

    for (let index = 0; index < array.length; index++) {
      temp.push(array[index])
      if (index % (num) === (num - 1)) {
        ary.push(temp)
        temp = []
      }
    }
    if (temp.length > 0) {
      ary.push(temp)
    }
    temp = null
    return ary
  }

  function detailBackCode(data, status = {}, callback) {
    let { succeed, code } = data
    let { s = '', e = '服务器错误' } = status
    if (succeed) {
      if (s) {
        message.success(s)
      }
      callback && callback(data.data)
    } else {
      switch (code) {
        case -6:
          message.error(data.message)
          callback&&callback([])  
          break;
        case -35:
          message.error(data.message)
          break;
        case -3:
          message.error(data.message + '，请使用未注册的手机号')
          break;
        case -8:
          message.error(data.message)
          break;
        case -14:
          message.error(data.message)
          callback&&callback([])  
          break;
        default:
          message.error(data.message)
          break;
      }
    }

  }

  return {
    queryURLParameter, dataURLtoFile, changeAry, detailBackCode, blobToDataURL
  }
}()

export default utils