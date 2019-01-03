<template>
    <transition name="animate">
        <div class="g pop-up">
            <alert v-if="type === 'alert'" :content="content" @sendEvent="receiveEvent"></alert>
            <showCalendarInfo v-if="type === 'showCalendarInfo'" :content="content" @sendEvent="receiveEvent"></showCalendarInfo>
            <editCalendarEvent v-if="type === 'editCalendarEvent'" :content="content" @sendEvent="receiveEvent"></editCalendarEvent>
            <editCalendarSource v-if="type === 'editCalendarSource'" :content="content" @sendEvent="receiveEvent"></editCalendarSource>
            <confirmRemoveSource v-if="type === 'confirmRemoveSource'" :content="content" @sendEvent="receiveEvent"></confirmRemoveSource>
        </div>
    </transition>
</template>

<script>
    import alert from '@/popups/alert'
    import showCalendarInfo from '@/popups/showCalendarInfo'
    import editCalendarEvent from '@/popups/editCalendarEvent'
    import editCalendarSource from '@/popups/editCalendarSource'
    import confirmRemoveSource from '@/popups/confirmRemoveSource'

    import { mapMutations } from 'vuex'

    export default {
        components: {
            alert,
            showCalendarInfo,
            editCalendarEvent,
            editCalendarSource,
            confirmRemoveSource
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
                'clearPopUp'
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
            transform: scale(1.1);
            opacity: 0;
        }

        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes animate-out {
        0% {
            transform: scale(1);
            opacity: 1;
        }

        100% {
            transform: scale(1.1);
            opacity: 0;
        }
    }
</style>
