<template>
    <div class="notfound_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-image :src="imgUrl"/>
        <div class="btn_group flex_center">
            <van-button type="danger" to="index">返回首页</van-button>
        </div>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { Image as VanImage ,Button} from 'vant';

export default {
    name: "notfound",
    data(){
        return{
            headertitle:"404",
            userIconShow:false,
            imgUrl:require("@/assets/images/404.png")
        }
    },
    components: {
        appHeader:appHeader,
        [VanImage.name]: VanImage,
        [Button.name]: Button,
    }
}
</script>
<style lang="scss" scoped>
.notfound_container{
    height: 100vh;
    background: #fff;
}

</style>