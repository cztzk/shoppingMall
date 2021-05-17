<template>
    <div class="cart_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <div class="cart_list"  v-if="cartList.length>0">
            <cart-item v-for="(cartItem,index) in cartList" :cartItem="cartItem"  :key="index" @updateCart="updateCart"></cart-item>
        </div>
        <div v-else class="cart_tips">
            <p>~~  暂无商品  ~~</p>
        </div>
        <van-submit-bar :price="totalPrice" button-text="结算" @submit="settlement">
            <van-checkbox v-model="isAllchecked"  @click="allChecked"  checked-color="#c82519">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import {Checkbox, SubmitBar,Card,Field,Cell,Dialog} from 'vant';
import CartItem from '../components/cartItem.vue';

export default {
    name: "cart",
    components: {
        appHeader:appHeader,
        [Checkbox.name]:Checkbox,
        [Card.name]:Card,
        [Field.name]:Field,
        [Cell.name]:Cell,
        [Dialog.name]:Dialog,
        [SubmitBar.name]:SubmitBar,
        CartItem:CartItem,
    },
    data(){
        return{
            headertitle:"我的购物车",
            userIconShow:false,
            userInfo:new Array,
            cartList:new Array,
            choiceList:new Array,
            isAllchecked:false,
            totalPrice:0,
        }
    },
    methods:{
        // 全选按钮
        allChecked(){
            let isAllchecked=this.isAllchecked;
            let cartList=this.cartList;
            cartList.forEach(item=>{
                item.ischecked=isAllchecked;
                item.commodityList.forEach(items=>{
                    items.ischecked=isAllchecked;
                })
            })
            this.cartList=cartList;
            this.amount();
        },
        // 更新选择
        updateCart(){
            let cartList=this.cartList;
            this.isAllchecked=(cartList.findIndex(target=>target.ischecked===false)==-1)?true:false;
            this.amount();
        },
        // 计算
        amount(){
            let _this=this;
            let cartLists=_this.cartList;
            let choiceList=[];
            let totalPrice=0;
            cartLists.forEach(item=>{
                item.commodityList.forEach(items=>{
                    items.ischecked==true?choiceList.push(items):"";
                })
            });
            choiceList.forEach(item=>{
                totalPrice= _this.Utils.addNum(totalPrice, _this.Utils.accMul(item.count,item.price,totalPrice));
            });
            _this.choiceList=choiceList;
            _this.totalPrice=_this.Utils.accMul(totalPrice,100);
        },
        // 结算
        settlement(){
            let choiceList=this.choiceList;
            let _this=this;
            console.log(choiceList);
            const  toast=_this.Utils.vants.Toast.loading({
                duration: 0, // 持续展示 Toast
                forbidClick: true,
                message: '结算成功，3秒后跳回首页',
            });
            let second = 3;
            const timer = setInterval(() => {
                second--;
                if (second) {
                    toast.message = `结算成功，${second}秒后跳回首页`;
                } else {
                    clearInterval(timer);
                    // 手动清除 Toast
                    _this.Utils.vants.Toast.clear();
                    this.$router.push({ path: "/index" })
                }
            }, 1000);
        },
        getUser(){
            let user=this.Storage.localData("get" ,"user");
            user?(this.userInfo=user,this.getCartList()):this.$router.push({ path: "/login" });
        },
        getCartList(){
            let _this = this;
            let data={
               userId:_this.userInfo.id
            };
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getCartList,
                data,
                res => {
                    _this.cartList=res.list;
                    _this.isAllchecked=res.ischecked;
                    _this.totalPrice=res.totalPrice>0?res.totalPrice:0;
                    _this.updateCart();
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        }
    },
    created() {
        this.getUser();
    },
}
</script>
<style lang="scss" scoped>
.van-submit-bar{
    border-top: 1px solid #eee;
}
.cart_tips{
    text-align: center;
    padding: 20px 0;
    color: #999;
}
</style>