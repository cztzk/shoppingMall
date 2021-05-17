<template>
    <div class="footer_container">
        <van-tabbar v-model="getTabActive">
            <van-tabbar-item icon="home-o" @click="tabClick('index','/index')" name="index">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" @click="tabClick('classify','/classify')" name="classify">分类</van-tabbar-item>
            <van-tabbar-item icon="chat-o" @click="tabClick('msgList','/msgList')" name="msgList" badge="9">信息中心</van-tabbar-item>
            <van-tabbar-item icon="cart-o" @click="tabClick('cart','/cart')" name="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="user-o" @click="tabClick('user','/user')" name="user">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
    name:"appFooter",
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
    data(){
        return {
        }
    },
    computed: {
        getTabActive:{
            get(){
                // console.log(this.$route.path);
                return this.$route.path?this.$route.path.split("/")[1]:""
            },
            set(){}
        }
    },
    methods:{
        tabClick(url){
            this.$router.push(url);
        }
    },
    mounted:function(){

    }
}
</script>
<style lang="scss">
.footer_container{
    height: 50px;
}
.van-tabbar--fixed{
    z-index: 999;
}
.van-tabbar-item--active{
    color: $mainColor;    
}
</style>