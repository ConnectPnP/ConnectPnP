<template>
    <router-link :to= "{name: 'detailParty' , params: {id: groupId}}">
    <div class="listView card">
        <table> 
            <td class="tdImg">
                <b-img class="cardImg" left rounded="left" :src="groupImg" />
            </td>
            <td class="cardBody">
                    <h4>{{ groupTitle }}</h4>
                    <h6>{{ groupLocation }}</h6>
                    <p>{{ groupContent }}</p>
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
        groupContent: {
            type: String,
            default() { return "content"; }
        },
        groupImg: {
            type: String,
            default() { return "https://www.freeiconspng.com/uploads/no-image-icon-6.png"; }
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
