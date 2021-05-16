<template>
    <div class="index_container">
        <app-header :headerTitle="headertitle"></app-header>
        <div class="banner_container" v-if="bannerlist.length>0">
            <van-swipe class="banner_swiper" :autoplay="swiperOption.autoplay" :indicator-color="swiperOption.indicatorColor">
                <van-swipe-item v-for="(item,index) in bannerlist" :key="index">
                    <img  :alt="item.title"  :src="item.imgUrl" >
                </van-swipe-item>
            </van-swipe>
        </div>
        <van-notice-bar color="#fff" background="#c82519" left-icon="info-o">{{noticeTips}}</van-notice-bar>
        <van-search v-model="searchValue" placeholder="请输入搜索关键词"    @search="search"
        @cancel="searchCancel"/>
        <div class="classify_box" v-if="classifyList.length>0">
            <van-grid :column-num="4">
                <van-grid-item v-for="(item,index) in classifyList" :key="index" icon="photo-o" :text="item.title" @click="classifyClick(item.url)" />
            </van-grid>
        </div>
        <product-tab :classifyList="classifyList"></product-tab>
        <van-list   v-model="loading"  :finished="finished" finished-text="~~我是有底线的~~" @load="getList" >
            <product-item v-for="(item,idx) in list" :productItem="item" :key="idx"></product-item>
        </van-list>
        <app-footer></app-footer>
    </div>
</template>
<script>

import { Swipe, SwipeItem,Search ,Grid, GridItem ,NoticeBar,List} from 'vant';
import appHeader from "@/components/header.vue";
import productTab from "@/components/productTab.vue";
import productItem from "@/components/productItem.vue";
import appFooter from "@/components/footer.vue";
import { mapState } from 'vuex';
export default {
    name: "index",
    components: {
        appHeader:appHeader,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Search.name]: Search,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        [NoticeBar.name]: NoticeBar,
        [List.name]: List,
        productItem:productItem,
        productTab:productTab,
        appFooter:appFooter
    },
    data(){
        return{
            headertitle:"商城首页",
            bannerlist:new Array,
            swiperOption:{
                autoplay:3000,
                indicatorColor:"#c82519"
            },
            searchValue:"",
            classifyList:new Array,
            noticeTips:"商城提示商城提示商城提示商城提示商城提示商城提示商城提示商城提示商城提示商城提示商城提示商城提示商城提示商城提示商城提示",
            list: new Array,
            loading: false,
            finished: false,
            pageSize:10,
            pageNum:0,
        }
    },
    computed: {
        ...mapState(['indexProductId']), 
    },
    watch:{
      '$store.state.indexProductId':function(){ //监听vuex中userName变化而改变header里面的值
        this.list=[];
        this.loading=false;
        this.finished=false;
        this.pageNum=0;
        this.getList();
      }
    },
    methods:{
        // 避免重复请求
        isGetIndexArr(){
            let _this = this;
            let bannerlist=_this.Storage.localData("get","bannerlist");
            bannerlist?_this.bannerlist=bannerlist:_this.getBanner();
            let classifyList=_this.Storage.localData("get","classifyList");
            classifyList?_this.classifyList=classifyList:_this.getClassifyList();
        },
        getBanner() {
            let _this = this;
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getIndexBanner,
                {
                type: "banner"
                },
                res => {
                    let bannerlist=res?res.filter(item=>item.isShow):res
                    _this.Storage.localData("set" ,"bannerlist",bannerlist);
                    _this.bannerlist=bannerlist;

                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        },
        getClassifyList(){
             let _this = this;
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getIndexClassify,
                {
                type: "index"
                },
                res => {
                    _this.Storage.localData("set" ,"classifyList",res);
                    _this.classifyList=res
                },
                err=>_this.Utils.vants.Toast.fail(err.data.msg ? err.data.msg : err)
            );
        },
        classifyClick(url){
            this.$router.push(url);
        },
        search(val){
            let _this = this;
            _this.Utils.vants.Toast.success(val);
        },    
        searchCancel(){
            let _this = this;
            _this.Utils.vants.Toast("取消搜索");
        },
        getList() {
            let _this = this;
            _this.loading = true;
            let data={
                productId:_this.$store.state.indexProductId,
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
    created:function(){
        this.isGetIndexArr();
    },
    mounted:function(){

    }
}
</script>
<style lang="scss" scoped>
.banner_container{
    width: 375px;
    box-sizing: border-box;
    padding: 10px 15px ;
    position: relative;
    overflow: hidden;
    &::after{
        display: block;
        content: "";
        background-image: linear-gradient(0deg,$color1,$mainColor 50%);
        position: absolute;
        left: -25%;
        top: 0;
        bottom: 70px;
        width: 150%;
        border-bottom-left-radius: 100%;
        border-bottom-right-radius: 100%;
    }
    img{
        widows: 345px;
        height: 200px;
    }
    .banner_swiper{
        position: relative;
        z-index: 2;
    }
}
.classify_box{
    .van-grid-item__text{
        font-size: 10px;
    }
}
</style>