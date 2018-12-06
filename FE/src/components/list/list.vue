<template>

<div id="list">
<b-form class="marginTop center" inline>
    <b-input-group style="width: 50%">
        <b-input-prepend>
            <b-form-select v-model="firstSelect" :options="select1" @change="selectOption" />
            <b-form-select v-model="secondSelect" :options="select2" />
        </b-input-prepend>
        <b-form-input type="text" placeholder="Search"/>
            <b-input-group-append>
                <b-btn class="btn-info">검색</b-btn>
            </b-input-group-append>
    </b-input-group>
                <b-button-group class="btnGroup">
                <b-btn class="btn-info btnGroup" href="/party/create">모임 생성</b-btn>
                <b-btn class="btn-info btnGroup" variant="primary" href="">내 모임</b-btn>
                </b-button-group>
    
</b-form>

<div class="margin">
    <div class="row" v-for="i in Math.ceil(groupList.length / 2)">
    <span v-for="group in groupList.slice((i-1)*2,i*2)">
        <ListView v-bind:groupTitle=group.title v-bind:groupLocation=group.location
        v-bind:groupId=group._id
            v-bind:groupDetail=group.detail v-bind:groupImg=group.images[0] />
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
          currentPage : 0,
          firstSelect: null, secondSelect:null,
            select1 : [
                { value: null, text: '--대분류--', disabled:true},
                { value: 1, text: '카테고리'},
                { value: 2, text: '주최자'},
                { value: 3, text: '위치'}
            ],
            select2: [
                { value: null, text: '----', disabled:true}
                ],
            options1: [
                { value: null, text: '--카테고리--', disabled:true},
                { value: 11, text: '게임'},
                { value: 12, text: '운동'},
                { value: 13, text: '여행'},
                { value: 14, text: '공동구매'},
                { value: 15, text: '사진'},
                { value: 16, text: '멍멍이'},
            ],
            options2: [
                { value: null, text: '--주최자--', disabled:true},
                { value: 21, text: 'ID'},
                { value: 22, text: '닉네임'}
            ],
          groupList : [
          ]
      }
  },
  methods: {
      pageChange(page) {
          this.currentPage = page -1
          this.getPostData()
      },
       getPostData () {
           var vm = this
           this.$http.get('http://localhost:3000/board/list/' + this.currentPage)
           .then((result) => {
               vm.groupList = result.data
           })
       },
        selectOption(select){
            this.secondSelect = null;
            if(select == 1){
                this.select2 = this.options1;
            } else if(select == 2){
                this.select2 = this.options2;
            } else if(select == 3){
                this.select2 = [
                { value: null, text: '----', disabled:true}
                ];
            }
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
    text-align: center;
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
