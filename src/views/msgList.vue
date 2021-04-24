<template>
    <div class="msg_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <div class="msg_header_box">
           <div class="flex_nowrap">
                <div class="msg_header_item" v-for="(item,index) in classList" :key="index">
                    <router-link :to='item.url'>
                        <div class="msg_header_icon flex_center" :style="'background:'+item.backgroundColor">
                            <van-icon :name="item.icon" :badge="item.count" v-if="item.count>0" />
                            <van-icon :name="item.icon"  v-else />
                        </div>
                        <h3>{{item.name}}</h3>
                    </router-link>
                </div>
           </div>
        </div>
        <div class="msg_list">
            <div class="msg_item flex_left" v-for="(item,index) in msgList" :key="index" @click="msgClick(item.id)">
                <div class="msg_portrait">
                    <van-image round width="60"  height="60" :src="item.portrait" />
                </div>
                <div class="msg_info">
                    <div class="flex_justify_between">
                        <h4>{{item.name}}</h4>
                        <h6>{{item.dateTips}}</h6>
                    </div>
                    <div class="flex_justify_between">
                        <p class="ellipsis">{{item.describe}}</p>
                        <span v-if="!item.isRead && item.count>0">{{item.count>0?(item.count>=99?99:item.count):0}}</span>
                    </div>
                </div>
            </div>
        </div>
        <h3 class="msg_title">一周前的数据</h3>
        <div class="msg_list">
             <div class="msg_item flex_left" v-for="(item,index) in oldList" :key="index"  @click="msgClick(item.id)">
                <div class="msg_portrait">
                    <van-image round width="60"  height="60" :src="item.portrait" />
                </div>
                <div class="msg_info">
                    <div class="flex_justify_between">
                        <h4>{{item.name}}</h4>
                        <h6>{{item.dateTips}}</h6>
                    </div>
                    <div class="flex_justify_between">
                        <p class="ellipsis">{{item.describe}}</p>
                        <span v-if="!item.isRead && item.count>0">{{item.count>0?(item.count>=99?99:item.count):0}}</span>
                    </div>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { Icon,Image as VanImage  } from 'vant';
import appFooter from "@/components/footer.vue";

export default {
    name: "msgList",
    components: {
        appHeader:appHeader,
        [Icon.name]: Icon,
        [VanImage.name]: VanImage,
        appFooter:appFooter,
    },
    data(){
        return{
            headertitle:"消息中心",
            userIconShow:false,
            userInfo:new Array,
            msgList:new Array,
            oldList:new Array,
            classList:new Array,
        }
    },
    methods:{
        getUser(){
            let user=this.Storage.localData("get" ,"user");
            user?(this.userInfo=user,this.getMsgList()):this.$router.push({ path: "/login" });

        },
        getMsgList(){
            let _this = this;
            let nowDate = new Date(new Date().toLocaleDateString()).getTime();
            let data={
               userId:_this.userInfo.id
            };
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getMsgList,
                data,
                res => {
                    _this.classList=res.classList;
                    res.list.forEach(function(item){
                        item.dateTips=_this.Utils.getDateTips(nowDate,item.date);
                    })
                    res.oldList.forEach(function(item){
                        item.dateTips=_this.Utils.getDateTips(nowDate,item.date);
                    })
                    _this.msgList=res.list;
                    _this.oldList=res.oldList;
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        },
        msgClick(id){
            this.Utils.vants.Toast("后续功能即将开放,id为"+id)
        }
    },
    created() {
        this.getUser();
    },
}
</script>
<style lang="scss" scoped>
.msg_header_box{
    text-align: center;
    padding: 15px 10px;
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
    &>div{
        padding: 20px 0;
        background: #fff;
        box-shadow:2px 2px 5px rgba($color: #000000, $alpha: 0.01), -2px 2px 5px rgba($color: #000000, $alpha: 0.01), 2px -2px 5px rgba($color: #000000, $alpha: 0.01);
        position: relative;
        z-index: 2;
    }
}
.msg_header_item{
    flex: 1;
}
.msg_header_icon{
    width: 60px;
    height: 60px;
    border-radius: 60px;
    overflow: hidden;
    margin: 0 auto 10px;
    color: #fff;
}
.msg_list{
    background: #fff;
}
.msg_item{
    flex-wrap: nowrap;
    padding: 10px 10px;
    &:not(:last-child){
        border-bottom: 1px solid #eaeaea;
    }
}
.msg_info{
    margin-left: 10px;
    width: 285px;
    .flex_justify_between{
        flex-wrap: nowrap;
        &+div{
            margin-top: 4px;
        }
    }
    h4{
        width: 50%;
        color: #333;
    }
    h6{
        width: 50%;
        font-size: 10px;
        color: #999;
        text-align: right;
    }
    p{
        width: 90%;
        font-size: 14px;
        color: #666;
    }
    span{
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 20px;
        overflow: hidden;
        font-size: 6px;
        color: #fff;
        background: $mainColor;
    }
}
.msg_title{
    margin-top: 10px;
    padding: 15px 10px;
    background: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
</style>