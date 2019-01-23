<template>
    <form class="g pop-up-inner" @submit.prevent="register">
        <div class="md toggle-aside">
            <a title="close" @click.prevent="close"></a>
        </div>
        <div class="md caption">
            <a>edit event</a>
        </div>
        <div class="g pop-up-content">
            <div class="md form-table">
                <table>
                    <tr>
                        <th><label for="sub">title</label></th>
                        <td>
                            <div class="cp input text" :class="[errors.has('sub')? 'is-error': '']" :data-error="errors.first('sub')">
                                <input v-model="sub" type="text" v-validate="'required'" name="sub" id="sub">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="allDate">all day</label></th>
                        <td>
                            <div class="cp input checkbox">
                                <input v-model="allDate" type="checkbox" id="allDate" @change="setTime">
                                <label for="allDate"></label>
                            </div>
                        </td>
                    </tr>
                    <tr >
                        <th><label for="startTime">start time</label></th>
                        <td>
                            <div class="cp input date" :class="[errors.has('startTime')? 'is-error': '']" :data-error="errors.first('startTime')">
                                <input :type="timeType" v-validate="'required'" :value="startTimeComputed" @change="timeToObj($event, 'startTime')" name="startTime" ref="startTime" id="startTime">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="endTime">end time</label></th>
                        <td>
                            <div class="cp input date" :class="[errors.has('endTime')? 'is-error': '']" :data-error="errors.first('endTime')">
                                <input :type="timeType" v-validate="'required|isAfter:startTime'" :value="endTimeComputed" @change="timeToObj($event, 'endTime')" name="endTime" ref="endTime" id="endTime">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="cal">calendar</label></th>
                        <td>
                            <select v-model="cal">
                                <option v-for="cal in editableCals" :value="cal.sn" :key="'Cal-'+ cal.sn">{{ cal.sub }}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="location">location</label></th>
                        <td>
                            <div class="cp input text">
                                <input type="text" v-model="location" id="location">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="desc">discription</label></th>
                        <td><textarea v-model="desc" id="desc"></textarea></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="md btn-list">
            <ul>
                <li><a class="btn is-premary" @click.prevent="edit">confirm</a></li>
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
                allDate: false,
                sn: null,
                sub: null,
                startTime: null,
                endTime: null,
                location: null,
                cal: null,
                desc: null
            }
        },
        computed: {
            timeType: function(){
                let _allDate = this.allDate;

                if(_allDate){
                    return 'date';
                }else {
                    return 'datetime-local';
                }
            },
            startTimeComputed: function(){
                return this.timeToString(this.startTime, this.allDate);
            },
            endTimeComputed: function(){
                return this.timeToString(this.endTime, this.allDate);
            },
            editableCals: function(){ //可編輯的日曆
                let $source = this.content.extend.source.filter(item => {
                    return item.editable === true
                })

                return $source;
            }
        },
        methods: {
            setTime: function(){
                let $time = null;

                if( this.allDate ){
                    $time = this.content.extend.computedTime(this.startTime, {
                        date: 1
                    });
                }else {
                    $time = this.content.extend.computedTime(this.startTime, {
                        hour: 1
                    });
                }

                this.$set(this, 'endTime', $time);
            },
            timeDifference: function(time1, time2){
                return Math.abs(new Date(time1) - new Date(time2));
            },
            timeToString: function(obj, allDate){
                let _year = obj.year,
                    _month = obj.month,
                    _date = obj.date,
                    _hour = obj.hour,
                    _minutes = obj.minutes;

                let _result = null;

                if( _year == 0 && _month == 0 && _date == 0 && _hour == 0 && _minutes == 0 ){
                    _result = '';
                }else {
                    _result = _year +'-'+ this.$okaTool.doubleCount(_month) +'-'+ this.$okaTool.doubleCount(_date);

                    if( !allDate ){
                        _result = _result +'T'+ this.$okaTool.doubleCount(_hour) +':'+ this.$okaTool.doubleCount(_minutes)
                    }
                }

                return _result;
            },
            timeToObj: function(e, data){
                let _val = e.target.value;

                if( _val === '' ){
                    this[data].year = 0;
                    this[data].month = 0;
                    this[data].date = 0;
                    this[data].hour = 0;
                    this[data].minutes = 0;
                }

                let $val = _val.split(/\-|T|:/g);

                this[data].year = parseInt($val[0]);
                this[data].month = parseInt($val[1]);
                this[data].date = parseInt($val[2]);

                if( $val[3] ){
                    this[data].hour = parseInt($val[3]);
                }

                if( $val[4] ){
                    this[data].minutes = parseInt($val[4]);
                }
            },
            edit: function(){
                let _startYear = this.startTime.year,
                    _startMonth = this.startTime.month,
                    _startDate = this.startTime.date,
                    _startHour = this.startTime.hour,
                    _startMinutes = this.startTime.minutes,
                    _endYear = this.endTime.year,
                    _endMonth = this.endTime.month,
                    _endDate = this.endTime.date,
                    _endHour = this.endTime.hour,
                    _endMinutes = this.endTime.minutes;

                if( this.allDate ){
                    _startHour = 0;
                    _startMinutes = 0;
                    _endHour = 0;
                    _endMinutes = 0;
                }

                this.$validator.validate().then(result => {
                    if (!result){
                        console.log('沒通過');
                    }else {
                        this.content.extend.updateEvent({
                            startTime: {
                                year: _startYear,
                                month: _startMonth,
                                date: _startDate,
                                hour: _startHour,
                                minutes: _startMinutes
                            },
                            endTime: {
                                year: _endYear,
                                month: _endMonth,
                                date: _endDate,
                                hour: _endHour,
                                minutes: _endMinutes
                            },
                            sn: this.sn,
                            sub: this.sub,
                            desc: this.desc,
                            cal: this.cal,
                            location: this.location
                        }, true);

                        this.closeAll();
                    }
                });
            },
            closeAll: function(_key){
                this.$emit('sendEvent', 'clearPopUp', 'all');
            },
            close: function(_key){
                this.$emit('sendEvent', 'clearPopUp');

                if( this.content.extend.close ){
                    this.content.extend.close();
                }
            }
        },
        created: function(){ //先把綁進來的資料格式化到 date
            let $node = this.content.node,
                $startTime = $node.startTime,
                $endTime = $node.endTime;

            let _allDate = false;

            if( $startTime.hour === 0 && $startTime.minutes === 0 && $endTime.hour === 0 && $endTime.minutes === 0 ){
                _allDate = true;
            }

            this.allDate = _allDate;
            this.startTime = $startTime;
            this.sn = $node.sn;
            this.sub = $node.sub;
            this.desc = $node.desc;
            this.cal = $node.cal;
            this.location = $node.location;
            this.endTime = $endTime;
        }
    }
</script>

<style scoped lang="scss">
    textarea {
        min-height: 60px;
    }
</style>
