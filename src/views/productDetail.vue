<template>
    <div class="product_detail">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>

        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" dot  @click="onClickIcon(0)"/>
            <van-goods-action-icon icon="cart-o" text="购物车" badge="5" @click="onClickIcon(1)" />
            <van-goods-action-icon icon="shop-o" text="店铺" badge="12"  @click="onClickIcon(2)"/>
            <van-goods-action-button type="warning" text="加入购物车" />
            <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';


export default {
    name: "productDetail",
    components: {
        appHeader:appHeader,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionIcon.name]: GoodsActionIcon,
        [GoodsActionButton.name]: GoodsActionButton,

    },
    data(){
        return{
            headertitle:"产品详情",
            userIconShow:false,
            productId:"",
        }
    },
    methods: {
        onClickIcon() {
            this.Utils.vants.Toast('点击图标');
        },
        onClickButton() {
            this.Utils.vants.Toast('点击按钮');
        },
    },
    created() {
        let productId=this.$route.query.id?this.$route.query.id:0;
        this.productId=productId;
    },
}
</script>
<style lang="scss" scoped>

</style>