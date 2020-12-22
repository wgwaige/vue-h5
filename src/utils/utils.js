/* eslint-disable camelcase */
/*
1.字符串处理
2.日期处理
3.判空
*/
import Vue from 'vue'
import axios from 'axios'
import cfgNation from '../../static/nation'
import Router from 'vue-router'
import router from '@/router/index'
import {
  alert,
  notice1,
  isNull
} from '@/utils/common'
Vue.use(Router)
class WeChatUtils {
  // 去除空格，首尾
  trim (str) {
    var result
    result = str.replace(/(^\s+)|(\s+$)/g, '')
    return result
  }
  // 去除\r\n
  replaceEnter (str) {
    if (str !== undefined) {
      return str.replace(/[\r\n]/g, '')
    } else {
      return ''
    }
  }
  // 性别汉字转code
  sex2code (str) {
    if (str === '男') {
      return 1
    } else {
      return 2
    }
  }
  // 生日格式化
  birthdayFormat (str) {
    if (str !== undefined && str != null && str !== '') {
      str = str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2)
    }
    return str
  }
  export function getNowTime () {
  var date = new Date()
  var hour = (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours())
  var minutes = (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes())
  var seconds = (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds())

  return '' + hour + minutes + seconds
}
export function isNull (str) {
  str = '' + str
  if (str === 'null' || str == null || typeof (str) === 'undefined' || str === 'undefined' || str === '' || str === undefined) {
    return true
  }
  return false
}
// 判断网络连接的网络状态
export function getInternet () {
  if (navigator.onLine) {
    // 联网
    return true
  } else {
    // 断网
    return false
  }
}
  // 通过民族汉字获取编码
  getNationCode (str) {
    let nationCode = ''
    str = str + '族'
    let nationList = cfgNation.data // 转换为json对象
    nationList.forEach(function (val, index) {
      if (str === val.label) {
        nationCode = val.value
      }
    })
    return nationCode
  }
  /**
   * 千分位转换方法
   * @param num 要转换的数字
   * @param cent  保留的小数位数
   */
  toThousands (num, cent) {
    if (num === '' || num === 'undefined') {
      num = 0
    }
    if (cent === 0) {} else if (cent === '' || cent === 'undefined') {
      cent = 2
    }
    num = parseFloat(num).toFixed(cent)
    var tempNum = num.toString()
    if (tempNum.indexOf('.') === -1) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    } else {
      var numArr = num.toString().split('.')
      return (numArr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + numArr[1]
    }
  }
  /**
   * hhmmss--->hh:mm:ss
   * @param strTime
   */
  getFormatTime (strTime) {
    return strTime.substr(0, 2) + ':' + strTime.substr(2, 2) + ':' + strTime.substr(4, 2)
  }
  /*
   * 将当前时间转换成YYYYMMdd
   */
  getNowDate () {
    var date = new Date()
    var year = '' + date.getFullYear()
    var month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
    var day = (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate())

    return '' + year + month + day
  }
  getNowTime () {
    var date = new Date()
    var hour = (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours())
    var minutes = (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes())
    var seconds = (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds())
    return '' + hour + minutes + seconds
  }
  getFormatData (strDate) {
    return strDate.substr(0, 4) + '-' + strDate.substr(4, 2) + '-' + strDate.substr(6, 2)
  }
  obtainDate (date, days) {
    date = date.replace(/-/g, '/')
    var d = new Date(date)
    d.setDate(d.getDate() - days)
    var m = d.getMonth() + 1
    var day = d.getDate()
    if (Number(m) < 10) {
      m = '0' + m
    }
    if (Number(day) < 10) {
      day = '0' + day
    }
    return d.getFullYear() + '' + m + '' + day
  }

  /* 短信验证码校验 */
  checkMsgCode (msgCode) {
    if (msgCode.length !== 6) {
      let reg = /^\d{6}$/
      if (!reg.test(str)) {
        alert('短信验证码格式错误')
        return false
      }
    } else {
      return true
    }
  }

  /* 校验是否为空 */
  isNull (str) {
    str = '' + str
    if (str === 'null' || str == null || typeof (str) === 'undefined' || str === 'undefined' || str === '') {
      return true
    }
    return false
  }

  /* 生成当前时间2017-08-02 10:12:39 */
  getCurrentTimeTo () {
    var date = new Date()
    var year = date.getFullYear() + '-'
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '-' : (date.getMonth() + 1) + '-'
    var day = (date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate())
    var hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
    var minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    var second = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())

    return year + month + day + hour + ':' + minute + ':' + second
  }

  /**
   *
   * @param beginTime 日期1 YYYY-MM-dd HH：mm：ss
   * @param endTime 日期2 YYYY-MM-dd HH：mm：ss
   * = true   > false     < true
   */
  compareTime (beginTime, endTime) {
    var beginTimes = beginTime.substring(0, 10).split('-')
    var endTimes = endTime.substring(0, 10).split('-')

    var beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19)
    var endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19)
    var a = (Date.parse(new Date(endTime.replace(/-/g, '/'))) - Date.parse(new Date(beginTime.replace(/-/g, '/')))) / 3600 / 1000
    if (a < 0) {
      return false
    } else if (a >= 0) {
      return true
    }
  }
  /**
 * YYYYMMdd--->YYYY-MM-dd
 */
getFormatData (strDate) {
  return strDate.substr(0, 4) + '-' + strDate.substr(4, 2) + '-' + strDate.substr(6, 2)
}

changeTime (x) {
  var str = x.trim()
  return str.substring(8, 10) + ':' + str.substring(10, 12) + ':' + str.substring(12, 14)
}
// 不允许纯空格
checkBlank (fieldId, tipMsg) {
  var fieldValue = fieldId
  if (fieldValue !== '' && /^(( )|(　)){1,}$/i.test(fieldValue)) {
    alert('请输入合法的' + tipMsg + ',不允许为纯空格')
    return false
  }
  return true
}
// js生成当前时间2017-08-02 10:12:39
 getCurrentTimeTo () {
  var date = new Date()
  var year = date.getFullYear() + '-'
  var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '-' : (date.getMonth() + 1) + '-'
  var day = (date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate())
  var hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
  var minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  var second = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())

  return year + month + day + hour + ':' + minute + ':' + second
}
  // 将金额处理保留两位小数
returnFloat (value) {
  var value = Math.round(parseFloat(value) * 100) / 100
  var xsd = value.toString().split('.')
  if (xsd.length === 1) {
    value = value.toString() + '.00'
    return value
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + '0'
    }
    return value
  }
}
  // 获取随机数
  randomString () {
    const str = Math.random().toString(36).slice(-10)
    return str
  }
  getCitySN () {
    let ip_address
    try {
      if (this.isNull(returnCitySN['cip'])) {
        ip_address = '127.0.0.1' // IP地址
      } else {
        ip_address = returnCitySN['cip'] // IP地址
      }
    } catch (err) {
      ip_address = '127.0.0.1' // IP地址
    }
    return ip_address
  }
}

Object.defineProperty(Vue.prototype, '$utils', {
  value: new WeChatUtils()
})
