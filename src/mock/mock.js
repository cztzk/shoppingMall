import Mock from 'mockjs';
let Random = Mock.Random

Mock.mock('api/index/bannerList', getDate({
    "id|10001-11000": 0,
    "role": 0,
    "date": Random.date('yyyy-MM-dd'),
    "imgUrl": Random.image('345x200'),
    "isShow|1": true,
    "title": Random.title()
}, 5));

Mock.mock('api/index/classifyList', getDate({
    "id|10001-11000": 0,
    "date": Random.date('yyyy-MM-dd'),
    "icon": Random.image('50x50'),
    "isProduct|1": true,
    "title": Mock.mock('@ctitle(5)'),
    "url": "/productList"
}, 8));


Mock.mock('api/user/login', {
    "code": 0,
    "data": {
        "id|10001-11000": 0,
        "username": "@cname",
        "email": "admin@qq.com",
        "tel": "13049******",
        "role": 0,
        "createTime": 1479048325000,
        "updateTime": 1479048325000,
        "date": Random.date('yyyy-MM-dd'),
        "addr": Random.county(true),
        "portrait": Random.image('200x200'),
        "balance|1-10000": 1000,
        "grade": Random.integer(0, 2)
            //grade 等级 0游客 1用户 2Vip
    },
    msg: "",
});



Mock.mock('api/user/addrList', getDate({
    "id|10001-11000": 0,
    "role": 0,
    "date": Random.date('yyyy-MM-dd'),
    "isDefault|1": true,
    "isDisabled|1": true,
    "name": "@cname",
    "tel": "13049******",
    "address": Random.county(true),
}, 5));

Mock.mock('api/user/contactList', getDate({
    "id|10001-11000": 0,
    "name": "@cname",
    "tel": "13049******",
    "isDefault|1": true,
}, 10));

Mock.mock('api/product/list', getDateList());

Mock.mock('api/user/recommendList', getDateList(10));

// 生成商品列表数据
function getDateList(total) {
    let dataList = {
        code: 0,
        data: {
            list: new Array,
            total:total?total:Random.integer(0, 30)
        },
        msg: ""
    };
    for (let i = 0; i < 10; i++) {
        dataList.data.list.push(
            Mock.mock({
                "id|10001-11000": 0,
                "name": Random.ctitle(),
                "date": Random.date('yyyy-MM-dd'),
                "imgUrl": Random.image('200x200'),
                "describe": Random.cparagraph(),
                "price|1-100": 100,
                "count|0-200": 0,
                "orginPrice|101-200": 100,
            })
        )
    }
    return dataList;
}


/**
 * getDetail 获取产品详情  - v1.0.0 2021-2-20
 * @param productState 商品状态 0无货 1正常出售 2开始预约 3开始抢购
 * @param endDate 预约/抢购结束时间 默认五天后
 */
Mock.mock('api/product/detail', getDetail());

