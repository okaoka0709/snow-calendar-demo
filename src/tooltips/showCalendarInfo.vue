<template>
    <div class="g tool-tip-inner">
        <div v-if="content.caption" class="md caption">
            <a>{{ content.caption }}</a>
        </div>
        <div class="g tool-tip-content">
            <div class="g tool-tip-content-inner">
                <div><label>title:</label><span>{{ content.sub }}</span></div>
                <div><label>start time:</label><span>{{ dateFormatter(content.startTime) }}</span></div>
                <div><label>end time:</label><span>{{ dateFormatter(content.endTime) }}</span></div>
                <div v-if="content.desc"><label>discripton:</label><span>{{ content.desc }}</span></div>
                <div v-if="content.location"><label>location:</label><span>{{ content.location }}</span></div>
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
                let _noon = 'am';

                let _month = time.month,
                    _date = time.date,
                    _hour = time.hour,
                    _minutes = time.minutes;

                if( _hour === 12 ){
                    _noon = 'pm';
                }else if( _hour > 12 ){
                    _hour -= 12;
                    _noon = 'pm';
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
