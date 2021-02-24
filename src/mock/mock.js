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
    "url": "/classify"
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
        "grade": Random.integer(0, 2)
            //grade 等级 0游客 1用户 2Vip
    },
    msg: "",
});


Mock.mock('api/user/msglist', getDate({
    "id|10001-11000": 0,
    "title": Random.title(),
    "status": Random.boolean(),
}, 5));

Mock.mock('api/product/list', getDateList());


// 生成列表数据
function getDateList() {
    let dataList = {
        code: 0,
        data: {
            list: new Array,
            total: Random.integer(0, 30)
        },
        msg: ""
    };
    for (let i = 0; i < 10; i++) {
        dataList.data.list.push(
            Mock.mock({
                "id|10001-11000": 0,
                "name": Random.cname(),
                "date": Random.date('yyyy-MM-dd'),
                "imgUrl": Random.image('345x200'),
                "count|0-200": 0,
                "describe": Random.cparagraph()
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