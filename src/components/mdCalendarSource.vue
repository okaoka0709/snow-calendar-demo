<template>
    <div class="md calendar-source">
        <ul class="func">
            <li><a class="btn icon-font add" @click.prevent.stop="addSource">日曆</a></li>
            <li><a class="btn icon-font insert_drive_file" @click.prevent.stop="importSource">匯入</a></li>
        </ul>
        <ul class="list">
            <li
                is="cpCalendarSource"
                v-for="cal in source"
                :cal="cal"
                :key="'source'+ cal.sn"
                @sendEvent="receiveEvent"
            ></li>
        </ul>
    </div>
</template>

<script>
    import cpCalendarSource from '@/components/cpCalendarSource'

    export default {
        components: {
            cpCalendarSource
        },
        props: {
            source: {
                require: true
            }
        },
        methods: {
            receiveEvent: function(){ //將收到的方法，推送給其他方法執行
                this.$okaTool.receiveEvent(this, arguments);
            },
            addSource: function(){
                this.$emit('sendEvent', 'addSource');
            },
            importSource: function(type){
                this.$emit('sendEvent', 'importSource');
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
