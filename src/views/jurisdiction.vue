<template>
    <div class="jurisdiction_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-image :src="imgUrl"/>
        <div class="btn_group flex_center">
            <van-button type="danger" to="index">返回首页</van-button>
            <van-button type="primary" @click="membership">开通会员</van-button>
        </div>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { Image as VanImage ,Button} from 'vant';
export default {
    name: "403",
    data(){
        return{
            headertitle:"权限不足",
            userIconShow:false,
            imgUrl:require("@/assets/images/403.png")
        }
    },
    components: {
        appHeader:appHeader,
        [VanImage.name]: VanImage,
        [Button.name]: Button,
    },
    methods:{
        membership(){
            let _this=this;
            _this.Utils.vants.Toast("功能后续完善中...")
        }
    }
}
</script>
<style lang="scss" scoped>
.jurisdiction_container{
    height: 100vh;
    background: #fff;
    button{
        margin: 0 10px;
    }
}
</style>