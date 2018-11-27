<template>
    <div class="listView card" onclick="location.href='/party/detail'">
        <table> 
            <td class="tdImg">
                <b-img class="cardImg" left rounded="left" :src="groupImg" />
            </td>
            <td class="cardBody">
                    <h4>{{ groupTitle }}</h4>
                    <h6>{{ groupLocation }}</h6>
                    <p>{{ viewDetail }}</p>
            </td>
        </table>

    </div>
</template>


<script>
export default {
    name: 'listView',
    props: {
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
            default() { return "detail"; }
        },
        groupImg: {
            type: String,
            default() { return "https://www.freeiconspng.com/uploads/no-image-icon-6.png"; }
        },
    },
    computed: {
        viewDetail: function (){
            var str = this.groupDetail;
            if(str.length > 18){
                str = str.substring(0,18);
                str += "...";
            }
            return str;
        }
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
