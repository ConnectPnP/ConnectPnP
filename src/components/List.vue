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

<div class="margin">
    <div class="row" v-for="i in Math.ceil(groupList.length / 2)">
    <span v-for="group in groupList.slice((i-1)*2,i*2)">
        <ListView v-bind:groupTitle=group.groupInfo.title v-bind:groupLocation=group.groupInfo.location
            v-bind:groupContent=group.groupInfo.content v-bind:groupImg=group.groupInfo.group_img />
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
    ListView
  },
  data(){
      return {
          currentPage: 1,
          groupList : [
              {
                  id:1,
                  groupInfo: {
                      title : "보드게임 하쟈",
                      location : "경기도 용인시",
                      content : "저랑 같이 보드게임 할 사람 찾습니다! 몸만 오세요~~",
                      group_img: "http://magazine.hankyung.com/magazinedata/images/photo/201707/c3667962b7df3ae222a3306d4d59fc6f.jpg"
                  }
              }, 
              {
                  id:2,
                  groupInfo: {
                      title : "노래방 기기",
                      location : "아주대학교 판타스틱 코인노래방",
                      content : "저랑 듀엣할분 구함니다,,,",
                      group_img: "https://github.com/Eumji/Seoul-Bammm-v2/blob/master/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png?raw=true"
                  }
              }, 
              {
                  id:3,
                  groupInfo: {
                      title : "무선마이크 공구",
                      location : "모름",
                      content : "무선마이크가 너무 사고싶은데 좀 비싸네여... 같이 공구해요!",
                      group_img: "http://i.011st.com/ex_t/R/400x400/1/85/0/src/pd/17/5/3/4/8/3/5/LxXLR/1784534835_B.jpg"
                  }
              }, 
              {
                  id:4,
                  groupInfo: {
                      title : "로떼월드 단체할인 받아오",
                      location : "로떼월드",
                      content : "로떼월드 너무 비싸오 같이 단체할인 받아오",
                      group_img: "http://adventure.lotteworld.com/common/images/logo.png"
                  }
              },
              {
                  id:5,
                  groupInfo: {
                      title : "보드게임 하자구",
                      location : "경기도 용인시",
                      content : "저랑 같이 보드게임 할 사람 찾습니다! 몸만 오세요~~",
                      group_img: "http://magazine.hankyung.com/magazinedata/images/photo/201707/c3667962b7df3ae222a3306d4d59fc6f.jpg"
                  }
              }, 
              {
                  id:6,
                  groupInfo: {
                      title : "보드게임 하쟈하쟈",
                      location : "경기도 용인시",
                      content : "저랑 같이 보드게임 할 사람 찾습니다! 몸만 오세요~~",
                      group_img: "http://magazine.hankyung.com/magazinedata/images/photo/201707/c3667962b7df3ae222a3306d4d59fc6f.jpg"
                  }
              }, 
              {
                  id:7,
                  groupInfo: {
                      title : "보드게임 해염",
                      location : "경기도 용인시",
                      content : "저랑 같이 보드게임 할 사람 찾습니다! 몸만 오세요~~",
                      group_img: "http://magazine.hankyung.com/magazinedata/images/photo/201707/c3667962b7df3ae222a3306d4d59fc6f.jpg"
                  }
              }
          ]
      }
  },
  methods: {
       getPostData (currentPage) {
           
        }
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
