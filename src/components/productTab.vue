<template>
    <van-tabs class="product_tab" sticky >
        <van-tab v-for="(item,idx) in classifyList" :key="idx">
            <div class="tab-title" slot="title" @click="tabClick(item.id)">{{ item.title }}</div>
        </van-tab>
    </van-tabs>
</template>
<script>
import { Tab, Tabs} from 'vant';

export default {
    name:"productTab",
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
    },
    props:[
        "classifyList"
    ],
    data(){
        return {

        }
    },
    methods:{
        tabClick(id){
            this.$store.commit('setIndexProductId', id);
        }
    },  
}
</script>
<style lang="scss" scoped>
.product_tab{
    margin: 5px 0;
}
</style>