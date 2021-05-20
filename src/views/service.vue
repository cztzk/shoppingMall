<template>
    <div class="service_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-collapse v-model="activeName" accordion>
            <van-collapse-item v-for="(item,index) in serviceList" :key="index"  :title="item.name" :name="item.id">{{item.describe}}</van-collapse-item>
           
        </van-collapse>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { Collapse, CollapseItem } from 'vant';
export default {
    name: "service",
    components: {
        appHeader:appHeader,
        [Collapse.name]: Collapse,
        [CollapseItem.name]: CollapseItem,
    },
    data(){
        return{
            headertitle:"服务中心",
            userIconShow:false,
            activeName: '0',
            serviceList:new Array,
        }
    },
    methods:{
        getServiceList(){
            let _this = this;
            let data={
               
            };
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getServiceList,
                data,
                res => {
                    // console.log(res);
                    _this.serviceList=res.list;
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        }
    },
    created() {
        this.getServiceList()
    },
}
</script>
<style lang="scss" scoped>

</style>