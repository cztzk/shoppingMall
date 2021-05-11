<template>
    <div class="order_item" >
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #default>
          <span class="order_state">{{orderStateArr[orderItem.orderState]}}</span>
        </template>
        <template #title>
          <span class="custom-title ellipsis"  @click="jumpShop(orderItem.id)" >{{orderItem.name.length>8?orderItem.name.slice(0,8)+"...":orderItem.name}}</span>
          <van-tag type="danger">自营</van-tag>
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
      <!-- 1待付款 -->
      <div class="order_footer flex_right" v-if="orderItem.orderState==1">
        <van-button plain hairline type="info" size="small"  @click="cancel(orderItem.id)">取消订单</van-button>
        <van-button type="danger" size="small" @click="payment(orderItem.id)">立即支付</van-button>
      </div>
      <!-- 2待发货 -->
      <div class="order_footer flex_right" v-else-if="orderItem.orderState==2">
        <van-button plain hairline type="info" size="small"  @click="cancel(orderItem.id)">取消订单</van-button>
        <van-button plain hairline type="info" size="small"  @click="orderDetail(orderItem.id)">查看订单</van-button>
      </div>
      <!-- 3待收货 -->
      <div class="order_footer flex_right" v-else-if="orderItem.orderState==3">
        <van-button plain hairline type="info" size="small"  @click="orderDetail(orderItem.id)">查看订单</van-button>
        <van-button type="danger" size="small" @click="confirm(orderItem.id)">确认收货</van-button>
      </div>
      <!-- 4待评价 -->
      <div class="order_footer flex_right" v-else-if="orderItem.orderState==4">
        <van-button plain hairline type="info" size="small"  @click="evaluate(orderItem.id)">立即评价</van-button>
        <van-button type="danger" size="small" @click="afterSales(orderItem.id)">申请售后</van-button>
      </div>
      <!-- 5售后 -->
      <div class="order_footer flex_right" v-else>
        <van-button type="danger" size="small" @click="check(orderItem.id)">查看进度</van-button>
      </div>
    </div> 
</template>
<script>
import { Cell, CellGroup,Icon ,Tag , Image as VanImage ,Button } from 'vant';
export default {
    name:"orderItem",
    props:{
      "orderItem":{
      type: Object,
        default() {
          return [];
        }
      }
    },
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Icon.name]: Icon,
      [Tag.name]: Tag,
      [VanImage.name]: VanImage,
      [Button.name]: Button,
    },
    data(){
      return {
        orderStateArr:["待付款","待发货","待收货","待评价","售后"]
      }
    },
    methods:{
      check(id){
        this.Utils.vants.Toast("查看进度"+id);
      },
      evaluate(id){
        this.Utils.vants.Toast("立即评价"+id);
      },
      afterSales(id){
        this.Utils.vants.Toast("申请售后"+id);
      },
      confirm(id){
        this.Utils.vants.Toast("确认收货"+id);
      },
      orderDetail(id){
        this.Utils.vants.Toast("查看订单"+id);
      },
      cancel(id){
        this.Utils.vants.Toast("取消订单"+id);
      },
      payment(id){
        this.Utils.vants.Toast("立即支付"+id);
      },
      jumpShop(id){
        this.$router.push({
          path:'/shopDetail',
          query:{
            id:id
          }
        })
      }
    }
}
</script>
<style lang="scss" scoped>
  .custom-title{
    margin-right: 5px;
  }
  .order_state{
    color: $mainColor;
  }
  .order_cont{
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
  .order_footer{
    border-top: 1px solid #ebedf0;
    background: #fff;
    padding: 10px 15px;
    button{
      margin-left: 5px;
    }
  }
</style>