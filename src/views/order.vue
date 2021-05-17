<template>
    <div class="order_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-sticky :offset-top="46">
            <van-tabs>
                <van-tab v-for="(item,index) in orderTab" :key="index" :title="item.title" @click="tabClick(item.id)"></van-tab>
            </van-tabs>
        </van-sticky>
        <van-list   v-model="loading"  :finished="finished" finished-text="~~我是有底线的~~" @load="getOrderList" >
            <order-item :orderItem="item" v-for="(item,index) in orderList" :key="index" ></order-item>
        </van-list>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { Tab, Tabs,List ,Sticky } from 'vant';
import orderItem from "@/components/orderItem.vue";

export default {
    name: "order",
    data(){
        return{
            headertitle:"我的订单",
            userIconShow:false,
            loading: false,
            finished: false,
            pageSize:10,
            pageNum:0,
            orderType:0,
            orderTab:[
                 {
                    icon:"photo-o",
                    title:"全部",
                    id:0
                },
                {
                    icon:"photo-o",
                    title:"待付款",
                    id:1
                },  {
                    icon:"photo-o",
                    title:"待发货",
                    id:2
                },  {
                    icon:"photo-o",
                    title:"待收货",
                    id:3
                },  {
                    icon:"photo-o",
                    title:"待评价",
                    id:4
                },  {
                    icon:"photo-o",
                    title:"售后",
                    id:5
                },
            ],
            orderList:new Array,
        }
    },
    components: {
        appHeader:appHeader,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [List.name]: List,
        [Sticky.name]: Sticky,
        orderItem:orderItem, 
    },
    methods: {
        getUser(){
            let user=this.Storage.localData("get" ,"user");
            user?(this.userInfo=user):this.$router.push({ path: "/login" });
        },
        tabClick(id){
            this.orderType=id;
            this.getOrderList();
        },
        getOrderList(){
            let _this = this;
            let data={
                userId:_this.userInfo.id,
                orderType:_this.orderType,
                pageSize:_this.pageSize,
                pageNum:_this.pageNum
            };
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getOrderList,
                data,
                res => {
                    // console.log(res);
                    let total=_this.Utils.getTotalPageNum(res.total,data.pageSize);
                    _this.orderList=res.list;
                    _this.pageNum+=1;
                    _this.finished =_this.pageNum>=total?true:false;
                    _this.loading = false;
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        },
    },
    created() {
        this.orderType=this.$route.query.id?this.$route.query.id:0;
        this.getUser();

    },
}
</script>
<style lang="scss" scoped>
.van-list  .order_item{
    margin-top: 15px;
    &:first-child{
        margin-top: 0;
    }
}
</style>