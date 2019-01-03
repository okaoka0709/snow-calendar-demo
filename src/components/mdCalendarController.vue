<template>
    <div class="md calendar-controller">
        <div class="date-selector">
            <a class="prevMonth btn is-premary icon-font chevron_left icon-font-only" title="上一則" @click.prevent="getAway('prev')"></a>
            <span v-if="mode === 'year'" class="thisMonth">{{ mainCal.year }}</span>
            <span v-else class="thisMonth">{{ mainCal.year }}/{{ mainCal.month }}</span>
            <a class="nextMonth btn is-premary icon-font chevron_right icon-font-only" title="下一則" @click.prevent="getAway('next')"></a>
            <select :value="mode" @change="changeMode">
                <option value="date">天</option>
                <option value="week">週</option>
                <option value="month">月</option>
                <option value="year">年</option>
                <option value="event">事件</option>
                <option value="4days">4天</option>
            </select>
        </div>
        <div class="calendar-btns">
            <ul>
                <li class="change-toToday"><a class="btn is-info icon-font today" @click.prevent="backToToday">今天</a></li>
                <li class="add-event"><a class="btn is-success icon-font add" @click.prevent="addEvt">行程</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            mainCal: {
                require: true
            },
            mode: {
                require: true
            },
            today: {
                require: true
            }
        },
        methods: {
            getAway: function(way){ //判斷方向並取回設定的時間
                this.$emit('sendEvent', 'computedCal', {
                    cal: 'main',
                    way: way
                });
            },
            changeMode: function(evt){
                this.$emit('sendEvent', 'updateMode', evt.target.value);
            },
            backToToday: function(){
                this.$emit('sendEvent', 'updateCal', {
                    cal: 'main',
                    data: this.today
                });
            },
            addEvt: function(){
                let $time = new Date(),
                    _year = $time.getFullYear(),
                    _month = $time.getMonth() + 1,
                    _date = $time.getDate(),
                    _hour = $time.getHours(),
                    _minutes = $time.getMinutes();

                this.$emit('sendEvent', 'addEvent', {
                    year: _year,
                    month: _month,
                    date: _date,
                    hour: _hour,
                    minutes: _minutes
                }, 'hour');
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
