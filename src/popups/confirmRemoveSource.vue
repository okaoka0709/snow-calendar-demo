<template>
    <form class="g pop-up-inner" @submit.prevent="register">
        <div class="md toggle-aside">
            <a title="close" @click.prevent="close"></a>
        </div>
        <div class="md caption">
            <a>remove Calendar</a>
        </div>
        <div class="g pop-up-content">
            <div class="md">
                <span>It will remove all of the calendar's event, are you sure?</span>
            </div>
        </div>
        <div class="md btn-list">
            <ul>
                <li><a class="btn is-premary" @click.prevent="remove">confirm</a></li>
                <li><a class="btn" @click.prevent="close">cancel</a></li>
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
