<template>
    <div class="edit_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-address-edit :area-list="areaList" show-postal show-delete show-set-default  :addressInfo="addressInfo"
        show-search-result :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { AddressEdit } from 'vant';
import areaList from "@/assets/js/area.js";
export default {
    name: "addrEdit",
    components: {
        appHeader:appHeader,
        [AddressEdit.name]:AddressEdit,
    },
    data(){
        return{
            headertitle:"编辑地址",
            userIconShow:false,
            areaList:areaList,
            searchResult: [],//搜索地址内容
            addrId:"",
            addressInfo:{}
        }
    },
    methods: {
        onSave() {
            this.Utils.vants.Toast("保存成功");
            this.$router.back(-1);
        },
        onDelete() {
            this.Utils.vants.Toast("删除成功");
            this.$router.back(-1);
        },
        onChangeDetail(val) {
            console.log(val);
            if (val) {
                this.searchResult = [{
                    name: '黄龙万科中心',
                    address: '杭州市西湖区',
                }];
            } else {
                this.searchResult = [];
            }
        },
        getAddrDetail(){
            let _this = this;
            let data={
                addrId:_this.addrId,
            };
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getAddrDetail,
                data,
                res => {
                    console.log(res.list);
                    _this.addressInfo=res.list;
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        }
    }, 
    created() {
        let _this=this;
        _this.$route.query.id?(_this.addrId=_this.$route.query.id,_this.getAddrDetail()):""
    },
}
</script>
<style lang="scss" scoped>

</style>