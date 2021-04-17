<template>
    <van-card
  :num="productItem.count"
  :price="productItem.price"
  :desc="productItem.describe"
  :title="productItem.name"
  :thumb="productItem.imgUrl"
  :origin-price="productItem.orginPrice"
>
  <template #tags>
    <van-tag plain type="danger">标签一</van-tag>
    <van-tag plain type="danger">标签二</van-tag>
  </template>
  <template #footer>
    <van-button size="mini">标签一</van-button>
    <van-button size="mini">标签二</van-button>
  </template>
</van-card>
</template>
<script>
import { Card ,Tag ,Button } from 'vant';

export default {
    name:"productItem",
    components: {
        [Card.name]: Card,
        [Tag.name]: Tag,
        [Button.name]: Button,
    },
    props:{
      "productItem":{
        type: Object,
        default() {
          return [];
        }
      }
    },
    data(){
      return {
            
      }
    }
}
</script>
<style lang="scss" scoped>
.van-card__desc {
    display:-webkit-box; 
    -webkit-box-orient:vertical; 
    -webkit-line-clamp:2; 
    height: 1.0666rem;
    max-height: 1.0666rem;   
    margin: 0.1rem 0;
    white-space: normal;
}
.van-tag{
    margin-right: 3px;
}
.van-card__bottom{
    margin-top: 3px;
}
</style>