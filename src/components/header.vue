<template>
    <div class="header_container">
        <van-nav-bar :title="headerTitle?headerTitle:'商城首页'" :left-text="headerTitle=='商城首页'?'':'返回'" :left-arrow="headerTitle=='商城首页'?false:true"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        :border="false" z-index="999" placeholder
        fixed safe-area-inset-top
        >
            <template #right>
                <van-icon name="user-o" size="18"  :color="userInfo?'#fff':'#686868'"/>
            </template>
        </van-nav-bar>
    </div>
</template>
<script>
import { NavBar,Icon  } from 'vant';
export default {
    name:"appHeader",
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
    },
    props:[
        "headerTitle"
    ],
    date(){
        return{
            userInfo:new Array,
        }
    },
    methods:{
        getUserInfo(){
            let userInfo = JSON.parse(window.sessionStorage.getItem('user'));
            this.userInfo=userInfo?userInfo:'';
        },
        onClickLeft() {
            let _this = this;
            _this.Utils.vants.Toast('返回');
        },
        onClickRight() {
            let _this = this;
            if(_this.userInfo){
                 this.$router.push('/user');
            }else{
                 this.$router.push('/login');
            }
        },
    },
    created:function(){
        this.getUserInfo()
    },
}
</script>
<style lang="scss">
.header_container {
    .van-nav-bar{
        background: $mainColor;
    }
    .van-nav-bar .van-icon,
    .van-nav-bar__text,
    .van-nav-bar__title{
        color: #fff;
    }

}
</style>