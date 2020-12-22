/* eslint-disable camelcase */
import Vue from 'vue'
import axios from 'axios'
import {
  base64,
  ToastPlugin
} from 'vux'
axios.defaults.withCredentials = true // 让ajax携带cookie
// 默认参数
Vue.use(ToastPlugin, {
  time: 2500
})
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 50000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// AES加密
function dataEncrypt (word, keyStr) {
  var key = CryptoJS.enc.Base64.parse(keyStr)
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
};

// AES解密
function dataDecrypt (word, keyStr) {
  var key = CryptoJS.enc.Base64.parse(keyStr)
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
};
/*
MD5签名
*/
function getSignature (data, MD5Key) {
  var dataStr = data + '|' + MD5Key
  var dataBase64 = Vue.prototype.$md5.base64(dataStr)
  // var dataMd5 = b64_md5(dataStr);
  // alert(CryptoJS.enc.Base64.parse(dataStr));
  // var dataBase64 = dataMd5 + "==";
  return dataBase64
}
// 10位随机数
function randomString () {
  const str = Math.random().toString(36).slice(-10)
  return str
}
// 获取当前日期
function getNowDate () {
  var date = new Date()
  var year = '' + date.getFullYear()
  var month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  var day = (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate())

  return '' + year + month + day
}
// 获取当前时间
function getNowTime () {
  var date = new Date()
  var year = '' + date.getFullYear()
  var month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  var day = (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate())
  var hour = (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours())
  var minutes = (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes())
  var seconds = (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds())
  return year + month + day + '' + hour + minutes + seconds
}
// 生产流水号
function buildSequenct () {
  var randomStr = randomString()
  var datetime = getNowDate()
  return 'h5' + datetime + randomStr
}
// request拦截器
service.interceptors.request.use(
  config => {
    Vue.$vux.loading.show()
    var body = {} // 报文体
    var body_comm = {} // 公共请求域数据
    var body_data = {} // 业务数据域
    // 签名
    var md5Key = process.env.MD5_KEY // TODO 从配置文件获取
    var aesKey = process.env.AES_KEY // TODO 从配置文件获取
    var sigData = body_data + '|' + md5Key
    var sigMd5 = hex_md5(sigData)
    var sigBase64 = MyBase64.encode(sigMd5)

    body_data = config.data
    // 报文体
    body['comm'] = body_comm // comm域 明文
    body['data'] = dataEncrypt(JSON.stringify(body_data), process.env.AES_KEY) // data域 aes密文
    config.data = body
    return config
  },
  error => {
    Vue.$vux.loading.hide()
    console.log('err message send exception' + error) // for debug
    let errmsg = {}
    errmsg.erortx = 'E9998'
    errmsg.errmsg = '系统异常'
    return Promise.reject(errmsg) // 返回报错信息
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Vue.$vux.loading.hide()
    // 后台系统异常
    if (response === undefined || response.data === undefined) {
      let errmsg = {}
      errmsg.erortx = 'A0099'
      errmsg.errmsg = '系統錯誤'
      return Promise.reject(errmsg) // 返回报错信息
    }

    /* 后台系统错误 */
    if (response.data.comm.erorcd !== '0000') {
      // alert('ssssssssssssssssssssss');
      let errmsg = {}
      errmsg.erortx = response.data.comm.erortx
      errmsg.errmsg = response.data.comm.erorcd
      return Promise.reject(errmsg) // 返回报错信息
    }
    let body_data = dataDecrypt(response.data.data, process.env.AES_KEY)
    let body_dataObj = JSON.parse(body_data)
    // todo 工具类 判空对象，工具类判空字符串
    if (response !== undefined && response.data !== undefined && response.data.data !== undefined) {
      return body_dataObj
    }

    if (response.data.comm.erorcd !== '0000') {
      // alert('ssssssssssssssssssssss');
      let errmsg = {}
      errmsg.erortx = response.data.comm.erortx
      errmsg.errmsg = response.data.comm.erorcd
      return Promise.reject(errmsg) // 返回报错信息
    }
  },
  error => {
    Vue.$vux.loading.hide()
    console.log('err message receive exception ' + error) // for debug
    let errmsg = {}
    errmsg.erortx = 'E9999'
    errmsg.errmsg = '网络开小差'
    // alert(JSON.stringify(error));
    return Promise.reject(errmsg) // 返回报错信息
  }
)
export default service
