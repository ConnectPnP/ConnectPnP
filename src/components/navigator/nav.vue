<template>

  <div id="parentx">

    <vs-button @click="active=!active" color="Secondary" type="filled">Category</vs-button>
    <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">
      <div v-for="category in categoryList">
        <vs-divider position="left">
            {{category.category_name}}
        </vs-divider>
        <vs-sidebar-item v-for="(sub,index) in category.sub_category" :index='sub.id' >
            {{sub.category_name}}
        </vs-sidebar-item>
      </div>
    </vs-sidebar>
  </div>

</template>

<script>


export default {
  data:()=>({
    active:false,
    categoryList: [
      {
        id : 1,
        category_name : '게임',
        sub_category : [
          {
            id : 101,
            category_name : '보드게임',
          },
          {
            id : 102,
            category_name : '방탈출',
          },
          {
            id : 103,
            category_name : 'e-Sport',
          }
        ],
      },
      {
        id : 2,
        category_name : '여가활동',
        sub_category : [
          {
            id : 201,
            category_name : '여가활동1',
          },
          {
            id : 202,
            category_name : '여가활동2',
          },
          {
            id : 203,
            category_name : '여가활동3',
          }
        ],
      },
    ],
  })
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