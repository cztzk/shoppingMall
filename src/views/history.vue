<template>
    <div class="history_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-list   v-model="loading"  :finished="finished" finished-text="~~我是有底线的~~" @load="getHistoryList" >
           <product-item v-for="(item,idx) in list" :productItem="item" :key="idx"></product-item>
        </van-list>
        <app-footer></app-footer>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { Image as VanImage ,List } from 'vant';
import productItem from "@/components/productItem.vue";
import appFooter from "@/components/footer.vue";
export default {
    name: "history",
    components: {
        appHeader:appHeader,
        [List.name]: List,
        [VanImage.name]: VanImage,
        productItem:productItem,
        appFooter:appFooter,
    },
    data(){
        return{
            headertitle:"浏览记录",
            userIconShow:false,
            loading: false,
            finished: false,
            list: new Array,
            pageSize:10,
            pageNum:0,
        }
    },
    methods:{
        getUser(){
            let user=this.Storage.localData("get" ,"user");
            user?(this.userInfo=user,this.getHistoryList()):this.$router.push({ path: "/login" });
        },
        getHistoryList(){
            let _this = this;
            _this.loading = true;
            let data={
                userId:_this.userInfo.id,
                pageSize:_this.pageSize,
                pageNum:_this.pageNum
            }
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getIndexProductList,
                data,
                res => {
                    console.log(res);
                    let total=_this.Utils.getTotalPageNum(res.total,data.pageSize);
                    _this.list=_this.list.concat(res.list);
                    _this.pageNum+=1;
                    _this.finished =_this.pageNum>=total?true:false;
                    _this.loading = false;
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        }
    },
    created() {
        this.getUser();
    },
}
</script>
<style lang="scss" scoped>

</style>