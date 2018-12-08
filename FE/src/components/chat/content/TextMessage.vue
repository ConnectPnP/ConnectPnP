<template>
    <div class="sc-message--text" :style="messageColors">
        <p v-html="messageText"></p>
    </div>
</template>

<script>
    import escapeGoat from 'escape-goat'
    import Autolinker from 'autolinker'

    const fmt = require('msgdown')

    export default {
        props: {
            data: {
                type: Object,
                required: true
            },
            messageColors: {
                type: Object,
                required: true
            },
            messageStyling: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            messageText() {
                const escaped = escapeGoat.escape(this.data.content)

                return Autolinker.link(this.messageStyling ? fmt(escaped) : escaped, {
                    className: 'chatLink',
                    truncate: {length: 50, location: 'smart'}
                })
            }
        }
    }
</script>

<style scoped>
    a.chatLink {
        color: inherit !important;
    }
</style>
