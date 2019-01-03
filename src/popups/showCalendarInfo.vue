<template>
    <form class="g pop-up-inner" @submit.prevent="register">
        <div class="md toggle-aside">
            <a title="關閉" @click.prevent="close"></a>
        </div>
        <div class="md caption">
            <a>瀏覽日曆事件</a>
        </div>
        <div class="g pop-up-content">
            <div class="md minor-table">
                <table>
                    <tbody>
                        <tr>
                            <th><label>事件名稱</label></th>
                            <td>{{ content.node.sub }}</td>
                        </tr>
                        <tr >
                            <th><label>開始時間</label></th>
                            <td>{{ timeFormatter(content.node.startTime) }}</td>
                        </tr>
                        <tr>
                            <th><label>結束時間</label></th>
                            <td>{{ timeFormatter(content.node.endTime) }}</td>
                        </tr>
                        <tr v-if="content.node.desc">
                            <th><label>敘述</label></th>
                            <td v-html="content.node.desc"></td>
                        </tr>
                        <tr v-if="content.node.cal">
                            <th><label>歸屬</label></th>
                            <td v-html="cal.sub"></td>
                        </tr>
                        <tr v-if="content.node.location">
                            <th><label>地點</label></th>
                            <td>{{ content.node.location }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="md btn-list">
            <ul>
                <li v-if="cal.editable"><a class="btn is-premary icon-font create" @click.prevent="edit">編輯</a></li>
                <li v-if="cal.editable"><a class="btn is-danger icon-font delete" @click.prevent="remove">刪除</a></li>
                <li><a class="btn" @click.prevent="close">確定</a></li>
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
        computed: {
            cal: function(){
                let $cal = this.content.extend.source.find(cal => { return cal.sn === this.content.node.cal});

                return $cal;
            }
        },
        methods: {
            timeFormatter: function(obj){
                let _noon = '上午';

                let _year = obj.year,
                    _month = obj.month,
                    _date = obj.date,
                    _hour = obj.hour,
                    _minutes = obj.minutes;

                if( _hour === 12 ){
                    _noon = '下午';
                }else if( _hour > 12 ){
                    _hour -= 12;
                    _noon = '下午';
                }

                _minutes = this.$okaTool.doubleCount(_minutes);

                return _year +'/'+ _month +'/'+ _date +' '+ _noon + _hour +':'+ _minutes +':00'
            },
            edit: function(){
                this.content.extend.editEvent(this.content.node);
            },
            remove: function(){
                this.content.extend.removeEvent({
                    sn: this.content.node.sn
                }, true);

                this.close();
            },
            close: function(_key){
                this.$emit('sendEvent', 'clearPopUp');
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
