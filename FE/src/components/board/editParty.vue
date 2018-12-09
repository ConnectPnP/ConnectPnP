<template>
<div>
    <CreateParty  
        :currentGroupId="currentGroupId"
        :isEdit="true" />
</div>
</template>
<script>
import CreateParty from './createParty.vue'

export default {
    components:{
        CreateParty
    },
    data(){
        return {
            currentGroupId: ''
        }
    },
    mounted(){
        // this.editor();
        this.currentGroupId = this.$session.get('currentGroupId');
    }
}
</script>