<template>
    <div id="app">
        <top/>
        <div class="wrapper">
            <div style="width: 90%">
                <router-view></router-view>
            </div>
            <div>
                <recentGroup class="sidebar"></recentGroup>
            </div>
        </div>
        <chatLauncher class="chat" v-if="loginStatus"></chatLauncher>
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
                var session_status = this.$session.get('loginStatus');
                if (session_status == 'login') {
                    return true
                } else {
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
    }
</style>
