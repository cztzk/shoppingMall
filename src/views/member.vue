<template>
    <div class="member_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-sticky :offset-top="46">
            <van-dropdown-menu >
                <van-dropdown-item v-model="value1" @change="dropdownChange" :options="option1" />
                <van-dropdown-item v-model="value2" @change="dropdownChange" :options="option2" />
                <van-dropdown-item title="筛选" ref="item">
                    <van-cell center title="包邮">
                        <template #right-icon>
                            <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
                        </template>
                    </van-cell>
                    <van-cell center title="团购">
                        <template #right-icon>
                            <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
                        </template>
                    </van-cell>
                    <div style="padding: 5px 16px;">
                        <van-button type="danger" block round @click="onConfirm">
                            确认
                        </van-button>
                    </div>
                </van-dropdown-item>
            </van-dropdown-menu>
        </van-sticky>
        <van-list   v-model="loading"  :finished="finished" finished-text="~~我是有底线的~~" @load="getList" >
            <product-item v-for="(item,idx) in list" :productItem="item" :key="idx"></product-item>
        </van-list>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { DropdownMenu, DropdownItem,List,Sticky,Switch ,Button ,Cell, CellGroup  } from 'vant';
import productItem from "@/components/productItem.vue";
export default {
    name: "member",
    components: {
        appHeader:appHeader,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        [List.name]: List,
        [Sticky.name]: Sticky,
        [Switch.name]: Switch,
        [Button.name]: Button ,
        [Cell.name]: Cell ,
        [CellGroup.name]: CellGroup ,
        productItem:productItem,
    },
    data(){
        return{
            headertitle:"会员中心",
            userIconShow:false,
             value1: 0,
            value2: 'a',
            switch1: false,
            switch2: false,
            option1: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 },
            ],
            option2: [
                { text: '默认排序', value: 'a' },
                { text: '好评排序', value: 'b' },
                { text: '销量排序', value: 'c' },
            ],
            list: new Array,
            loading: false,
            finished: false,
            pageSize:10,
            pageNum:0,
            productListId:""
        }
    },
    methods:{
        getList() {
            let _this = this;
            _this.loading = true;
            let data={
                productListId:_this.productListId,
                pageSize:_this.pageSize,
                pageNum:_this.pageNum
            }
            _this.Utils.axiosPost(
                _this,
                _this.Utils.config.getIndexProductList,
                data,
                res => {
                    let total=_this.Utils.getTotalPageNum(res.total,data.pageSize);
                    _this.list=_this.list.concat(res.list);
                    _this.pageNum+=1;
                    _this.finished =_this.pageNum>=total?true:false;
                    _this.loading = false;
                },
                err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
            );
        },
        onConfirm() {
            this.$refs.item.toggle();
        },
        dropdownChange(){
            this.Utils.vants.Toast("切换列表，功能后续完善");
        }
    },
    mounted:function(){

    },
    created() {
        let productListId=this.$route.query.id?this.$route.query.id:0;
        this.productListId=productListId;
        this.getList();
    },
}
</script>
<style lang="scss" scoped>

</style>