//接口管理
let config = {
    // 首页
    getIndexBanner: "index/bannerList", //banner图 测试
    getIndexClassify: "index/classifyList", //首页分类
    // 产品
    getIndexProductList: "product/list", //产品列表
    login: "user/login",
    getTabelList: "table/list",
    getMsgList: "user/msglist",
}

/*!
 * axios get请求  - v1.0.0 2021-2-20
 * _this this对象
 * url 请求路径
 * success 成功事件
 * fail 失败事件
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

/*!
 * axios post请求  - v1.0.0 2021-2-20
 * _this this对象
 * url 请求路径
 * data 请求参数
 * success 成功事件
 * fail 失败事件
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
 * totalRecord  总条数
 * maxResult  每页最大记录数
 * 
 */
function getTotalPageNum(totalRecord, maxResult) {
    return totalRecord % maxResult == 0 ? totalRecord / maxResult : Math.ceil(totalRecord / maxResult)
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
    getTotalPageNum
}