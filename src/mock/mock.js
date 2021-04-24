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
                "count|0-200": 0,
                "describe": Random.cparagraph(),
                "price|1-100": 100,
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