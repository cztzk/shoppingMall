//接口管理
let config = {
    // 首页
    getIndexBanner: "index/bannerList", //banner图 测试
    getIndexClassify: "index/classifyList", //首页分类
    // 产品
    getIndexProductList: "product/list", //产品列表
    login: "user/login",//用户登录
    // 用户中心
    getRecommendList: "user/recommendList",//猜你喜欢
    getAddrList:"user/addrList",
    getContactList:"user/contactList"
}

/**
 * axios get请求  - v1.0.0 2021-2-20
 * @param _this this对象
 * @param url 请求路径
 * @param success 成功事件
 * @param fail 失败事件
 */

function axiosGet(_this, url, success, fail) {
    _this.axios
        .get(process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL + url : url)
        .then(function(res) {
            success(res);
        })
        .catch(function(err) {
            console.log(err);
            fail(err);
        });
}

/**
 * axios post请求  - v1.0.0 2021-2-20
 * @param _this this对象
 * @param url 请求路径
 * @param data 请求参数
 * @param success 成功事件
 * @param fail 失败事件
 */
function axiosPost(_this, url, data, success, fail) {
    _this.axios.post(process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL + url : url, data)
        .then(function(res) {
            success(res);
        })
        .catch(function(err) {
            console.log(err);
            fail(err);
        });
}

/**
 * getTotalPageNum 获取页码总数 - v1.0.0 2021-2-24
 * @param totalRecord  总条数
 * @param maxResult  每页最大记录数
 */
function getTotalPageNum(totalRecord, maxResult) {
    return totalRecord % maxResult == 0 ? totalRecord / maxResult : Math.ceil(totalRecord / maxResult)
}


/**
 * formatMoney 格式化金额 - v1.0.0 2021-4-14
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认2位
 * @param decPoint：小数点符号 默认.
 * @param thousandsSep：千分位符号 默认为,
 */

function formatMoney (number, decimals = 2, decPoint = '.', thousandsSep = ','){
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    let s = ''
    let toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec)
      return '' + Math.ceil(n * k) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
  }

/*!
 * vant 方法混入 - v1.0.0 2021-2-22
 */
import { Toast } from 'vant'
let vants = {
    Toast
}

// 将相关的数据及方法暴露出去
export default {
    config,
    axiosGet,
    axiosPost,
    vants,
    getTotalPageNum,
    formatMoney
}