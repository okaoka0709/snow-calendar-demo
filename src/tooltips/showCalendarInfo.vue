<template>
    <div class="g tool-tip-inner">
        <div v-if="content.caption" class="md caption">
            <a>{{ content.caption }}</a>
        </div>
        <div class="g tool-tip-content">
            <div class="g tool-tip-content-inner">
                <div><label>名稱:</label><span>{{ content.sub }}</span></div>
                <div><label>開始:</label><span>{{ dateFormatter(content.startTime) }}</span></div>
                <div><label>結束:</label><span>{{ dateFormatter(content.endTime) }}</span></div>
                <div v-if="content.desc"><label>敘述:</label><span>{{ content.desc }}</span></div>
                <div v-if="content.location"><label>地點:</label><span>{{ content.location }}</span></div>
            </div>
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
        methods: {
            dateFormatter: function(time){
                let _noon = '上午';

                let _month = time.month,
                    _date = time.date,
                    _hour = time.hour,
                    _minutes = time.minutes;

                if( _hour === 12 ){
                    _noon = '下午';
                }else if( _hour > 12 ){
                    _hour -= 12;
                    _noon = '下午';
                }

                _minutes = this.$okaTool.doubleCount(_minutes);

                return _month +'/'+ _date +' '+ _noon + _hour +':'+ _minutes
            },
            hourFormatter: function(hour){
                return Math.round(hour)
            }
        }
    }
</script>

<style scoped lang="scss">

    .tool-tip-content-inner {

        > div {
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        label {
            margin: 3px;
        }
    }
</style>