function getDetail(){
    const dayStamp = 86400000;
    let endDate= new Date(new Date().getTime() + 5  *dayStamp);
    let dataList = {
        code: 0,
        data:{
            "imgArr":[{
                imgUrl:"https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/181763/30/141/131472/607f39d0Eeb10fd17/dcac185f97ee5878.jpg!q80.dpg.webp",
                title:"苹果12"
            },  {
                imgUrl:"https://m.360buyimg.com/mobilecms/s843x843_jfs/t1/169183/3/19030/139102/607f39e0Ec224e875/5d57c1eeae1e206e.jpg!q70.dpg.webp",
                title:"苹果12"
            },
            {
                imgUrl:"https://m.360buyimg.com/mobilecms/s843x843_jfs/t1/179571/30/156/314754/607f39e3E2ef096e9/91db2d745b35a4fe.jpg!q70.dpg.webp",
                title:"苹果12"
            },
            {
                imgUrl:" https://m.360buyimg.com/mobilecms/s843x843_jfs/t1/176431/20/5672/198899/607f39e7E26b97c96/6a5e773dbd17b7db.jpg!q70.dpg.webp",
                title:"苹果12"
            },
            {
                imgUrl:"https://m.360buyimg.com/mobilecms/s843x843_jfs/t1/160278/10/20581/140456/607f39ebE4969f240/8644228117ccf74a.jpg!q70.dpg.webp",
                title:"苹果12"
            },
            {
                imgUrl:"https://m.360buyimg.com/mobilecms/s843x843_jfs/t1/175560/16/5642/74507/607f39f7Edfed0da7/3293133534db187d.jpg!q70.dpg.webp",
                title:"苹果12"
            }],
            "id|10001-11000": 0,
            "name": Random.ctitle(),
            "date": Random.date('yyyy-MM-dd'),
            "count|0-2000": 0,
            // "productState|0-4":0,
            "productState":3,
            "appointment|0-2000000":0,
            "endDate":endDate,
            "describe": Random.cparagraph(),
            "price|1-100": 100,
            "orginPrice|101-200": 100,
            "detailCont":'<div id="commDesc" class="detail_pc" hasdata="1" ><div skucode="100011"></div><table id="__01" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"><tbody><tr><td><img src="//img12.360buyimg.com/cms/jfs/t1/172086/31/2422/157095/606d6125E208ce5d9/646334a7e7516b0f.jpg!q70.dpg.webp" alt="" width="100%" usemap="#fuwu2" border="0" loaded="5"> </td></tr></tbody></table><map name="fuwu2"></map><div style="width:100%;margin:0 auto;"><img src="//img20.360buyimg.com/cms/jfs/t1/181246/26/149/849592/607f3526Ed6d5d8ef/579f4894dd028ac0.jpg!q70.dpg.webp" loaded="4"> <img src="//img12.360buyimg.com/cms/jfs/t1/174086/37/5756/850254/607f3526E2f312492/245b204eb519851b.jpg!q70.dpg.webp" loaded="3"> <img src="//img30.360buyimg.com/cms/jfs/t1/181540/7/143/592521/607f3526Ea1983e7c/e0284825894da667.jpg!q70.dpg.webp" loaded="2"> <img src="//img14.360buyimg.com/cms/jfs/t1/182673/8/149/729159/607f3526E8d2a2928/c347f849811d0965.jpg!q70.dpg.webp" loaded="1"> </div><script></script></div>',
            "parameter":'<div style="padding:30px 20px"><h4>产品参数内容</h4?</div>',
            "guarantee":'<div style="padding:30px 20px"><h4>售后保障内容</h4?</div>',
            "skuTree":  {
                tree: [
                    {
                        k: '颜色', // skuKeyName：规格类目名称
                        k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        v: [{
                                id: '0', // skuValueId：规格值 id
                                name: '黑色', // skuValueName：规格值名称
                                imgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/165454/33/20275/68592/6082625cE28fa7675/dbd9d7caead46bac.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/165454/33/20275/68592/6082625cE28fa7675/dbd9d7caead46bac.jpg', // 用于预览显示的规格类目图片
                            },{
                                id: '1', // skuValueId：规格值 id
                                name: '白色', // skuValueName：规格值名称
                                imgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/163942/16/20370/72739/60826288Eb82f92d9/6cad9a4db835364e.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/163942/16/20370/72739/60826288Eb82f92d9/6cad9a4db835364e.jpg', // 用于预览显示的规格类目图片
                            },{
                                id: '2', // skuValueId：规格值 id
                                name: '蓝色', // skuValueName：规格值名称
                                imgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/172139/17/6090/78110/608262e4E4ca59835/02e2fb3b97f27955.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/172139/17/6090/78110/608262e4E4ca59835/02e2fb3b97f27955.jpg', // 用于预览显示的规格类目图片
                            },{
                                id: '3', // skuValueId：规格值 id
                                name: '绿色', // skuValueName：规格值名称
                                imgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/179988/34/541/74128/6082632dE46a94129/aa18aaaa2c59039d.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/179988/34/541/74128/6082632dE46a94129/aa18aaaa2c59039d.jpg', // 用于预览显示的规格类目图片
                            },{
                                id: '4', // skuValueId：规格值 id
                                name: '红色', // skuValueName：规格值名称
                                imgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/178771/21/566/83658/608262bbE4a2429d1/79d550b7ca2742d8.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/178771/21/566/83658/608262bbE4a2429d1/79d550b7ca2742d8.jpg', // 用于预览显示的规格类目图片
                            },{
                                id: '5', // skuValueId：规格值 id
                                name: '紫色', // skuValueName：规格值名称
                                imgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/181763/30/141/131472/607f39d0Eeb10fd17/dcac185f97ee5878.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img14.360buyimg.com/n4/jfs/t1/181763/30/141/131472/607f39d0Eeb10fd17/dcac185f97ee5878.jpg', // 用于预览显示的规格类目图片
                            }],
                        largeImageMode: false, //  是否展示大图模式
                    },{
                        k: '内存', // skuKeyName：规格类目名称
                        k_s: 's2', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        v:[
                            {
                                id: '0', // skuValueId：规格值 id
                                name: '64G', // skuValueName：规格值名称
                            }, {
                                id: '1', // skuValueId：规格值 id
                                name: '128G', // skuValueName：规格值名称
                            }, {
                                id: '2', // skuValueId：规格值 id
                                name: '256G', // skuValueName：规格值名称
                            }
                        ],
                        largeImageMode: false, //  是否展示大图模式
                    }
                ],
                list: [
                    {
                        id: 2259, // skuId
                        s1: '0', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '0', // 规格类目 k_s 为 s2 的对应规格值 id
                        price: 599900, // 价格（单位分）
                        stock_num: 400 // 当前 sku 组合对应的库存
                    }, {
                        id: 2260, // skuId
                        s1: '0', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                        price: 679900, // 价格（单位分）
                        stock_num: 300 // 当前 sku 组合对应的库存
                    }, {
                        id: 2261, // skuId
                        s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                        price: 679900, // 价格（单位分）
                        stock_num: 500 // 当前 sku 组合对应的库存
                    }, {
                        id: 2262, // skuId
                        s1: '3', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                        price: 679900, // 价格（单位分）
                        stock_num: 300 // 当前 sku 组合对应的库存
                    }, {
                        id: 2260, // skuId
                        s1: '5', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
                        price: 759900, // 价格（单位分）
                        stock_num: 300 // 当前 sku 组合对应的库存
                    }, {
                        id: 2260, // skuId
                        s1: '4', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
                        price: 759900, // 价格（单位分）
                        stock_num: 1100 // 当前 sku 组合对应的库存
                    },
                ],
                price: '5999.00', // 默认价格（单位元）
                stock_num: 2000, // 商品总库存
                collection_id: 2259, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                none_sku: false, // 是否无规格商品
                hide_stock: false // 是否隐藏剩余库存,
            }
        },
        msg: ""
    };
    return dataList;
} 

