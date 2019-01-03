<template>
    <div class="md calendar-mini">
        <div class="calendar-selector">
            <a class="prevMonth btn icon-font chevron_left icon-font-only" title="上一則" @click.prevent="getAway('prev')"></a>
            <span class="thisMonth">{{ refCal.year }}/{{ refCal.month }}</span>
            <a class="nextMonth btn icon-font chevron_right icon-font-only" title="下一則" @click.prevent="getAway('next')"></a>
        </div>
        <div class="calendar-day">
            <div class="week">
                <div class="title">
                    <div>一</div>
                    <div>二</div>
                    <div>三</div>
                    <div>四</div>
                    <div>五</div>
                    <div>六</div>
                    <div>日</div>
                </div>
            </div>
            <cpCalendarMiniWeek
                v-for="n in 6"

                :mainCal="mainCal"
                :obj="obj.week[n - 1]"
                :today="today"
                :weeksn="monthsn +'week'+ n"
                :key="monthsn +'week'+ n"

                @sendEvent="receiveEvent"
            ></cpCalendarMiniWeek>
        </div>
    </div>
</template>

<script>
    import cpCalendarMiniWeek from '@/components/cpCalendarMiniWeek'

    export default {
        components: {
            cpCalendarMiniWeek
        },
        props: {
            refCal: {
                require: true
            },
            mainCal: {
                require: true
            },
            obj: {
                require: true
            },
            today: {
                require: true
            },
            monthsn: {
                require: true
            }
        },
        methods: {
            getAway: function(way){ //判斷方向並取回設定的時間
                this.$emit('sendEvent', 'computedCal', {
                    cal: 'ref',
                    way: way
                });
            },
            receiveEvent: function(){ //將收到的方法，推送給其他方法執行
                this.$okaTool.receiveEvent(this, arguments);
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
