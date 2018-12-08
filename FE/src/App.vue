<template>
    <div id="app">
        <top :login_status="loginStatus"/>
        <router-view></router-view>
        <chatLauncher class="chat" v-if="loginStatus"></chatLauncher>
        <div>
            <recentGroup class="sidebar"></recentGroup>
        </div>
    </div>
</template>

<script>
    import top from '@/components/navigator/top'
    import chatLauncher from '@/components/chat/content/Launcher'
    import recentGroup from '@/components/recentShownGroup/recentGroup'

    export default {
        name: 'app',
        components: {
            top,
            chatLauncher,
            recentGroup,
        },

        computed: {
            //현재 로그인 상태 확인. 로그인/ 로그아웃시 보여져야하는 UI 조정.
            loginStatus() {
                var cookie_status = this.$cookie.get('loginStatus');
                console.log("loginStatus>>" + cookie_status);
                if (cookie_status == 'login') {
                    console.log(cookie_status == 'login');
                    return true
                } else {
                    console.log(cookie_status == 'login');
                    return false
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
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
