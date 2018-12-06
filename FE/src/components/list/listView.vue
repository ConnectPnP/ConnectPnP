<template>
    <router-link :to= "{name: 'detailParty' , params: {id: groupId}}">
    <div class="listView card">
        <table> 
            <td class="tdImg">
                <b-img class="cardImg" left rounded="left" :src="groupImg" />
            </td>
            <td class="cardBody">
                    <h4>{{ viewTitle }}</h4>
                    <h6>{{ viewLocation }}</h6>
                    <p>{{ viewDetail }}</p>
            </td>
        </table>
    </div>
    </router-link>
</template>


<script>
export default {
    name: 'listView',
    props: {
        groupId : {
            type : String,
            default() { return "Id"; }
        },
        groupTitle: {
            type: String,
            default() { return "Title"; }
        },
        groupLocation: {
            type: String,
            default() { return "Location"; }
        },
        groupDetail: {
            type: String,
            default() { return "Detail"; }
        },
        groupImg: {
            type: String,
            default() { return "https://www.freeiconspng.com/uploads/no-image-icon-6.png"; }
        },
    },
    computed: {
        viewTitle: function(){
            var str = this.groupTitle;
            if(str.length > 8){
                str = str.substring(0,8);
                str += "...";
            }
            return str;
        },
        viewDetail: function (){
            var str = this.groupDetail;
            if(str.length > 18){
                str = str.substring(0,18);
                str += "...";
            }
            return str;
        },
        viewLocation: function (){
            var str = this.groupLocation;
            if(str.length > 13){
                str = str.substring(0,13);
                str += "...";
            }
            return str;
        },
    }
};
</script>

<style>
.listView {
    cursor : pointer
}

.card {
    width: 400px;
    height: 150px;
    margin: 10px;
}

table {
    width: 400px;
    height: 150px;
}

.tdImg {
    width: 150px;
}

.cardBody {
    vertical-align: middle;
    width: 250px;
    padding: 10px;
}

.cardImg {
    height: 147px;
    width: 150px;
}

p {
    font-size: 13px;
}


</style>
