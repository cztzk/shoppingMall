<template>
    <div class="contact_container">
        <app-header :headerTitle="headertitle" :userIconShow="userIconShow"></app-header>
        <van-contact-list
        v-model="chosenContactId"
        :list="contactList"
        default-tag-text="默认"
        add-text="新建联系人"
        @add="addContact"
        @edit="editContact"
        @select="selectContact"
        />
    </div>
</template>
<script>
import appHeader from "@/components/header.vue";
import { ContactList } from 'vant';

export default {
    name: "contactList",
    components: {
        appHeader:appHeader,
        [ContactList .name]: ContactList ,
    },
    data(){
        return{
            headertitle:"通讯录",
            userIconShow:false,
            chosenContactId: '1',
            contactList: [ ],
        }
    },
    methods: {
        getContactList(){
            let _this = this;
            let user=_this.Storage.localData("get" ,"user");
            if(user){
                _this.Utils.axiosPost(
                    _this,
                    _this.Utils.config.getContactList,
                    {
                        userId: user.id
                    },
                    res => {
                        console.log(res);
                        _this.contactList=res;
                    },
                    err=>_this.Utils.vants.Toast.fail(err.data ? err.data.msg : err)
                );
            }
        },
        addContact() {
            // this.Utils.vants.Toast('新增');
            this.$router.push({
				path:'/contactEdit'
			})
        },
        editContact(contact) {
            this.Utils.vants.Toast('编辑' + contact.id);
            let contactId=contact.id;
            this.$router.push({
				path:'/contactEdit',
				query:{
					id:contactId
				}
			})
        },
        selectContact(contact) {
            this.Utils.vants.Toast('选择' + contact.id);
        },
    },
    created() {
        this.getContactList();
    },
}
</script>
<style lang="scss" scoped>


</style>