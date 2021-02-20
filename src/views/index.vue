<template>
    <div class="index_box">
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" label="描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息" />
        </van-cell-group>
    </div>
</template>
<script>
import {  Cell, CellGroup } from 'vant';

export default {
    name: "index",
    components: {
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
    },
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>

.index_1{
    height: 200px;
    width: 375px;

    background: #000;
}.index_2{
    width: 250px;

    height: 200px;
    background: #f3f3f3;
}
</style>