<template>
    <!-- <router-link :to= "{name: 'detailParty' , params: {id: groupId}}"> -->
    <div class = "imgTxt" @click="gotoPage(groupId)">    
        <tr>
            <b-img class="listView groupimg" :src = "groupImg"/>
        </tr>
        <tr>
            <p> {{getTitle}} </p>
        </tr>
    </div>    
    <!-- </router-link> -->
</template>


<script>
export default {
    name: 'recentView',
    props: {
        groupId : {
            type : String, ///// String or Number??
            default() { return "Id"; }
        },
        groupTitle: {
            type: String,
            default() { return "Title"; }
        },
        groupImg: {
            type: String,
            default() { return "https://www.freeiconspng.com/uploads/no-image-icon-6.png"; }
        },
    },
    methods: {
        gotoPage(id) {
            window.location.href = "http://localhost:8080/party/detail/"+id;
        }
    },
    computed: {
        getTitle: function(){
            var str = this.groupTitle;
            if(str.length > 10){
                str = str.substring(0,10);
                str += "..";
            }
            return str;
        },

    }
};
</script>

<style>
.groupimg {
    width: 80px;
    height: 80px;
    margin: 5px;
}

.listView {
    cursor : pointer
}

p {
    font-size: 10px;
}

.imgTxt {
    display: inline-block
}

</style>
