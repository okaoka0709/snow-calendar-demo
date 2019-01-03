<template>
    <transition name="animate">
        <notification v-if="type === 'notification'" :content="content" :sn="sn" @sendEvent="receiveEvent"></notification>
    </transition>
</template>

<script>
    import notification from '@/notification/notification'

    import { mapMutations } from 'vuex'

    export default {
        components: {
            notification
        },
        props: {
            type: {
                require: true
            },
            sn: {
                require: true
            },
            content: { //依照模板定義
                require: false
            }
        },
        methods: {
            ...mapMutations([
                'clearNotification'
            ]),
            receiveEvent: function(){ //將收到的方法，推送給其他方法執行
                this.$okaTool.receiveEvent(this, arguments);
            }
        }
    }
</script>

<style scoped lang="scss">
    .animate-enter-active {
        animation: animate-in .3s;
    }

    .animate-leave-active {
        animation: animate-out .2s;
    }

    @keyframes animate-in {
        0% {
            transform: translateY(60px);
            opacity: 0;
        }

        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes animate-out {
        0% {
            transform: translateY(0);
            opacity: 1;
        }

        100% {
            transform: translateY(-60px);
            opacity: 0;
        }
    }
</style>