Mock.mock('api/user/msgList', getMsgList());
// 获取信息中心列表
function getMsgList(){
    let total=Random.integer(0, 30);
    let dataList = {
        code: 0,
        data: {
            list: new Array,
            oldList: new Array,
            total:total,
            classList:[
                {
                    name:"我的订单",
                    id:0,
                    count: 10,
                    url:"/order",
                    icon:"orders-o",
                    backgroundColor:"#c82519"
                },{
                    name:"联系客服",
                    id:1,
                    count: 20,
                    url:"/service",
                    icon:"orders-o",
                    backgroundColor:"#ee0a24"
                },{
                    name:"用户中心",
                    id:1,
                    count: 0,
                    url:"/user",
                    icon:"user-o",
                    backgroundColor:"#f1503b"
                }
            ]
        },
        msg: ""
    };
    for (let i = 0; i < total; i++) {
        dataList.data.list.push(
            Mock.mock({
                "id|10001-11000": 0,
                "name": "@cname",
                "date": "2021/4/23 "+ Mock.mock('@time("HH:mm:ss")'),
                "portrait": Random.image('200x200'),
                "count|0-200": 0,
                "isRead|0-1": true,
                "describe": Random.cparagraph(),
            })
        )
        dataList.data.oldList.push(
            Mock.mock({
                "id|10001-11000": 0,
                "name": "@cname",
                "date": Random.date('yyyy-MM-dd'),
                "portrait": Random.image('200x200'),
                "count|0-200": 0,
                "isRead|0-1": true,
                "describe": Random.cparagraph(),
            })
        )
    }
    return dataList;
}

/*
生成对应数据事件
optionss 具体参数
生成N条数据
*/
function getDate(optionss, leng) {
    let dataArr = {
        code: 0,
        data: [],
        msg: "",
    }
    for (let i = 0; i < leng; i++) {
        dataArr.data.push(optionss);
    }
    return dataArr
}

// 
/**
 * getOrderList 生成订单列表  - v1.0.0 2021-2-20
 * @param orderState 订单状态 1待付款 2待发货 3待收货 4待评价 5售后
 */
Mock.mock('api/user/orderList', getOrderList());

