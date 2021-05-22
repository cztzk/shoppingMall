<template>
    <div class="pay_detail">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-cell class="pay_header"  is-link to="addrList?isChoice=true">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <div class="addr_info flex_nowrap">
                    <van-icon name="location-o" color="#c82519"  />
                    <div>
                        <h4 class="ellipsis">{{addrInfo.name}} {{addrInfo.addressDetail}}  {{addrInfo.address}}</h4>
                        <h6>{{addrInfo.region}}</h6>
                    </div>
                </div>
            </template>
        </van-cell>
        <div class="pay_cont">
            <van-cell>
                <template #title>
                    <span class="custom-title ellipsis"   @click="jumpShop(payDetail.id)" >{{payDetail.name}}</span>
                    <van-tag type="danger">自营</van-tag>
                </template>
            </van-cell>
            <div class="commodity_item flex_nowrap" v-for="(item,index) in payDetail.commodityList" :key="index" >
                <van-image class="commodity_img" :src="item.img"/>
                <div class="commodity_info">
                    <h3 class="ellipsis2">{{item.name}}</h3>
                    <h5 class="ellipsis">{{item.sku}}</h5>
                    <h5 class="ellipsis">数量:{{item.count}}</h5>
                    <van-tag type="success" >专业售后保障</van-tag>
                </div>
            </div>
            <div class="pay_info">
                <h5>配送方式:<span>普通快递</span></h5>
                <h5>运费险：<span>退换货可赔付12元</span></h5>
                <h5>开具发票：<span>本次不开具发票</span></h5>
                <van-radio-group v-model="payRadio" class="radio_box">
                    <van-cell-group>
                        <van-cell title="微信" clickable @click="radio='1'">
                            <template #right-icon>
                                <van-radio name="1" />
                            </template>
                        </van-cell>
                        <van-cell title="支付宝" clickable @click="radio='2'">
                            <template #right-icon>
                                <van-radio name="2" />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
                <h5 class="total_price">小计:<span>￥{{payDetail.totalPrice | formatMoney}}</span>元</h5>
            </div>
        </div>
        <van-submit-bar :price="getPrice" button-text="提交订单" @submit="onSubmit" />
        <pay-tool  ref="payTool" @ajaxPay="ajaxPay"></pay-tool>
    </div>
</template>

<script>
import appHeader from "@/components/header.vue";
import { Cell, CellGroup,Icon ,Tag,Image as VanImage,SubmitBar,RadioGroup, Radio} from 'vant';
import payTool from "@/components/payTool.vue";

export default {
    name: "payDetail",
    components: {
        appHeader:appHeader,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Icon.name]: Icon,
        [Tag.name]: Tag,
        [VanImage.name]: VanImage,
        [SubmitBar.name]: SubmitBar,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]:Radio,
        [payTool.name]:payTool,
    },
    data(){
        return{
            headertitle:"订单详情",
            userIconShow:false,
            userInfo:new Array,
            payId:"",
            addrInfo:new Array,
            payDetail:new Array,
            payRadio:"1",
        }
    },
    computed: {
        getPrice(){
            return  this.payDetail.totalPrice?this.Utils.accMul(this.payDetail.totalPrice,100):0.00;
        }
    },
    methods:{
        ajaxPay(password){
            let _this=this;
            let data={
                password:password,
                payId:_this.payId,
                payRadio:_this.payRadio
            }
            console.log(data);
            let toast=_this.Utils.vants.Toast.loading({
                duration: 0, // 持续展示 Toast
                forbidClick: true,
                message: '结算成功，3秒后跳回首页',
            });
            let second = 3;
            const timer = setInterval(() => {
                second--;
                if (second) {
                    toast.message = `结算成功，${second}秒后跳回首页`;
                } else {
                    clearInterval(timer);
                    // 手动清除 Toast
                    _this.Utils.vants.Toast.clear();
                    _this.$router.push({ path: "/index" })
                }
            }, 1000);
        },
        onSubmit(){
            this.$refs.payTool.overShow = true
        },
        getUser(){
            let user=this.Storage.localData("get" ,"user");
            user?(this.userInfo=user,this.getPayDetail()):this.$router.push({ path: "/login" });
        },
        jumpShop(id){
            this.$router.push({
            path:'/shopDetail',
                query:{
                    id:id
                }
            })
        },
        getPayDetail(){
            let _this = this;
            let data={
               userId:_this.userInfo.id,
               payId:_this.payId
            };
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getPayDetail,
                data,
                res => {
                    let payDetail=res.payDetail;
                    payDetail.name.length>8?payDetail.name=payDetail.name.slice(0,8)+"...":"";
                    _this.addrInfo=res.addrInfo;
                    _this.payDetail=payDetail;
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        },
        payIdErr(){
            let _this = this;
            _this.Utils.vants.Dialog.alert({
                title: '提示',
                message: '产品参数异常，请重试',
            }).then(() => {
                _this.$router.back(-1);
            });
        }
    },
    created() {
        this.$route.query.id?(this.payId=this.$route.query.id,this.getUser()):this.payIdErr();
        
    },
}
</script>
<style lang="scss" scoped>
.pay_detail{
    padding: 10px 8px 0;
}
.pay_header{
    border-radius: 10px;
    margin-bottom: 10px;
}
.addr_info {
    width: 300px;
    .van-icon {
        top: 4px;
        margin-right: 5px;
    }
    div{
        width: 290px;
    }
}
.custom-title{
    margin-right: 5px;
}
.pay_cont{
    border-radius: 10px;
    background: #fff;
}
.commodity_item{
    background: #fff;
    padding: 10px 15px;
}
.commodity_img{
    width: 100px;
    height: 100px;
    margin-right: 10px;
}
.commodity_info{
    width: 230px;
    h3{
        color: #333;
        font-size: 14px;
    }
    h5{
        color: #999;
        font-size: 10px;
        margin: 4px 0 5px;
        &+h5{
            color: #666;
        }
    }
    .van-tag{
        align-items: flex-start;
    }
}
.pay_info{
    border-top: 1px solid #eaeaea;
    padding: 10px 16px;
    h5{
        color: #666;
        line-height: 1.8;
        span{
            color: #333;
        }
        &.total_price{
            text-align: right;
            span{
                color: $mainColor;
            }
        }
    }
}
.radio_box{
    padding: 10px 0 15px;
}
</style>