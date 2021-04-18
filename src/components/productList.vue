<template>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="~~我是有底线的~~"
        @load="getList"
        >
        <product-item v-for="(item,idx) in list" :productItem="item" :key="idx"></product-item>
    </van-list>
</template>
<script>

import { List } from 'vant';
import productItem from "@/components/productItem.vue";
import { mapState } from 'vuex';

export default {
    name:"productList",
    components: {
        [List.name]: List,
        productItem:productItem
    },
    data(){
        return {
            list: new Array,
            loading: false,
            finished: false,
            pageSize:10,
            pageNum:0,
        }
    },
    computed: {
        ...mapState(['indexProductId']), 
    },
    watch:{
      '$store.state.indexProductId':function(){ //监听vuex中userName变化而改变header里面的值
        this.list=[];
        this.loading=false;
        this.finished=false;
        this.pageNum=0;
        this.getList();
      }
    },
    methods: {
        getList() {
            let _this = this;
            _this.loading = true;
            let data={
                productId:_this.$store.state.indexProductId,
                pageSize:_this.pageSize,
                pageNum:_this.pageNum
            }
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getIndexProductList,
                data,
                res => {
                    let total=_this.Utils.getTotalPageNum(res.total,data.pageSize);
                    res.list.forEach(function(item){
                        item.price=_this.Utils.formatMoney(item.price);
                        item.orginPrice=_this.Utils.formatMoney(item.orginPrice);
                    })
                    _this.list=_this.list.concat(res.list);
                    _this.pageNum+=1;
                    _this.finished =_this.pageNum>=total?true:false;
                    // console.log(_this.pageNum);
                    // console.log(total);
                    // console.log( _this.list);
                    _this.loading = false;
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        },
    },
}
</script>
<style lang="scss" scoped>

</style>