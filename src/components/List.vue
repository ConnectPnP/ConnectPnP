<template>
<div id="list">

<b-form class="marginTop center" inline>
    <b-input-group style="width: 50%">
        <b-form-input size="sm" type="text" placeholder="Search"/>
            <b-input-group-append>
                <b-btn size="sm" variant="primary">검색</b-btn>
            </b-input-group-append>
    </b-input-group>

    <b-btn class="btnGroup" size="sm" variant="primary">모임 만들기</b-btn>
    <b-btn class="btnGroup" size="sm" variant="primary">내가 개설한 모임</b-btn>
</b-form>

<b-container class="marginTop container" style="width: 80%">
    <b-row>
        <b-col> <ListView></ListView> </b-col>
        <b-col> <ListView></ListView> </b-col>
    </b-row>
    <b-row>
        <b-col> <ListView></ListView> </b-col>
        <b-col> <ListView></ListView> </b-col>
    </b-row>
    <b-row>
        <b-col> <ListView></ListView> </b-col>
        <b-col> <ListView></ListView> </b-col>
    </b-row>
</b-container>

<b-pagination class="marginTop" align="center" size="sm" :total-rows="50" :per-page="6">

</b-pagination>

</div>
</template>

<script>
import ListView from './listView.vue'

export default {
  name: 'list',
  components: {
    ListView
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.btnGroup {
    margin-left: 15px;
}

.marginTop {
    margin-top: 30px;
}

.center {
    width: 70%;
    margin-left: 25%;
    margin-right: 25%;
}

</style>
