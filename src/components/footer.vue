<template>
    <van-tabbar v-model="footeractive">
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
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
    props:[
        "footeractive"
    ],
    data(){
        return {

        }
    },
    methods:{

    },
    mounted:function(){

    }
}
</script>