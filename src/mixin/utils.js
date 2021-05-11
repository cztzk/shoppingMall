//接口管理
let config = {
    // 首页
    getIndexBanner: "index/bannerList", //banner图 测试
    getIndexClassify: "index/classifyList", //首页分类
    // 产品
    getIndexProductList: "product/list", //产品列表
    getProducDetail: "product/detail", //产品详情
    // 用户中心
    login: "user/login",//用户登录
    getRecommendList: "user/recommendList",//猜你喜欢
    getAddrList:"user/addrList",//地址列表
    getContactList:"user/contactList",//联系人列表
    getMsgList:"user/msgList",//信息中心列表
    getOrderList:"user/orderList"
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
            // console.log(res);
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
 * getDateTips 日期提示 - v1.0.0 2021-4-23
 * @param nowDate 现在的日期 YY/MM/DD HH:mm:ss
 * @param date 几天后日期 YY/MM/DD HH:mm:ss
 * @param dayStamp 一天的秒数
 */
 function getDateTips(nowDate,date) {
    const dayStamp = 86400000;
    nowDate=nowDate?nowDate:new Date(new Date().toLocaleDateString()).getTime();
    let formerlySeven = nowDate - dayStamp * 6; //过去7天的时间

    let dateArr = date ? date.split(" ") : "";
    let dates = new Date(dateArr[0]).getTime();
    return nowDate == dates ? dateArr[1].slice(0, 5) : (dates > formerlySeven ? parseInt((nowDate - dates) / dayStamp) + "天" : "一周前");
}

/**
 * getDateTips 获取数天后的日期 - v1.0.0 2021-4-24
 *  @param dayStamp 一天的秒数
 *  @param days 计算几天后的时间戳
 */
function getLastDate(days){
    const dayStamp = 86400000;
    return new Date(new Date().getTime() + days  *dayStamp);
}

/**
 * numberFormat  大数字格式化 - v1.0.0 2021-4-24
 * @param value：要格式化的数字
 */

 function numberFormat (value) {
    var param = {};
    var k = 10000,
        sizes = ['', '万', '亿', '万亿'],
        i;
        if(value < k){
            param.value =value
            param.unit=''
        }else{
            i = Math.floor(Math.log(value) / Math.log(k)); 
            param.value = ((value / Math.pow(k, i))).toFixed(2);
            param.unit = sizes[i];
        }
    return param.value+param.unit;
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
import { Toast,Dialog } from 'vant'
let vants = {
    Toast,
    Dialog
}

// 将相关的数据及方法暴露出去
export default {
    config,
    axiosGet,
    axiosPost,
    vants,
    getTotalPageNum,
    formatMoney,
    getDateTips,
    getLastDate,
    numberFormat
}