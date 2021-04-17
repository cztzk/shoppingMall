<template>
    <div>
        <app-header :headerTitle="headertitle"></app-header>
        <van-form @submit="onSubmit">
            <van-field v-model="formDate.username"  name="用户名"  label="用户名"   placeholder="请输入您的用户名"   :rules="[{ required: true, message: '请填写用户名' }]"   />
            <van-field v-model="formDate.password" type="password" name="密码"  label="密码" placeholder="请输入您的密码"  :rules="[{ validator:passCheck, message: '请填写六位以上密码密码' }]" />
            <van-field v-model="formDate.passwordes" v-if="formDate.type==1?true:false "  type="password" name="密码"  label="确认密码" placeholder="请输入您的确认密码"  :rules="[{ validator:passesCheck, message: '密码必须大于六位数且密码和确认密码必须相同' }]" />
            <van-field v-model="formDate.tel"  v-if="formDate.type==1?true:false " type="tel" name="手机号"  label="手机号" placeholder="请输入您的手机号"  :rules="[{ validator:phoneCheck,message: '手机格式有误，请检查' }]" />
            <van-field v-model="formDate.code" v-if="formDate.type==1?true:false "  center clearable label="短信验证码" placeholder="请输入短信验证码"  :rules="[{ validator:codeCheck,message: '请输入正确的四位数验证码'  }]" maxlength="4" 
            >
                <template #button>
                    <van-button size="small" type="primary"  native-type="button" @click="sendCode">发送验证码</van-button>
                </template>
            </van-field>
            <div style="margin: 16px;" class="align_items_center login_btn">
                <van-button round block type="info" native-type="button" @click="toggleType">{{formDate.type==0?"注册用户":"去登陆"}}</van-button>
                <van-button round block type="info"  native-type="submit" color="#c82519">{{formDate.type==0?"立即登录":"马上注册"}}</van-button>
            </div>
        </van-form>
    </div>
   
</template>
<script>
import appHeader from "@/components/header.vue";
import { Form,Field,Button } from 'vant';
export default {
      name: "login",
      components: {
        [Form.name]: Form,
        [Field.name]: Field,
        [Button.name]: Button,
        appHeader:appHeader
    },
    data(){
        return{
            headertitle:"用户登录",
            formDate:{
                type:0,//登录或注册 0 登录 1注册
                username: 'cztzk',
                password: '1234567',
                passwordes:"",
                tel:"",
                code:""
            },
   
        }
    },
    methods: {
        passCheck(val){
            return val.length>=6?true:false;
        },
        passesCheck(){
            let formDate=this.formDate;
            return formDate.password.length>=6&&formDate.password==formDate.passwordes?true:false;
        },
        phoneCheck(val) { 
            const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/ 
            return reg.test(val)
        },
        toggleType(){
            let type=this.formDate.type==0?1:0;
            this.headertitle=type==0?"用户登录":"注册新用户"
            this.formDate.type=type;
        },
        sendCode(){
            console.log("验证码")
        },
        codeCheck(val){
            return val.length==4?true:false;
        },
        onSubmit() {
            this.formDate.type==0?this.toLogin():this.toRegister();
        },
        toLogin(){
            let _this = this;
            let formDate=_this.formDate;
            console.log(formDate);
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.login,
                formDate,
                res => {
                    _this.$store.dispatch("saveUser", res);
                    // 保持用户信息
                    _this.Storage.localData("set" ,"user",res);
                    console.log(_this.Storage.localData("get" ,"user"))
                    _this.$router.push({ path: "/index" });
                },
                err=>_this.Utils.vants.Toast.fail(err.data.msg ? err.data.msg : err)
            );
        },
        toRegister(){
            this.Utils.vants.Toast.success("未有注册接口，后续将完善该功能");
        },
    },
}
</script>
<style lang="scss" scoped>
.login_btn{
    button {
        width: 49%;
        &:nth-child(2n){
            margin-left: 2%;
        }
    }
}
</style>