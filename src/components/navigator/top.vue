<template>
  <div class="top">
    <b-navbar toggleable="md" type="dark" variant="secondary">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="/">
        ConnectPnP
      </b-navbar-brand>
      <sidebar></sidebar>
      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <b-img class="profileImg" rounded="circle" width="40px" stype="margin-right:5px" :src="profile_path" />
              <em>  {{user_name}}</em>
            </template>
            <b-dropdown-item href="/">MyPage</b-dropdown-item>
            <b-dropdown-item href="/">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import topItem from './topItem';
  import sidebar from './nav';
  export default {
    name: 'top',
    components: { topItem , sidebar},
    props: {
        user_name : {
          type: String,
          default() { return "hyeon";}
        }, 
        profile_path : {
          type: String,
          default() { return "https://tistory1.daumcdn.net/tistory/user/1122646/profile/profileImg?v=1537856192204";}
        }
    },
  }
  
</script>

<style scoped>
  .top {
    padding-bottom : 30px;
  }
</style>
