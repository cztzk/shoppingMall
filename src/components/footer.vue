<template>
    <van-tabbar v-model="getTabActive">
        <van-tabbar-item v-for="(item,index) in tabbarList" :key="index" :icon="item.icon" @click="tabClick(item.name,item.url)" :name="item.name">{{item.title}}</van-tabbar-item>
    </van-tabbar>
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
            tabbarList:[
                {
                    title:"首页",
                    url:"/index",
                    icon:"home-o",
                    name:'index'
                }, {
                    title:"分类",
                    url:"/classify",
                    icon:"apps-o",
                   name:'classify'
                }, {
                    title:"信息中心",
                    url:"/msgList",
                    icon:"cart-o",
                    name:'msgList'
                }, {
                    title:"购物车",
                    url:"/cart",
                    icon:"cart-o",
                    name:'cart'
                }, {
                    title:"我的",
                    url:"/user",
                    icon:"user-o",
                    name:'user'
                }
            ]
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
.van-tabbar-item--active{
    color: $mainColor;    
}
</style>