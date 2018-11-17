<template>
    <div id="app">
        <detailParty></detailParty>
    </div>
</template>

<script>
    import detailParty from './components/detailParty'

    export default {
        name: 'app',
        components: {
            detailParty
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
