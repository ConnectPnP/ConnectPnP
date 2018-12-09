<template>

<div id="list">
<b-form class="marginTop center" inline>
    <b-input-group style="width: 70%">
        <b-input-prepend>
            <b-form-select v-model="firstSelect" :options="select1" @change="selectOption1" />
            <b-form-select v-if="(firstSelect==3)"
                v-model="secondSelect" :options="select2" />
        </b-input-prepend>
        <b-form-input v-if="firstSelect!=3" type="text" v-model="searchQuery" placeholder="Search"/>
            <b-input-group-append>
                <b-btn class="btn-info" @click="searchGroup(true)">검색</b-btn>
            </b-input-group-append>
    </b-input-group>
                <b-button-group class="btnGroup">
                <b-btn class="btn-info btnGroup" href="/party/create">모임 생성</b-btn>
                <b-btn class="btn-info btnGroup" variant="primary" @click="getMyGroup(true)">내 모임</b-btn>
                </b-button-group>

</b-form>

<div class="margin">
    <div class="row" v-for="i in Math.ceil(groupList.length / 2)">
    <span v-for="group in groupList.slice((i-1)*2,i*2)">
        <ListView
            :groupTitle=group.title
            :groupLocation=group.location.title
            :groupId=group._id
            :groupDetail=group.detail
            :groupImg=group.images[0] />
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
          query : '',
          currentPage: 0,
          searchQuery : '',
          type : 0,
          firstSelect: null, secondSelect:{},
          selected_category_id: null, selected_subcategory_id: null,
            select1 : [
                { value: null, text: '--검색--', disabled:true},
                // { value: 0, text: '카테고리'},
                { value: 1, text: '주최자'},
                { value: 2, text: '위치'},
                { value: 3, text: '조건'}
            ],
            select2: [ ],
            select3: [ ],
            // hostSearchOption: [
            //     { value: {}, text: '--필터--', disabled:true},
            //     { value: 1, text: 'ID'},
            //     { value: 2, text: '닉네임'}
            // ],
            condition: [
                { value: {}, text: '--필터--', disabled:true},
                { value: 1, text: '헌재 모집중'},
                { value: 2, text: '여자'},
                { value: 3, text: '남자'},
                { value: 4, text: '혼성'},
                // { value: 5, text: '10대 이상'},
                // { value: 6, text: '20대 이상'},
                // { value: 7, text: '30대 이상'},
                { value: 8, text: '10명 이하'},
                { value: 9, text: '20명 이하'}
            ],
            categoryList1: [{ value: {}, text: '--- 대분류 ---', disabled:true}], // 카테고리 대분류
            categoryList2:[ ], // 카테고리 소분류
          groupList : []
      }
  },
  mounted(){
      this.getCategoryList()
      this.getPostData()
  },
  methods: {
      pageChange(page) {
        this.currentPage = page - 1
        switch(this.type) {
            case 0 :
                this.getPostData()
                break;
            case 1 :
                this.getMyGroup(false)
                break;
            case 2 :
                this.searchGroup(false)
                break;
        }
      },
       getPostData () {
           var vm = this
           var page = this.currentPage
           this.$http.get('http://localhost:3000/board/list/' + page + '/' + this.$session.get('category'))
           .then((result) => {
               vm.groupList = result.data
           })
       },
       getMyGroup(btn) {
        if(btn)
            this.currentPage = 0;
        var vm = this
           this.$http.post('http://localhost:3000/board/search/' +this.currentPage, 
           {
                host : this.$session.get('id')
            })
           .then((result) => {
               vm.type = 1;
               vm.groupList = result.data
           })
       },
        selectOption1(select){
            this.secondSelect = null;
            // if(select == 0){
            //     this.select2 = this.categoryList1;
            // } else 
            // if(select == 1){
            //     this.select2 = this.hostSearchOption;
            // } else 
            if(select == 3) {
                this.select2 = this.condition;
            }
        },
        // selectOption2(select){
        //     this.thirdSelect = null;
        //     if(this.firstSelect == 0){
        //         if(select != null){
        //             this.select3 = this.categoryList2[select.index];
        //             this.selected_category_id = select.id;
        //         }
        //     }
        // },
        getCategoryList() {
                var vm = this
                this.$http.get('http://localhost:3000/category')
                .then((result) => {
                    // get category list
                    for(var i=0; i<result.data.length; i++) {
                            var categoryOption = '{"value" : { "index": "'+i+'", "id": "' + result.data[i]._id + '"}, "text" : "'+ result.data[i].name+'"}';
                            vm.categoryList1.push(JSON.parse(categoryOption));
                    }
                    // get sub category list
                    for(var i=0; i<result.data.length; i++) {
                        var categoryOption = [{ value: null, text: '--- 소분류 ---', disabled:true}];
                        for(var j=0; j<result.data[i].sub_category.length ; j++){
                            var option = '{"value" : "' + result.data[i].sub_category[j]._id + '", "text" : "'+ result.data[i].sub_category[j].name+'"}';
                            categoryOption.push(JSON.parse(option));
                        }
                        vm.categoryList2.push(categoryOption);
                    }
                });
        },
        searchGroup(btn) {
            var vm = this
            this.type = 2;
            var searchParam = 0;
            var page = this.currentPage
            if(this.firstSelect == 3)
                searchParam = this.firstSelect * this.secondSelect
            else searchParam = this.firstSelect
            if(btn)
                page = 0;
            switch(searchParam) {
                case 1*1 : // 주최자 nickName
                    vm.$http.post('http://localhost:3000/board/searchUser',{name : vm.searchQuery})
                    .then((result) => {
                        var id = [];
                        result.data.forEach(
                            function getIds(newId) {
                                id.push(newId._id)
                            }
                        )
                        vm.query = {
                            "subCategory" : vm.$session.get('category'), 
                            "host" : {$in: id}
                        }
                        vm.$http.post('http://localhost:3000/board/search/' + page, vm.query)
                        .then((result) => {
                            vm.groupList = result.data
                        })
                    })
                    break;
                case 2 : // 위치
                    vm.query = {
                                "subCategory" : vm.$session.get('category'), 
                                "location.title" : { "$regex": vm.searchQuery, "$options": "i" } 
                    }
                    vm.$http.post('http://localhost:3000/board/search/' + page, vm.query)
                        .then((result) => {
                        vm.groupList = result.data
                    })
                    break;
                case 3*1 : // 현재 모집중
                    var currentDate = new Date().toISOString().slice(0,10);
                    vm.query = {
                                "subCategory" : vm.$session.get('category'), 
                                "start_date" : {$lte: currentDate}, 
                                "due_date" : {$gte: currentDate},
                    }
                    vm.$http.post('http://localhost:3000/board/search/' + page, vm.query)
                        .then((result) => {
                        vm.groupList = result.data
                    })
                    break;
                case 3*2 : // 여자
                    vm.query = {
                                "subCategory" : vm.$session.get('category'), 
                                "conditions.gender" : "female"
                            }
                    vm.$http.post('http://localhost:3000/board/search/' + page, vm.query)
                        .then((result) => {
                        vm.groupList = result.data
                    })
                    break;
                case 3*3 : // 남자
                    vm.query = {
                                "subCategory" : vm.$session.get('category'), 
                                "conditions.gender" : "male"
                            }
                    vm.$http.post('http://localhost:3000/board/search/' + page, vm.query)
                        .then((result) => {
                        vm.groupList = result.data
                    })
                    break;
                 case 3*4 : // 혼성
                    vm.query = {
                                "subCategory" : vm.$session.get('category'), 
                                "conditions.gender" : "none"
                            }
                    vm.$http.post('http://localhost:3000/board/search/' + page, vm.query)
                        .then((result) => {
                        vm.groupList = result.data
                    })
                    break;
                // case 3*5 : // 10대 이상
                //     vm.query = {
                //                 "subCategory" : vm.$session.get('category'), 
                //                 "conditions.age[0]" : {$gte: 10}
                //             }
                //     vm.$http.post('http://localhost:3000/board/search/' + page, vm.query)
                //         .then((result) => {
                //         vm.groupList = result.data
                //     })
                //     break;
                // case 3*6 : // 20대 이상
                //     vm.query = {
                //                 "subCategory" : vm.$session.get('category'),
                //                 "conditions.age[0]" : {$gte: 20},
                //             }
                //     vm.$http.post('http://localhost:3000/board/search/' + page, vm.query)
                //         .then((result) => {
                //         vm.groupList = result.data
                //     })
                //     break;
                // case 3*7 : // 30대 이상
                //     vm.query = {
                //                 "subCategory" : vm.$session.get('category'), 
                //                 "conditions.age[0]" : {$gte: 30},
                //             }
                //     vm.$http.post('http://localhost:3000/board/search/' + page, vm.query)
                //         .then((result) => {
                //         vm.groupList = result.data
                //     })
                //     break;
                case 3*8 : // 10명 이하
                    vm.query = {
                            "subCategory" : vm.$session.get('category'), 
                            "max_num" : { $lte: 10 }
                        }
                    vm.$http.post('http://localhost:3000/board/search/' + page, vm.query)
                        .then((result) => {
                        vm.groupList = result.data
                    })
                    break;
                case 3*9 : // 20명 이하
                    vm.query = {
                                "subCategory" : vm.$session.get('category'), 
                                "max_num" : { $lte: 20 }
                            }
                    vm.$http.post('http://localhost:3000/board/search/' + page, vm.query)
                        .then((result) => {
                        vm.groupList = result.data
                    })
                    break;  
            }
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