function getOrderList(){
    let total=Random.integer(0, 30);
    let dataList = {
        code: 0,
        data: {
            list: new Array,
            total:total,
        },
        msg: ""
    };
    for (let i = 0; i < 10; i++) {
        dataList.data.list.push(
            Mock.mock({
                "id|10001-11000": 0,
                "name": "华为官方旗舰店",
                "date": "2021/4/23 "+ Mock.mock('@time("HH:mm:ss")'),
                "portrait": Random.image('200x200'),
                "count|0-200": 0,
                "isRead|0-1": true,
                "describe": Random.cparagraph(),
                "tips": Random.cparagraph(),
                "orderState|1-5":1
            })
        )
    }
    return dataList;
}

/**
 * getOrderList 生成订单详情  - v1.0.0 2021-2-20
 * @param orderState 订单状态 1待付款 2待发货 3待收货 4待评价 5售后
 */


 Mock.mock('api/user/orderDetail', getOrderDetail());

 function getOrderDetail(){
    let dataList = {
        code: 0,
        data: {
            list: new Array,
            total:1,
        },
        msg: ""
    };
    dataList.data.list=Mock.mock({
        "id|10001-11000": 0,
        "name": "华为官方旗舰店",
        "date": "2021/4/23 "+ Mock.mock('@time("HH:mm:ss")'),
        "portrait": Random.image('200x200'),
        "count|0-200": 0,
        "isRead|0-1": true,
        "describe": Random.cparagraph(),
        "tips": Random.cparagraph(),
        "orderState|1-5":1,
        'orderNumber': /\d{10,15}/,
        "payment|1": [
           "支付宝",
           "微信支付",
           "银行支付",
        ],
        "express|1": [
            "中通快递",
            "圆通快递",
            "韵达快递",
            "百世汇通",
            "顺丰快递",
         ],
         "expressNumber": /\d{10,15}/,
         "expressInfo":[
            {
                info:"商家已发货，正在通知快递公司取件",
                date:"2021-05-12 12:16:51"
            },{
                info:"您的订单已打包完成",
                date:"2021-05-12 12:16:49"
            },{
                info:"您的订单验货完成",
                date:"2021-05-12 12:16:12"
            },{
                info:"您的订单一开始拣货",
                date:"2021-05-12 12:15:31"
            },{
                info:"商家开始打印拣货单",
                date:"2021-05-12 12:14:21"
            },{
                info:"订单确认，已通知商家配货",
                date:"2021-05-12 12:13:59"
            },{
                info:"你已提交订单，请等待系统确认",
                date:"2021-05-12 12:12:59"
            }
         ]
    })
    return dataList;
 }

 /**
 * getOrderList 生成购物车列表  - v1.0.0 2021-2-20
 * @param orderState 订单状态 1待付款 2待发货 3待收货 4待评价 5售后
 */


Mock.mock('api/user/cartList', getCartList());

function getCartList(){
    let total=Random.integer(0,5);
    let dataList = {
        code: 0,
        data: {
            list: new Array,
            total:total,
            ischecked: true,
            totalPrice:0,
        },
        msg: ""
    };
    for (let i = 0; i < total; i++) {
        dataList.data.list.push(
            Mock.mock({
                "id|10001-11000": 0,
                "name|1": [
                    "华为旗舰店",
                    "小米旗舰店",
                    "一加旗舰店",
                ],
                "date": "2021/4/23 "+ Mock.mock('@time("HH:mm:ss")'),
                "portrait": Random.image('200x200'),
                "ischecked": true,
                "commodityList":[
                    {
                        "img": Random.image('200x200'),
                        "id|10001-11000": 0,
                        "name|1": [
                            "华为p40",
                            "小米11",
                            "一加9",
                         ],
                        "price|1-100.1-2": 1,
                        "count|0-200": 0,
                        "orginPrice|101-200": 100,
                        "ischecked": true,
                        "sku|1": [
                            "黑色256G",
                            "天空之境512G",
                            "白色64G",
                         ],
                    },{
                        "img": Random.image('200x200'),
                        "id|10001-11000": 0,
                        "name|1": [
                            "华为p40",
                            "小米11",
                            "一加9",
                         ],
                         "price|1-100.1-2": 1,
                         "count|0-200": 0,
                         "orginPrice|101-200": 100,
                         "ischecked": true,
                         "sku|1": [
                            "黑色256G",
                            "天空之境512G",
                            "白色64G",
                         ],
                    }
                ]
            })
        )
    }
    return dataList;
}