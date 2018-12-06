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
        <ListView v-bind:groupTitle=group.groupInfo.title v-bind:groupLocation=group.groupInfo.location
            v-bind:groupDetail=group.groupInfo.detail v-bind:groupImg=group.groupInfo.group_img />
    </span>
</div>
</div>


<b-pagination class="marginTop" align="center" size="sm" :total-rows="50" :per-page="6"
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
          currentPage: 1,
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
            categoryList1: [ ], // 카테고리 대분류
            categoryList2:[ ], // 카테고리 소분류
            
          groupList : [
              // { id : , groupInfo: { title, location, detail, group_img } }
              {
                  id:1,
                  groupInfo: {
                      title : "보드게임 하쟈",
                      location : "경기도 용인시",
                      detail : "저랑 같이 보드게임 할 사람 찾습니다! 몸만 오세요~~",
                      group_img: "http://magazine.hankyung.com/magazinedata/images/photo/201707/c3667962b7df3ae222a3306d4d59fc6f.jpg"
                  }
              }, 
              {
                  id:2,
                  groupInfo: {
                      title : "노래방 기기",
                      location : "아주대학교 판타스틱 코인노래방",
                      detail : "저랑 듀엣할분 구함니다,,,",
                      group_img: "https://github.com/Eumji/Seoul-Bammm-v2/blob/master/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png?raw=true"
                  }
              }, 
              {
                  id:3,
                  groupInfo: {
                      title : "무선마이크 공구",
                      location : "모름",
                      detail : "무선마이크가 너무 사고싶은데 좀 비싸네여... 같이 공구해요!",
                      group_img: "http://i.011st.com/ex_t/R/400x400/1/85/0/src/pd/17/5/3/4/8/3/5/LxXLR/1784534835_B.jpg"
                  }
              }, 
              {
                  id:4,
                  groupInfo: {
                      title : "로떼월드 단체할인 받아오",
                      location : "로떼월드",
                      detail : "로떼월드 너무 비싸오 같이 단체할인 받아오",
                      group_img: "http://adventure.lotteworld.com/common/images/logo.png"
                  }
              },
              {
                  id:5,
                  groupInfo: {
                      title : "보드게임 하자구",
                      location : "경기도 용인시",
                      detail : "저랑 같이 보드게임 할 사람 찾습니다! 몸만 오세요~~",
                      group_img: "http://magazine.hankyung.com/magazinedata/images/photo/201707/c3667962b7df3ae222a3306d4d59fc6f.jpg"
                  }
              }, 
              {
                  id:6,
                  groupInfo: {
                      title : "보드게임 하쟈하쟈",
                      location : "경기도 용인시",
                      detail : "저랑 같이 보드게임 할 사람 찾습니다! 몸만 오세요~~",
                      group_img: "http://magazine.hankyung.com/magazinedata/images/photo/201707/c3667962b7df3ae222a3306d4d59fc6f.jpg"
                  }
              }, 
              {
                  id:7,
                  groupInfo: {
                      title : "보드게임 해염",
                      location : "경기도 용인시",
                      detail : "저랑 같이 보드게임 할 사람 찾습니다! 몸만 오세요~~",
                      group_img: "http://magazine.hankyung.com/magazinedata/images/photo/201707/c3667962b7df3ae222a3306d4d59fc6f.jpg"
                  }
              }
          ]
      }
  },
  created(){
      this.$http.get('http://localhost:3000/board/list/') // +page..?
        .then((result)=>{
            var data = result.data;
            this.groupList = [];
            for(var i =0;i<data.length;i++){
                var post = {
                    id: data[i].category_id,
                    groupInfo: {
                        title: data[i].title,
                        location: data[i].location,
                        detail: data[i].detail,
                        group_img: data[i].images[0].img_path
                    }
                };
                this.groupList.push(post);
            }
        })
  },
  mounted(){
      this.getCategoryList();
  },
  methods: {
       getPostData (currentPage) {
           
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
                this.$http.get('http://localhost:3000/category/sub')
                .then((result) => {
                    // get category list
                    for(var i=0; i<result.data.length; i++) {
                            var categoryOption = '{"value" : "' + i + '", "text" : "'+ result.data[i].name+'"}';
                            vm.categoryList1.push(JSON.parse(categoryOption));
                    }

                    // get sub category list
                    for(var i=0; i<result.data.length; i++) {
                        var categoryOption = [];
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
