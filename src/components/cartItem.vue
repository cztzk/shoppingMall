<template>
    <div class="cart_item">
        <van-cell>
            <template #default>
                <div class="shop_title flex_left">
                    <van-checkbox v-model="cartItem.ischecked" @click="allCheck(true)"  checked-color="#c82519" ></van-checkbox>
                    <van-image  :src="cartItem.portrait"/>
                    <h3 class="ellipsis">{{cartItem.name}}</h3>
                </div>
            </template>
        </van-cell>
        <van-cell v-for="(item,idx) in cartItem.commodityList" :key="idx">
            <template #default>
                <div class="shop_cont flex_left">
                    <van-checkbox v-model="item.ischecked"  @click="checkClick(true)" @change="commodityChecked" checked-color="#c82519"></van-checkbox>
                    <van-image :src="item.img"/>
                    <div class="shop_info">
                        <h4 class="ellipsis">{{item.name}}</h4>
                        <h5 class="flex_left"><span class="ellipsis">{{item.sku}}</span></h5>
                        <div class="flex_justify_between">
                            <h6>￥{{item.price | formatMoney}}</h6>
                            <van-stepper integer  v-model="item.count"   :value="item.count" async-change @change="stepperChange(item)"/>
                        </div>
                    </div>

                </div>
            </template>
        </van-cell>
    </div>
</template>
<script>
import { Cell, CellGroup,Checkbox,Image as VanImage,Stepper } from 'vant';

export default {
    name: "cartItem",
    props:{
        "cartItem":{
            type: Object,
            default() {
                return [];
            }
        }
    },
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Checkbox.name]: Checkbox,
      [VanImage.name]: VanImage,
      [Stepper.name]: Stepper,
    },
    data(){
        return{
            timer:"",
        }
    },
    methods:{
        // 商店点击全选
        allCheck(isAllCheck){
            if(isAllCheck){
                let cartItem=this.cartItem;
                let commodityList=cartItem.commodityList;
                commodityList.forEach(ele => {
                    ele.ischecked=cartItem.ischecked;
                });
                this.$emit("updateCart");
            }
        },
        // 商品点击单选
        checkClick(isAllCheck){
            if(isAllCheck){
                this.$emit("updateCart");
            }
        },
        // 单选改变事件
        commodityChecked(){
            let cartItem=this.cartItem;
            this.cartItem.ischecked=(cartItem.commodityList.findIndex(target=>target.ischecked===false)==-1)?true:false;
        },
        stepperChange(cartItem){
            let _this=this;
            _this.Utils.vants.Toast.loading({
                forbidClick: true,
                overlay:true
            });
            clearTimeout(_this.timer);
            _this.timer = setTimeout(() => {
                _this.Utils.vants.Toast.clear();
                console.log("cartItem.id:"+cartItem.id);
                _this.$emit("updateCart");
            }, 500);
        }
    },
    created() {
        this.commodityChecked();
    },
}
</script>
<style lang="scss" scoped>
.cart_item:not(:last-child){
    margin-bottom: 10px;
}
.shop_title{
    .van-image{
        width: 30px;
        height: auto;
        margin:0 5px 0 10px ;
    }
    h3{
        max-width: 70%;
    }
}
.shop_cont{
    flex-wrap: nowrap;
    .van-image{
        width: 100px;
        height: auto;
        margin:0 5px 0 10px ;
    }
}
.shop_info{
    width: 200px;
    h4{
        color: #333;
        margin: 0;
    }
    h5{
        span{
            display: block;
            padding: 5px 8px;
            margin: 8px 0 10px;
            background: #f5f5f5;
        }
    }h6{
        font-size: 14px;
        color:$mainColor;
    }
}
</style>