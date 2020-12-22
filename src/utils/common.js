import router from '@/router/index'
import Vue from 'vue'
import request from '@/utils/request'

/**
 * YYYY-MM-dd转换成YYYYMMdd
 * @returns
 */
export function getBirthDate (strBirthday) {
  var returnDate = ''
  var strBirthdayArr = strBirthday.split('-')
  var birthYear = strBirthdayArr[0]
  var birthMonth = strBirthdayArr[1]
  var birthDay = strBirthdayArr[2]
  return birthYear + birthMonth + birthDay
}

/**
 * 两个日期大小比较
 * @param d1 YYYY-MM-dd
 * @param d2 YYYY-MM-dd
 * @returns {Boolean}
 */
export function compareDate (d1, d2) {
  return ((new Date(d1.replace(/-/g, '\/'))) >= (new Date(d2.replace(/-/g, '\/'))))
}


/**
 * 千分位转换方法
 * @param num 要转换的数字
 * @param cent  保留的小数位数
 */
export function toThousands (num, cent) {
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
 *
 * @param beginTime 日期1 YYYY-MM-dd HH：mm：ss
 * @param endTime 日期2 YYYY-MM-dd HH：mm：ss
 */
/// / = true   > false     < true
export function compareTime (beginTime, endTime) {
  var beginTimes = beginTime.substring(0, 10).split('-')
  var endTimes = endTime.substring(0, 10).split('-')

  var beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19)
  var endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19)
  var a = (Date.parse(new Date(endTime.replace(/-/g, '/'))) - Date.parse(new Date(beginTime.replace(/-/g, '/')))) / 3600 / 1000
  //    var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
  if (a < 0) {
    return false
  } else if (a >= 0) {
    return true
  }
}

/**
 * 根据坐标查询城市
 * @param longitude 经度
 * @param latitude 纬度
 * result data[]
 * */
export function geiLatlng (longitude, latitude) {
  if (longitude != null && latitude != null && longitude != undefined && latitude != undefined) {
    var cityLsit = [] // 城市列表
    var language = 'CN' // 默认中文
    if (window.localStorage) {
      if (window.localStorage.languages != null && window.localStorage.languages != undefined) {
        language = window.localStorage.languages.value == 'zh-en' ? 'EN' : 'CN' // 用户是否有自定义的语言
      }
    }
    // 根据坐标查询当前城市
    return request({
      type: 'get',
      url: 'http://maps.google.cn/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&language=' + language, // 谷歌查询接口
      async: true,
      data: null,
      success: function (res) {
        if (res != null && res.status === 'OK') {
          var data = res.results
          var temp = []
          for (x in data) {
            if (data[x].address_components !== undefined) {
              for (y in data[x].address_components) {
                if (data[x].address_components[y].types[0] === 'locality') {
                  temp.push(data[x].address_components[y].long_name)
                }
              }
            }
          }
          // 数组去重
          if (cityLsit.length > 0) {
            for (var i = 0; i < cityLsit.length; i++) {
              if (cityLsit.indexOf(cityLsit[i]) !== i) {
                cityLsit.splice(i, 1) // 删除数组元素后数组长度减1后面的元素前移
                i-- // 数组下标回退
              }
            }
          }
        }
      },
      error: function (res) {
        alert('Position Error！')
      }
    })
    console.log('城市信息------' + cityLsit)
    return cityLsit
  }
}
