<template>
    <div>

        {{ cookielist }}

    </div>
</template>



<script>

export default {
  name: 'recentGroup',
  components: {
    
  },
  data() {
    return {
      cookielist: [], // 문자열 길어지면 튀어나감..
    }
  },
  methods: {
      getRecentGroup() {
        //getcookie 해서 받아온거로 // axios로 그룹 정보 받아와서 보여주기
        this.cookielist = this.$cookies.keys();
        console.log(this.cookielist);

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
  border: 1px solid rgb(150, 150, 150);
  border-radius:10px 10px 10px 10px;
  padding: 15px;
  margin: 5px;
  background-color: #fff;
}

.sidebar {
  height: 50vh;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

</style>

