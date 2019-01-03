<template>
    <div class="g pop-up-inner">
        <div class="md toggle-aside">
            <a title="關閉" @click.prevent="close"></a>
        </div>
        <div class="md caption">
            <a>提示</a>
        </div>
        <div class="g pop-up-content">
            <div class="g pop-up-content-inner">
                <div :style="style" v-html="content.html"></div>
            </div>
        </div>
        <div class="md btn-list">
            <ul>
                <li><a class="btn is-premary" @click.prevent="close">確定</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            content: {
                type: Object,
                require: true
            }
        },
        computed: {
            style: function(){
                let $style = {};

                if(this.content.width){
                    $style.width = this.content.width +'px';
                }

                if(this.content.height){
                    $style.height = this.content.height +'px';
                }

                return $style;
            }
        },
        methods: {
            close: function(_key){
                this.$emit('sendEvent', 'clearPopUp');
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
