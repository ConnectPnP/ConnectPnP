<template>

<div id="list">
<b-form class="marginTop center" inline>
    <b-input-group style="width: 50%">
        <b-form-input size="sm" type="text" placeholder="Search"/>
            <b-input-group-append>
                <b-btn size="sm" variant="primary">검색</b-btn>
            </b-input-group-append>
    </b-input-group>

    <b-btn class="btnGroup" size="sm" variant="primary" href="/party/create">모임 만들기</b-btn>
    <b-btn class="btnGroup" size="sm" variant="primary">내가 개설한 모임</b-btn>
</b-form>

<div class="margin">
    <div class="row" v-for="i in Math.ceil(groupList.length / 2)">
    <span v-for="group in groupList.slice((i-1)*2,i*2)">
        <ListView v-bind:groupTitle=group.title v-bind:groupLocation=group.location
        v-bind:groupId=group._id
            v-bind:groupContent=group.detail v-bind:groupImg=group.images[0] />
    </span>
</div>
</div>


<b-pagination class="marginTop"  @change="pageChange" v-model="currentPage" align="center" size="sm" :total-rows="50" :per-page="6"
    @input="groupList.length">

</b-pagination>

</div>
</template>

<script>
import ListView from './listView.vue'

export default {
  name: 'list',
  components: {
    ListView,
  },
  data(){
      return {
          currentPage : 1,
          groupList : [
          ]
      }
  },
  methods: {
      pageChange(page) {
          this.currentPage = page
          this.getPostData()
      },
       getPostData () {
           var vm = this
           this.$http.get('http://localhost:3000/board/list/' + this.currentPage)
           .then((result) => {
               vm.groupList = result.data
           })
        }
    },
    mounted() {
        this.getPostData()
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

.margin {
    margin-left: 20%;
    margin-right: 20%;
}

</style>
