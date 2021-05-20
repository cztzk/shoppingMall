<template>
    <div class="pay_detail">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-cell  is-link to="addrList?isChoice=true">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <div class="order_info flex_nowrap">
                    <van-icon name="location-o" color="#c82519"  />
                    <div>
                        <h4 class="ellipsis">唐 1304917xxxx 佛山市禅城区xxx大道xxx小区</h4>
                        <h6>佛山市禅城区</h6>
                    </div>
                </div>
            </template>
        </van-cell>
    </div>
</template>

<script>
import appHeader from "@/components/header.vue";
import { Cell, CellGroup,Icon } from 'vant';

export default {
    name: "payDetail",
    components: {
        appHeader:appHeader,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Icon.name]: Icon,
    },
    data(){
        return{
            headertitle:"订单详情",
            userIconShow:false,
        }
    },
    methods:{
    
    },
    created() {
        
    },
}
</script>
<style lang="scss" scoped>
.order_info {
    width: 320px;
    .van-icon {
        top: 4px;
        margin-right: 5px;
    }
    div{
        width: 290px;
    }
}
</style>