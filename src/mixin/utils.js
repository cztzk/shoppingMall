//接口管理
let config = {
    // 首页
    getIndexBanner: "index/bannerList", //banner图 测试
    getIndexClassify: "index/classifyList", //首页分类
    // 产品
    getIndexProductList: "product/list", //产品列表
    getProducDetail: "product/detail", //产品详情
    getShoeDetail:"shop/detail",//商店信息
    // 用户中心
    login: "user/login",//用户登录
    getRecommendList: "user/recommendList",//猜你喜欢
    getAddrList:"user/addrList",//地址列表
    getContactList:"user/contactList",//联系人列表
    getMsgList:"user/msgList",//信息中心列表
    getOrderList:"user/orderList",//订单列表
    getOrderDetail:"user/orderDetail",//订单详情
    getCartList:"user/cartList",//购物车列表
}
/*!
 * vant 方法混入 - v1.0.0 2021-2-22
 */
import { Toast,Dialog } from 'vant'
let vants = {
    Toast,
    Dialog
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
 * accMul  乘法精度计算 - v1.0.0 2021-5-16
 */
 function accMul(arg1, arg2) {
    let ml = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
        ml += s1.split('.')[1].length
    } catch (e) {
        ml+=0;
    }
    try {
        ml += s2.split('.')[1].length
    } catch (e) {
        ml+=0;
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, ml)
}

function addNum(num1, num2) {
    let sq1, sq2, ml
    try {
        sq1 = num1.toString().split('.')[1].length
    } catch (e) {
        sq1 = 0
    }
    try {
        sq2 = num2.toString().split('.')[1].length
    } catch (e) {
        sq2 = 0
    }
    ml = Math.pow(10, Math.max(sq1, sq2));
    return (num1 * ml + num2 * ml) / ml
}

// 将相关的数据及方法暴露出去
export default {
    config,
    axiosGet,
    axiosPost,
    vants,
    getTotalPageNum,
    getDateTips,
    getLastDate,
    numberFormat,
    accMul,
    addNum
}