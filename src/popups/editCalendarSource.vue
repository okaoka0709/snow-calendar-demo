<template>
    <form class="g pop-up-inner" @submit.prevent="register">
        <div class="md toggle-aside">
            <a title="close" @click.prevent="close"></a>
        </div>
        <div class="md caption">
            <a>edit calendar</a>
        </div>
        <div class="g pop-up-content">
            <div class="md form-table">
                <table>
                    <tr>
                        <th><label for="sub">title</label></th>
                        <td>
                            <div class="cp input text" :class="[errors.has('sub')? 'is-error': '']" :data-error="errors.first('sub')">
                                <input v-if="editable" v-model="sub" type="text" v-validate="'required'" name="sub" id="sub">
                                <input v-else :value="sub" type="text" disabled>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="desc">editable</label></th>
                        <td>
                            <span v-if="editable">allow</span>
                            <span v-else>deny</span>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="color">color</label></th>
                        <td>
                            <div class="cp input color" :class="[errors.has('color')? 'is-error': '']" :data-error="errors.first('color')">
                                <input v-if="editable" v-model="color" type="color" v-validate="'required'" name="color" id="color">
                                <input v-else :value="color" type="color" disabled>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="desc">discription</label></th>
                        <td>
                            <textarea v-if="editable" v-model="desc" id="desc"></textarea>
                            <textarea v-else :value="desc" disabled></textarea>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="md btn-list">
            <ul>
                <li v-if="editable"><a class="btn is-premary" @click.prevent="edit">confirm</a></li>
                <li v-if="editable"><a class="btn is-danger" @click.prevent="remove">remove</a></li>
                <li><a class="btn" @click.prevent="close">cancel</a></li>
            </ul>
        </div>
    </form>
</template>

<script>
    import { Validator } from 'vee-validate'

    Validator.extend('isAfter', (endTime, [startTime]) => { //驗證結束時間必須在開始時間之後
        let $startTime = new Date(startTime),
            $endTime = new Date(endTime);

        if( $endTime >= $startTime ){
            return true;
        }else {
            return false;
        }
    }, {
        hasTarget: true
    });

    export default {
        props: {
            content: {
                type: Object,
                require: true
            }
        },
        data: function(){
            return {
                sn: null,
                sub: null,
                color: null,
                desc: null,
                editable: null
            }
        },
        methods: {
            edit: function(){

                this.$validator.validate().then(result => {
                    if (!result){
                        console.log('沒通過');
                    }else {
                        this.content.extend.updateSource({
                            sn: this.sn,
                            sub: this.sub,
                            desc: this.desc,
                            color: this.color,
                            active: true,
                            editable: true
                        });

                        this.close();
                    }
                });
            },
            remove: function(){
                this.content.extend.confirmRemoveSource({
                    sn: this.sn
                });
            },
            close: function(_key){
                this.$emit('sendEvent', 'clearPopUp');
            }
        },
        created: function(){ //先把綁進來的資料格式化到 date
            let $node = this.content.node;

            this.sub = $node.sub;
            this.color = $node.color;
            this.desc = $node.desc;
            this.editable = $node.editable;
            this.sn = $node.sn;
        }
    }
</script>

<style scoped lang="scss">
    textarea {
        min-height: 60px;
    }
</style>
