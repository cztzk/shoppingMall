<template>
    <div class="edit_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-contact-edit
        is-edit
        show-set-default
        :contact-info="editingContact"
        set-default-label="设为默认联系人"
        @save="onSave"
        @delete="onDelete"
        />
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { ContactEdit } from 'vant';
export default {
    name: "cart",
    components: {
        appHeader:appHeader,
        [ContactEdit.name]: ContactEdit ,
    },
    data(){
        return{
            headertitle:"编辑联系人",
            userIconShow:false,
            editingContact: {},
        }
    },
    methods: {
        onSave(contactInfo) {
            this.Utils.vants.Toast('保存');
            console.log(contactInfo);
            this.$router.back(-1);
        },
        onDelete(contactInfo) {
            this.Utils.vants.Toast('删除');
            console.log(contactInfo);
            this.$router.back(-1);
        },
    },
    created() {
        let id=this.$route.query.id?this.$route.query.id:"";
        console.log(id);
    },
}
</script>
<style lang="scss" scoped>

</style>