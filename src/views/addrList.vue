<template>
    <div class="asddr_container">
        <app-header :headerTitle="headertitle"></app-header>
        <van-address-list
        v-model="chosenAddressId"
        :list="addrList"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        add-button-text="新增地址"
        @add="addAddr"
        @edit="editAddr"
        @select="selectAddr"
        />
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { AddressList  } from 'vant';


export default {
    name: "addrList",
    components: {
        appHeader:appHeader,
        [AddressList.name]: AddressList,  
    },
    data(){
        return{
            headertitle:"收货地址",
            chosenAddressId:0,
            addrList:new Array,
            disabledList:new Array,
        }
    },
    methods:{
        getAddrList(){
            let _this = this;
            let user=_this.Storage.localData("get" ,"user");
            if(user){
                _this.Utils.axiosPost(
                    _this,
                    _this.Utils.config.getAddrList,
                    {
                        userId: user.id
                    },
                    res => {
                         _this.addrList = res.filter(item => item.isDisabled);
                         _this.disabledList = res.filter(item => !item.isDisabled);
                    },
                    err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
                );
            }
        },
        addAddr() {
            this.$router.push({
				path:'/addrEdit',
			})
        },
        selectAddr(){
            this.Utils.vants.Toast("地址已切换");
            this.$route.query.isChoice?this.$router.back(-1):"";
        },
        editAddr(item) {
            let addrId=item.id;
            this.$router.push({
				path:'/addrEdit',
				query:{
					id:addrId
				}
			})
        },
    },
    created() {
        this.getAddrList();
    },
}
</script>
<style lang="scss" scoped>

</style>