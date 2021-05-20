<template>
    <div class="product_detail">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-swipe class="detail_img" @change="onChange" v-if="productDetail.imgArr">
            <van-swipe-item v-for="(item,index) in productDetail.imgArr" :key="index">
                <van-image  :src="item.imgUrl" />
            </van-swipe-item>
            <template #indicator>
                <div class="custom-indicator">{{ current + 1 }}/{{productDetail.imgArr.length }}</div>
            </template>
        </van-swipe>
        <div class="appointment_box flex_justify_between" v-if="productDetail.productState==3||productDetail.productState==4">
            <div class="appointment_left flex_left">
                <h3>{{productDetail.price | formatMoney}}</h3>
                <h4>{{productDetail.appointment}}人已预约</h4>
            </div>
            <div class="appointment_right">
                <h5>{{productDetail.productState==3?"距离抢购开始还剩":"距离抢购结束还剩"}}</h5>
                <van-count-down :time="productDetail.endTime" format="DD 天 HH 时 mm 分 ss 秒" />
            </div>
        </div>
        <div class="detail_info">
            <h2 class="flex_left"><van-tag type="danger">自营</van-tag>{{productDetail.name}}</h2>
            <h5>{{productDetail.describe}}</h5>
            <h6><van-tag plain type="danger" v-if="productDetail.productState==3||productDetail.productState==4">抢购中</van-tag>数量有限，先到先得</h6>
        </div>
        <div class="discount_info" @click="toggleActionShow">
            <h3>优惠信息</h3>
            <h6 class="ellipsis"><van-tag plain type="danger">满额返券</van-tag>购母婴玩具食品医药清洁个护生鲜电脑数码家电酒水图书等部分自营商品满1元返券包</h6>
            <h6 class="ellipsis"><van-tag plain type="danger">免费领</van-tag>体验卡免费领，超大流量任性用</h6>
            <h6 class="ellipsis"><van-tag plain type="danger">优惠套装</van-tag>该商品共有6款优惠套装</h6>
        </div>
        <van-popup v-model="couponShow" round  position="bottom"  style="height: 90%; padding-top: 4px;">
            <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" @change="couponChange" @exchange="couponExchange"/>
        </van-popup>
        <van-tabs v-model="activeName" class="product_detail_info">
            <van-tab title="产品详情" name="a" v-html="productDetail.detailCont">
               {{productDetail.detailCont}}
            </van-tab>
            <van-tab title="产品参数" name="b" v-html="productDetail.parameter">
                {{productDetail.parameter}}
            </van-tab>
            <van-tab title="售后保障" name="c" v-html="productDetail.guarantee">
                {{productDetail.guarantee}}
            </van-tab>
        </van-tabs>
        <van-sku v-model="skuShow" :sku="sku" :goods="goods" :goods-id="productDetail.id" :quota="quota" :quota-used="quotaUsed" :hide-stock="sku.hide_stock"  @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked"/>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" dot  @click="onClickIcon(0)"/>
            <van-goods-action-icon icon="cart-o" text="购物车" badge="5" @click="onClickIcon(1)" />
            <van-goods-action-icon icon="shop-o" text="店铺" badge="12"  @click="onClickIcon(2)"/>
            <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
            <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
        </van-goods-action>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { GoodsAction, GoodsActionIcon, GoodsActionButton,Swipe, SwipeItem ,Image as VanImage,CountDown,Tag,CouponCell,CouponList ,Popup,Tab, Tabs ,Sku  } from 'vant';
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '15',
  unitDesc: '元',
};

