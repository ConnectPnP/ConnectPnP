<template>

<div id="list">
<b-form class="marginTop center" inline>
    <b-input-group style="width: 70%">
        <b-input-prepend>
            <b-form-select v-model="firstSelect" :options="select1" @change="selectOption1" />
            <b-form-select v-if="(firstSelect==0)||(firstSelect==1)"
                v-model="secondSelect" :options="select2" @change="selectOption2" />
            <b-form-select v-if="(firstSelect==0)&&(secondSelect!=null)" v-model="thirdSelect" :options="select3" />
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
        <ListView v-bind:groupTitle=group.title v-bind:groupLocation=group.locationText
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
          currentPage: 0,
          firstSelect: null, secondSelect:null, thirdSelect:null,
            select1 : [
                { value: null, text: '--검색--', disabled:true},
                { value: 0, text: '카테고리'},
                { value: 1, text: '주최자'},
                { value: 2, text: '위치'}
            ],
            select2: [ ],
            select3: [ ],
            hostSearchOption: [
                { value: null, text: '--필터--', disabled:true},
                { value: 21, text: 'ID'},
                { value: 22, text: '닉네임'}
            ],
            categoryList1: [{value:null, text:"--대분류--", disabled:true}], // 카테고리 대분류
            categoryList2:[ ], // 카테고리 소분류
            
          groupList : [
          ]
      }
  },
  mounted(){
      this.getCategoryList();
      this.getPostData()
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
        selectOption1(select){
            this.secondSelect = null;
            if(select == 0){
                this.select2 = this.categoryList1;
            } else if(select == 1){
                this.select2 = this.hostSearchOption;
            } 
        },
        selectOption2(select){
            this.thirdSelect = null;
            if(this.firstSelect == 0){
                if(select != null){
                    this.select3 = this.categoryList2[select];
                }
            }
        },
        getCategoryList() {
                var vm = this
                this.$http.get('http://localhost:3000/category')
                .then((result) => {
                    // get category list
                    for(var i=0; i<result.data.length; i++) {
                            var categoryOption = '{"value" : "' + i + '", "text" : "'+ result.data[i].name+'"}';
                            vm.categoryList1.push(JSON.parse(categoryOption));
                    }

                    // get sub category list
                    for(var i=0; i<result.data.length; i++) {
                        var categoryOption = [{value:null, text: "--소분류--", disabled:true}];
                        for(var j=0; j<result.data[i].sub_category.length ; j++){
                            var option = '{"value" : "' + result.data[i].sub_category[j]._id + '", "text" : "'+ result.data[i].sub_category[j].name+'"}';
                            categoryOption.push(JSON.parse(option));
                        }
                        vm.categoryList2.push(categoryOption);
                    }
                });
            },
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
