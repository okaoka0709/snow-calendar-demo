<template>
    <div
        class="md notification"
        :class="status"
        @mouseenter="clearTimer"
        @mouseleave="addTimer"
    >
        <div class="toggle">
            <a @click.prevent="close"></a>
        </div>
        <div class="content">
            {{content.html}}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            sn: {
                require: true
            },
            content: {
                type: Object,
                require: true
            }
        },
        data: function(){
            return {
                timer: null,
                delay: 0
            }
        },
        computed: {
            status: function(){
                if( this.content.status ){
                    return 'is-'+ this.content.status;
                }else {
                    return 'is-success';
                }
            }
        },
        methods: {
            close: function(_key){
                this.clearTimer();
                this.$emit('sendEvent', 'clearNotification', this.sn);
            },
            clearTimer: function(){
                if( this.delay !== 0 ){
                    clearTimeout(this.timer);
                }
            },
            addTimer: function(){
                if( this.delay !== 0 ){

                    this.clearTimer();

                    this.timer = setTimeout(() => {
                        this.close()
                    }, this.delay);
                }
            }
        },
        created: function(){
            if( this.content.delay !== undefined && typeof this.content.delay === 'number' ){ //設定為 0 的話...一輩子都不會自動修除
                this.delay = this.content.delay;
            }else {
                this.delay = 3000;
            }

            this.addTimer();
        }
    }
</script>

<style scoped lang="scss">

</style>
