<template>
    <div class="order_detail">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-cell  is-link :to="'express?id='+orderItem.id" >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <div class="order_info flex_nowrap">
                    <van-icon name="logistics" color="#07c160"  />
                    <div>
                        <h4 class="ellipsis">佛山市包裹已签收！签收人是门卫，如有疑问，请致电咨询客服</h4>
                        <h6>2012-05-12</h6>
                    </div>
                </div>
            </template>
        </van-cell>
        <van-cell >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <div class="order_info flex_nowrap">
                    <van-icon name="location-o" color="#c82519"  />
                    <div>
                        <h4 class="ellipsis">唐 1304917xxxx 佛山市禅城区xxx大道xxx小区</h4>
                        <h6>佛山市禅城区</h6>
                    </div>
                </div>
            </template>
        </van-cell>
        <div class="order_cont flex_nowrap">
            <van-image class="order_img" :src="orderItem.portrait"/>
            <div class="order_info">
                <h3 class="ellipsis2">{{orderItem.describe}}</h3>
                <h5 class="ellipsis">{{orderItem.tips}}</h5>
                <van-tag type="success" v-if="orderItem.orderState==3||4||5">退货包运费保障中</van-tag>
            </div>
        </div>
        <div class="order_tips">
            <h5>订单编号:{{orderItem.orderNumber}}</h5>
            <h5>支付方式:{{orderItem.payment}}</h5>
            <h5>物流公司:{{orderItem.express}}</h5>
            <h5>快递单号:{{orderItem.expressNumber}}</h5>
            <h5>下单时间:{{orderItem.date}}</h5>
        </div>
         <div class="user_recommend" v-if="recommendList.length>0">
            <h3>猜你喜欢</h3>
            <product-item v-for="(item,idx) in recommendList" :productItem="item" :key="idx"></product-item>
        </div>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { Cell, CellGroup,Icon,Tag, Image as VanImage,Dialog  } from 'vant';
import productItem from "@/components/productItem.vue";

export default {
    name: "orderDetail",
    components: {
        appHeader:appHeader,
        [Cell.name]: Cell,
        [Tag.name]: Tag,
        [CellGroup.name]: CellGroup,
        [Icon.name]: Icon,
        [VanImage.name]: VanImage,
        [Dialog.name]: Dialog,
        productItem:productItem,
    },
    data(){
        return{
            headertitle:"订单详情",
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
.order_info {
    width: 320px;
    .van-icon {
        top: 4px;
        margin-right: 5px;
    }
    div{
        width: 290px;
    }
}
 .order_cont{
    margin: 10px 0;
    background: #fff;
    padding: 10px 15px;
  }
  .order_img{
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .order_info{
    width: 230px;
    h3{
      color: #333;
      font-size: 14px;
    }
    h5{
      color: #999;
      font-size: 10px;
      margin: 2px 0 0;
    }
    .van-tag{
          align-items: flex-start;
    }
  }
  .order_tips{
    background: #fff;
    padding: 15px 15px;
    h5{
        font-size: 12px;
        line-height: 2;
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