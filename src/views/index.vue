<template>
    <div class="index_container">
        <app-header :headerTitle="headertitle"></app-header>
        <div class="banner_container">
            <van-swipe class="banner_swiper" :autoplay="swiperOption.autoplay" :indicator-color="swiperOption.indicatorColor">
                <van-swipe-item v-for="(item,index) in bannerlist" :key="index">
                    <img  :alt="item.title"  :src="item.imgUrl">
                </van-swipe-item>
            </van-swipe>
        </div>
        <app-footer :footeractive="footeractive"></app-footer>
    </div>
</template>
<script>

import { Swipe, SwipeItem,Lazyload } from 'vant';
import appHeader from "@/components/header.vue";
import appFooter from "@/components/footer.vue";

export default {
    name: "index",
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Lazyload.name]: Lazyload,
        appHeader:appHeader,
        appFooter:appFooter
    },
    data(){
        return{
            headertitle:"商城首页",
            footeractive:0,
            bannerlist:new Array,
            swiperOption:{
                autoplay:3000,
                indicatorColor:"white"
            }
        }
    },
    methods:{
        getBanner() {
            let _this = this;
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getIndexBanner,
                {
                type: "banner"
                },
                res => {
                    // console.log(res);
                    _this.bannerlist=res?res.filter(item=>item.isShow):res;
                },
                err=>_this.Utils.Toast.fail(err.data.msg ? err.data.msg : err)
            );
        },
    },
    created:function(){
        this.getBanner();
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
</style>