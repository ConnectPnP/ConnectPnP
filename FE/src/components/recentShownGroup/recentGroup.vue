<template>
    <div class="listbody">

      <span v-if="cookielist.length != 0">
        <div class="nonempty">최근 본 그룹</div>
      </span>

      <span v-if="cookielist.length == 0">
        <div class="empty">최근 본 그룹이 없습니다!</div>
      </span>

      <span v-for="cookie in cookielist.reverse().slice(0,3)" :key="cookie.id">
        <RecentView 
        v-bind:groupTitle = cookie.title
        v-bind:groupId = cookie.id 
        v-bind:groupImg = cookie.image />
      </span>

      

    </div>
</template>



<script>
import RecentView from './recentView.vue'

export default {
  name: 'recentGroup',
  components: {
    RecentView,
  },
  data() {
    return {
      cookielist: [], // 문자열 길어지면 튀어나감..
    }
  },
  methods: {
      getRecentGroup() {
        //getcookie 해서 받아온거로 // axios로 그룹 정보 받아와서 보여주기
        var list = this.$cookies.keys();
        for(var i=0; i<list.length; i++){
          if(list[i].indexOf("recentGroup") == 0){
            this.cookielist.push(this.$cookies.get(list[i]));
          }
        }
        // this.cookielist.reverse().slice(0,3);
        // console.log(this.cookielist.reverse().slice(0,3))
      },
  },
  mounted(){
      this.getRecentGroup();
  }
}
</script>



<style>
.wrapper {
  display: flex;
  justify-content: space-between;
}

.sidebar {
  width: 150px;
  border: 1px solid rgb(180, 180, 180);
  border-radius:10px 10px 10px 10px;
  padding: 15px;
  margin: 5px;
  background-color: #fff;
}

.sidebar {
  height: 420px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.listbody {
  text-align: center
}

.empty {
  font-size: 10px;
  color: rgb(180, 180, 180);
}

.nonempty {
  font-size: 12px;
  color: rgb(120, 120, 120);
}

</style>

