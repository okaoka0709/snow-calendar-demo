<template>
    <div class="g tool-tip-inner">
        <div v-if="content.caption" class="md caption">
            <a>{{ content.caption }}</a>
        </div>
        <div class="g tool-tip-content">
            <div class="g tool-tip-content-inner">
                <div :style="style" v-html="content.html"></div>
            </div>
        </div>
        <!-- <div class="md btn-list">
            <ul>
                <li><a class="btn is-premary">確定</a></li>
            </ul>
        </div> -->
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
                }else {
                    $style.width = '142px';
                }

                if(this.content.height){
                    $style.height = this.content.height +'px';
                }

                return $style;
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
