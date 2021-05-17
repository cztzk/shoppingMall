<template>
    <div class="classify_container">
        <app-header :headerTitle="headertitle"></app-header>
        <div style="display: flex;">
			<div class="oneNav">
				<!-- vant侧边导航 -->
                <van-sidebar v-model="activeKey" style="height: 617px; white-space: nowrap; overflow-y: scroll;" >
                    <van-sidebar-item v-for="(item,index) in classList" :key="index" :title="item.cname" />
                </van-sidebar>
			</div>
			<div class="twoNav">
				<!-- vant宫格 -->
                <van-grid :gutter="10" column-num="3" :border="false" icon-size="60px">
                    <van-grid-item v-for="(item,idx) in getChildList" :key="idx"  :icon="item.icon" :text="item.cname" 
                    :to="'/productList?id='+item.id"></van-grid-item>
                </van-grid>
			</div>
		</div>
        <app-footer></app-footer>
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { Sidebar, SidebarItem,Grid, GridItem,Icon  } from 'vant';
import appFooter from "@/components/footer.vue";
export default {
    name: "classify",
    components: {
        appHeader:appHeader,
        [Sidebar.name]: Sidebar,  
        [SidebarItem.name]: SidebarItem,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        [Icon.name]: Icon,
        appFooter:appFooter
    },
    data(){
          return{
            headertitle:"产品分类",
            classList:[
                {
                    "cname":  "分类一",
                    "id":0,
                    "childList":[
                        {
                            "cname":"子分类一",
                            "id":10,
                            "icon":"http://text4.fsjuejin.com/app/home/view/default/public/images/contact_icon_1.jpg"
                        },  {
                            "cname":"子分类二",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类三",
                            "id":10, 
                            "icon":"envelop-o"
                        },{
                            "cname":"子分类四",
                            "id":10, 
                            "icon":"envelop-o"
                        },{
                            "cname":"子分类五",
                            "id":10, 
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类一",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类二",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类三",
                            "id":10, 
                            "icon":"envelop-o"
                        },{
                            "cname":"子分类四",
                            "id":10, 
                            "icon":"envelop-o"
                        },{
                            "cname":"子分类五",
                            "id":10, 
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类一",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类二",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类三",
                            "id":10, 
                            "icon":"envelop-o"
                        },{
                            "cname":"子分类四",
                            "id":10, 
                            "icon":"envelop-o"
                        },{
                            "cname":"子分类五",
                            "id":10, 
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类一",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类二",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类三",
                            "id":10, 
                            "icon":"envelop-o"
                        },{
                            "cname":"子分类四",
                            "id":10, 
                            "icon":"envelop-o"
                        },{
                            "cname":"子分类五",
                            "id":10, 
                            "icon":"envelop-o"
                        },
                    ]
                }, {
                    "cname":  "分类二",
                    "id":1,
                    "childList":[
                        {
                            "cname":"子分类一",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类二",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类三",
                            "id":10, 
                            "icon":"envelop-o"
                        }
                    ]
                },{
                    "cname":  "分类三",
                    "id":2,
                    "childList":[
                        {
                            "cname":"子分类一",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类二",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类三",
                            "id":10, 
                            "icon":"envelop-o"
                        }
                    ]
                },{
                    "cname":  "分类四",
                    "id":3,
                    "childList":[
                        {
                            "cname":"子分类一",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类二",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类三",
                            "id":10, 
                            "icon":"envelop-o"
                        }
                    ]
                },{
                    "cname":  "分类五",
                    "id":4,
                    "childList":[
                        {
                            "cname":"子分类一",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类二",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类三",
                            "id":10, 
                            "icon":"envelop-o"
                        }
                    ]
                },{
                    "cname":  "分类六",
                    "id":5,
                    "childList":[
                        {
                            "cname":"子分类一",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类二",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类三",
                            "id":10, 
                            "icon":"envelop-o"
                        }, {
                            "cname":"子分类一",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类二",
                            "id":10,
                            "icon":"envelop-o"
                        },  {
                            "cname":"子分类三",
                            "id":10, 
                            "icon":"envelop-o"
                        }
                    ]
                }
            ], //分类数据
			activeKey:0,
          }
    },
    computed:{
        getChildList(){
            return  this.classList[this.activeKey].childList;
        }
    },
    methods:{
        childListClick(id){
            this.$router.push({
					path:'/productList',
					query:{
						id
					}
				})
        }
    }
}
</script>
<style lang="scss" scoped>
    body{
        padding-bottom: 0;
    }
    .van-sidebar::-webkit-scrollbar {
		display: none;
	}
    .oneNav{
        background: #fff;
        position: fixed;
        height: calc(100vh - 40px);
        left: 0;
        padding: 0 0 40px;
        z-index: 99;
        overflow: auto;
    }
    .twoNav{
        width: 100vw;
        height: calc(100vh - 80px);
        padding: 0 0 60px 80px;
        box-sizing: border-box;
        overflow: auto;
    }
    .classify_container{
        /deep/ .van-grid-item__icon{
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            /deep/    &::after{
                font-size: 40px;
            }
        }
        /deep/ .van-icon__image{
            width: 60px;
            height: 60px;
        }
    }
  
</style>