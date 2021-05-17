<template>
    <div class="user_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <div class="user_header flex_left" v-if="userInfo">
            <van-image width="100" height="100" :src="userInfo.portrait" />
            <div class="user_info">
                <h3 class="ellipsis">用户名：{{userInfo.username}}</h3>
                <h4 class="ellipsis">余额：{{userInfo.balance | formatMoney}}</h4>
                <h6>用户等级：{{getUserGradee}}</h6>
            </div>
        </div>
        <div class="user_classify">
            <van-cell title="订单中心" is-link to="order" />
            <van-grid :column-num="5" class="proder_classify">
                <van-grid-item :icon="item.icon" :text="item.title" v-for="(item,index) in orderTab" :key="index" :to="'/order?id='+item.id" />
            </van-grid>
            <van-cell title="收货地址" is-link to="addrList" />
            <van-cell title="浏览历史" is-link to="history" />
            <van-cell title="信息中心" is-link to="msgList" />
            <van-cell title="通讯录" is-link to="contactList" />
            <van-cell title="会员中心" is-link to="member" />
        </div>
        <div class="user_recommend" v-if="recommendList.length>0">
            <h3>猜你喜欢</h3>
             <product-item v-for="(item,idx) in recommendList" :productItem="item" :key="idx"></product-item>
        </div>
        <app-footer></app-footer>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { Image as VanImage , Cell, CellGroup,Grid, GridItem } from 'vant';
import productItem from "@/components/productItem.vue";
import appFooter from "@/components/footer.vue";

export default {
    name: "user",
    components: {
        appHeader:appHeader,
        [VanImage.name]: VanImage,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        productItem:productItem,
        appFooter:appFooter,
    },
    data(){
        return{
            headertitle:"用户中心",
            userIconShow:false,
            userInfo:new Array,
            recommendList:new Array,
            orderTab:[
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
            ]
        }
    },
     computed:{
        getUserGradee(){
            let balance=this.userInfo.balance;
            return balance==0?"游客":(balance==1?"用户":"VIP");
        }
    },
    methods:{
        getUser(){
            let user=this.Storage.localData("get" ,"user");
             user?(this.userInfo=user,this.getList()):this.$router.push({ path: "/login" });
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
    },
    created() {
        this.getUser();
    },
}
</script>
<style lang="scss" scoped>
.user_header{
    background: $mainColor;
    padding: 15px;
    flex-wrap: nowrap;
}
.user_info{
    width: 200px;
    margin-left: 20px;
    h3,h6{
        color: #fff;
        margin-bottom: 5px;
    }
    h4{
        color: #fff;
        margin: 5px 0;
    }
}
.user_classify{
    margin: 10px 0;
}
.user_recommend{
    background: #fff;
    h3{
        color: #333;
        padding:10px 15px;
    }
}
.proder_classify{
    margin-bottom: 10px;
}
</style>