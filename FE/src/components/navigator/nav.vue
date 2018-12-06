
<template>

  <div id="parentx">

    <vs-button @click="active=!active" color="Secondary" type="filled">Category</vs-button>
    <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">
      <div v-for="category in categoryList">
        <vs-divider position="left" >
          {{category.name}}
        </vs-divider>
        <vs-sidebar-item v-for="(sub,index) in category.sub_category" :index='sub._id' href="/party/list"> 
          {{sub.value}}
        </vs-sidebar-item>
      </div>
    </vs-sidebar>
  </div>

</template>

<script>
// pary/list/:category 
// parameter 추가 필요

export default {
  data:()=>({
    active:false,
    categoryList: [
    ],
  }),
  methods: {
       getCategory () {
           var vm = this
           this.$http.get('http://localhost:3000/category')
           .then((result) => {
               vm.categoryList = result.data
           })
        }
    },
    mounted() {
        this.getCategory()
    }
}
</script>

<style lang="stylus">
.header-sidebar
  display flex
  align-items center
  justify-content center
  flex-direction column
  width 100%
  h4
    display flex
    align-items center
    justify-content center
    width 100%
    > button
      margin-left 10px
.footer-sidebar
  display flex
  align-items center
  justify-content space-between
  width 100%
  > button
      border 0px solid rgba(0,0,0,0) !important
      border-left 1px solid rgba(0,0,0,.07) !important
      border-radius 0px !important
</style>