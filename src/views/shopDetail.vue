<template>
    <div class="shop_detail">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-search v-model="searchValue" placeholder="请输入搜索关键词"    @search="search"
        @cancel="searchCancel"/>

        <div class="shop_swiper_box" v-if="shopList.bannerList">
            <van-swipe class="shop_swiper" :autoplay="swiperOption.autoplay" :indicator-color="swiperOption.indicatorColor">
                <van-swipe-item v-for="(item,index) in shopList.bannerList" :key="index">
                    <img  :alt="item.title"  :src="item.imgUrl" >
                </van-swipe-item>
            </van-swipe>
        </div>
        <van-sticky :offset-top="46">
            <van-tabs>
                <van-tab v-for="(item,index) in shopTab" :key="index" :title="item.title" @click="tabClick(item.id)"></van-tab>
            </van-tabs>
        </van-sticky>
        <van-list   v-model="loading"  :finished="finished" finished-text="~~我是有底线的~~" @load="getList" >
            <product-item v-for="(item,idx) in list" :productItem="item" :key="idx"></product-item>
        </van-list>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import {Swipe, SwipeItem,Tab, Tabs, Search,List,Sticky} from 'vant';
import productItem from "@/components/productItem.vue";

export default {
    name: "shopDetail",
    components: {
        appHeader:appHeader,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Search.name]: Search,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [List.name]: List,
        [Sticky.name]: Sticky,
        productItem:productItem,
    },
    data(){
        return{
            headertitle:"商家详情",
            userIconShow:false,
            shopId:"",
            sortId:0,
            searchValue:"",
            shopList:new Array,
            swiperOption:{
                autoplay:3000,
                indicatorColor:"#c82519"
            },
           
            shopTab:[
                 {
                    title:"综合",
                    id:0
                },
                {
                    title:"销量",
                    id:1
                },  {
                    title:"新品",
                    id:2
                },  {
                    icon:"photo-o",
                    title:"价格",
                    id:3
                }
            ],
            list: new Array,
            loading: false,
            finished: false,
            pageSize:10,
            pageNum:0,
        }
    },
    methods:{
         tabClick(id){
            this.sortId=id;
            this.getOrderList();
        },
        getShopDetail(){
            let _this=this;
            let data={
                shopId:_this.shopId,
            };
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getShoeDetail,
                data,
                res => {
                    _this.headertitle=res.shopInfo.name;
                    _this.shopList=res.shopInfo;
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        },
        search(val){
            let _this = this;
            _this.Utils.vants.Toast.success(val);
        },    
        searchCancel(){
            let _this = this;
            _this.Utils.vants.Toast("取消搜索");
        },
        noShopId(){
            let _this=this;
            _this.Utils.vants.Dialog.alert({
                title: '提示',
                message: '参数异常，请重试',
            }).then(() => {
                _this.$router.back(-1);
            });
        },
        getList() {
            let _this = this;
            _this.loading = true;
            let data={
                sortId:_this.sortId,
                pageSize:_this.pageSize,
                pageNum:_this.pageNum
            }
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getIndexProductList,
                data,
                res => {
                    let total=_this.Utils.getTotalPageNum(res.total,data.pageSize);
                    _this.list=_this.list.concat(res.list);
                    _this.pageNum+=1;
                    _this.finished =_this.pageNum>=total?true:false;
                    _this.loading = false;
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        },
    },
    created() {
       this.$route.query.id?(this.shopId=this.$route.query.id,this.getShopDetail(),this.getList()):this.noShopId();
    },
}
</script>
<style lang="scss" scoped>

</style>