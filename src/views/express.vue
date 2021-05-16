<template>
    <div class="express_container">
         <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
         <div class="express_top flex_left">
            <van-image class="order_img" :src="orderItem.portrait"/>
            <h4>{{orderItem.express}}:<span>{{orderItem.expressNumber}}</span></h4>
         </div>
          <van-cell >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <div class="order_info flex_left">
                    <van-icon name="location-o" color="#c82519"  />
                    <div>
                        <h4 class="ellipsis">唐 1304917xxxx 佛山市禅城区xxx大道xxx小区</h4>
                        <h6>佛山市禅城区</h6>
                    </div>
                </div>
            </template>
        </van-cell>
        <div class="express_info">
            <div class="express_info_item" v-for="(item,index) in orderItem.expressInfo" :key="index">
                <h5>{{item.info}}</h5>
                <h6>{{item.date}}</h6>
            </div>
        </div>
        <div class="user_recommend" v-if="recommendList.length>0">
            <h3>猜你喜欢</h3>
            <product-item v-for="(item,idx) in recommendList" :productItem="item" :key="idx"></product-item>
        </div>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { Cell, CellGroup,Icon,Image as VanImage,Dialog  } from 'vant';
import productItem from "@/components/productItem.vue";

export default {
    name: "express",
    components: {
        appHeader:appHeader,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Icon.name]: Icon,
        [VanImage.name]: VanImage,
        [Dialog.name]: Dialog,
        productItem:productItem,
    },
    data(){
        return{
            headertitle:"物流信息",
            userIconShow:false,
            orderItem:new Array,
            userInfo:new Array,
            recommendList:new Array,
        }
    },
    methods:{
        getUser(){
            let user=this.Storage.localData("get" ,"user");
            user?(this.userInfo=user,this.getOrderDetail(),this.getList()):this.$router.push({ path: "/login" });
        },
        getList() {
            let _this = this;
            let data={
               userId:_this.userInfo.id
            };
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getRecommendList,
                data,
                res => {
                    _this.recommendList=_this.recommendList.concat(res.list);
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        },
        getOrderDetail(){
            let _this = this;
            if(_this.orderId!=""){
                let data={
                    userId:_this.userInfo.id,
                    orderId:_this.orderId,
                };
                _this.Utils.axiosPost(
                    _this,
                    _this.Utils.config.getOrderDetail,
                    data,
                    res => {
                        _this.orderItem=res.list;
                    },
                    err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
                );
            }else{
                Dialog.alert({
                    title: '提示',
                    message: '参数异常，请重试',
                }).then(() => {
                    _this.$router.back(-1);
                });
            }
        }
    },
    created() {
        this.orderId=this.$route.query.id?this.$route.query.id:"";
        this.getUser();
    },
}
</script>
<style lang="scss" scoped>
    .express_top{
        padding: 10px 15px;
        background: #fff;
        .van-image{
            width: 30px;
            height: 30px;
            margin-right: 10px;
        }
        h4{
            color: $mainColor;
            span{
                color: #666;
            }
        }
    }
    .van-cell{
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }
    .order_info{
        flex-wrap: nowrap;
     
        .van-icon{
            font-size: 20px;
            margin-right: 10px;
        }
    }
    .express_info{
        background: #fff;
        padding: 10px 15px;
        margin-bottom: 10px;
    }
    .express_info_item{
        padding-left: 20px;
        position: relative;
        padding-bottom: 10px;
        &:last-child::after{
            display: none;
        }
        &:first-child::after{
            top: 4px;
        }
        &::before{
            display: block;
            content: "";
            position: absolute;
            top: 4px;
            left: 7px;
            width: 7px;
            height: 7px;
            background: #dcdee0;
            border-radius: 5px;
        }
        &::after{
            display: block;
            content: "";
            position: absolute;
            top: 0;
            bottom: -5px;
            left: 10px;
            width: 1px;
            background: #dcdee0;
        }
        h5{
            line-height: 1.8;
            color: #333;
        }
        h6{
            color: #666;
        }
    }
    .user_recommend{
        background: #fff;
        margin-top: 10px;
        h3{
            color: #333;
            padding:10px 15px;
        }
    }
    .proder_classify{
        margin-bottom: 10px;
    }
</style>