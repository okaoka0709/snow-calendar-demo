<template>
    <form class="g pop-up-inner" @submit.prevent="register">
        <div class="md toggle-aside">
            <a title="關閉" @click.prevent="close"></a>
        </div>
        <div class="md caption">
            <a>刪除日曆本</a>
        </div>
        <div class="g pop-up-content">
            <div class="md">
                <span>這會一併移除該月曆的所有事件，確定嗎?</span>
            </div>
        </div>
        <div class="md btn-list">
            <ul>
                <li><a class="btn is-premary" @click.prevent="remove">確定</a></li>
                <li><a class="btn" @click.prevent="close">取消</a></li>
            </ul>
        </div>
    </form>
</template>

<script>
    export default {
        props: {
            content: {
                type: Object,
                require: true
            }
        },
        methods: {
            remove: function(){
                this.content.extend.removeSource(this.content.node);
                this.closeAll();
            },
            closeAll: function(_key){
                this.$emit('sendEvent', 'clearPopUp', 'all');
            },
            close: function(_key){
                this.$emit('sendEvent', 'clearPopUp');
            }
        }
    }
</script>

<style scoped lang="scss">
    textarea {
        min-height: 60px;
    }
</style>