export default {
    name: "productDetail",
    components: {
        appHeader:appHeader,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionIcon.name]: GoodsActionIcon,
        [GoodsActionButton.name]: GoodsActionButton,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [VanImage.name]: VanImage,
        [CountDown.name]: CountDown,
        [Tag.name]: Tag,
        [CouponCell.name]: CouponCell,
        [CouponList.name]: CouponList,
        [Popup.name]: Popup,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Sku.name]: Sku,
    },
    data(){
        return{
            headertitle:"产品详情",
            userIconShow:false,
            productId:"",
            current: 0,
            productDetail:[],
            couponShow:false,
            chosenCoupon: -1,
            coupons: [coupon],
            disabledCoupons: [coupon],
            activeName: 'a',
            skuShow: false,
            sku: {},
            goods: {
                picture: 'https://img14.360buyimg.com/n4/jfs/t1/165454/33/20275/68592/6082625cE28fa7675/dbd9d7caead46bac.jpg'
            },
            quota:0,
            quotaUsed:0,
          
        }
    },
    methods: {
        onAddCartClicked(item){
            console.log(item);
            this.Utils.vants.Toast('加入购物车成功');
            this.skuShow=!this.skuShow;
        },
        onBuyClicked(item){
            this.$router.push({
				path:"/payDetail",
				query:{
					id:item.goodsId
				}
			})
        },
        couponChange(index) {
            this.couponShow = false;
            this.chosenCoupon = index;
        },
        couponExchange(code) {
            console.log(code);
            this.coupons.push(coupon);
        },
        toggleActionShow(){
            this.couponShow=!this.couponShow;
        },
        onClickIcon(type) {
            // type 类型 0客服 1购物车 2商家
            // this.Utils.vants.Toast('点击图标');
            let productId=this.productId;
            let url=type==0?"/service":(type==1?"/cart":"/shopDetail");
            this.$router.push({
				path:url,
				query:{
					id:productId
				}
			})
        },
        onClickButton() {
            this.skuShow=true;
        },
        getDetail(){
            let _this = this;
            let data={
                productId:_this.productId,
            }
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getProducDetail,
                data,
                res => {
                    //endTime 预约/抢购结束时间
                    res.productState==3||res.productState==4? (res.endTime=new Date(res.endDate).getTime()-new Date().getTime(),res.appointment=_this.Utils.numberFormat(res.appointment)):"";
                    console.log(res);
                    _this.sku=res.skuTree;
                    _this.productDetail=res;
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        },
        onChange(index) {
            this.current = index;
        },
        noGetDetailId(){
            let _this = this;
            _this.Utils.vants.Dialog.alert({
                title: '提示',
                message: '产品参数异常，请重试',
            }).then(() => {
                _this.$router.back(-1);
            });

        }
    },
    created() {
        this.$route.query.id?(this.productId=this.$route.query.id,this.getDetail()):this.noGetDetailId();
    },
}
</script>
<style lang="scss" scoped>
    .detail_img{
        width: 375px;
        height: 375px;
        .van-image{
            width: 375px;
            height: 375px;
        }
    }
    .custom-indicator {
        position: absolute;
        right: 10px;
        bottom: 15px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
    }
    .appointment_box{
        padding: 0 10px;
        height: 50px;
        background: url("../assets/images/product_detail_state_bg.png") no-repeat;
        background-size: 100% 100%;
    }
    .appointment_left{
        width: 200px;
        h3{
            margin-right: 10px;
            color: #fff;
        }
        h4{
            color: #fff;
        }
    }
    .appointment_right{
        width: 130px;
        h5{
            color: #ff1450;
            margin-bottom: 2px;
        }
    }
    .van-count-down{
        font-size: 10px;
        line-height: 1.1;
    }
    .detail_info{
        padding:15px 20px;
        background: #fff;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        h3{ 
            color: #333;
        }
        .van-tag--danger{
            margin-right: 5px;
        }
        h5{
            line-height: 1.6;
            color: #999;
            margin: 5px 0;
        }
    }
    .discount_info{
        padding:15px 20px;
        border-radius: 15px;
        margin: 10px 0;
        background: #fff;
        h3{
            line-height: 1.6;
        }h6{
            margin-top: 10px;
            .van-tag{
                margin-right: 5px;
            }
        }
    }
    .product_detail_info {
        /deep/  img{
            display: block;
            width: 100%;
            height: auto;
        }
        /deep/ table{
            width: 100%;
        }
    }
</style>