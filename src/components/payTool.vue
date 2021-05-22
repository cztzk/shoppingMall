<template>
    <div class="pay_container" v-if="overShow">
        <van-overlay :show="overShow" @click="toggleOverShow" />
        <div class="pay_tool">
            <h1>请输入交易密码</h1>
            <div class="pay_tool_cont">
                <div class="pay_tool_input flex_nowrap">
                    <div class="item flex_center" v-for="(item,idx) in items" :key="idx">
                        <span class="icon_dot" v-if="password[idx]"></span>
                    </div>
                </div>
                <div class="pay-tool-link">
                    <router-link class="link" to="/getP">忘记密码？</router-link>
                </div>
            </div>
            <ul class="pay_tool_key flex_wrap">
                <li @click="keyUpHandle($event)" v-for="(val,i) in keys" :key="i">{{ val }}</li>
                <li class="del" @click="delHandle"><span class="icon-del">删除</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
import { Overlay } from 'vant';
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
export default {
    name:"payTool",
    components: {
        [Overlay.name]: Overlay,
    },
    data(){
        return {
            overShow:false,
            items: [0, 1, 2, 3, 4, 5],
            keys: keys(),
            password: []
        }
    },
    computed: {
      
    },
    methods:{
        toggleOverShow(){
            this.overShow=!this.overShow;
            this.password=[];
        },
        keyUpHandle(e){
            let text = e.currentTarget.innerText
            let len = this.password.length
            if (!text || len >= 6) return
            this.password.push(text);
            this.ajaxData();
        },
        delHandle() {
            if (this.password.length <= 0) return false
            this.password.shift();
        },
        ajaxData() {
            let _this=this;
            if (_this.password.length >= 6) {
                let password=parseInt(_this.password.join(' ').replace(/\s/g, ''));
                _this.overShow=!_this.overShow;
                _this.$emit("ajaxPay",password);
            }
            return false
        },
    },
    mounted:function(){

    }
}
</script>
<style lang="scss">
.pay_tool{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: #fff;
    text-align: center;
    h1{
        padding: 15px 0;
        border-bottom: 1px solid #eaeaea;
    }
}
.pay_tool_input {
    width: 240px;
    margin: 20px auto 10px;
    border: 1px solid #b9b9b9;
    .item{
        width: 40px;
        height: 40px;
        line-height: 40px;
        &:not(:last-child){
            border-right: 1px solid #b9b9b9;
        }
    }
    .icon_dot {
        width: 6px;
        height: 6px;
        background: #000;
        border-radius: 6px;
    }
}
.pay-tool-link {
    width: 240px;
    margin: 10px auto 0;
    text-align: right;
    .link {
        font-size: 14px;
        color: #3c8cfb;
    }
}

.pay_tool_key{
    margin-top: 20px;
    li{
        width: 33.333%;
        box-sizing: border-box;
        border-top: 1px solid #eaeaea;
        font-size: 14px;
        line-height: 40px;
        height: 40px;
        &:not(:nth-child(3n)){
            border-right: 1px solid #eaeaea;
        }
    }
}


</style>