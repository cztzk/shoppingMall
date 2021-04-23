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

Mock.mock('api/user/getMsgList', getMsgList());
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