<template>
    <div class="listView card">
        <table>
            <td>
                <b-img class="cardImg" left rounded="left" src="https://picsum.photos/600/300/?image=25"/>
            </td>
            <td class="cardBody">
                    <h4>Title</h4>
                    <h6>Location</h6>
                    <p>content</p>
            </td>
        </table>
    </div>
</template>


<script>
export default {

}
</script>

<style>
.card {
    width: 400px;
    height: 150px;
    margin: 10px;
}

table {
    width: 400px;
    height: 150px;
}

td {
    vertical-align: middle;
    width: 200px;
}

.cardBody {
    padding: 10px;
}

.cardImg {
    height: 147px;
    width: 200px;
}

p {
    font-size: 13px;
}


</style>
