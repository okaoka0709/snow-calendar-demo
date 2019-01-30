<template>
    <div class="lo root">
        <loExtend></loExtend>
        <div class="lo main">
            <snowCalendar
                :sources="sources"
                :events="events"
                :mainCal="mainCal"
                :refCal="refCal"
                :mode="mode"
                :uiVisible="uiVisible"
                :lang="lang"

                @updateCal="updateCal"
                @updateMode="updateMode"

                @initMonth="initMonth"
                @errorMsg="errorMsg"

                @clickTime="clickTime"

                @dropEvent="dropEvent"
                @addEvent="addEvent"
                @clickEvent="clickEvent"
                @hoverEvent="hoverEvent"

                @clickMore="clickMore"
                @hoverMore="hoverMore"

                @addSource="addSource"
                @importSource="importSource"
                @clickSource="clickSource"
                @hoverSource="hoverSource"
            ></snowCalendar>
        </div>
    </div>
</template>

<script>
    import loExtend from '@/components/loExtend'
    import VueCookie from 'vue-cookie'
    import { mapMutations } from 'vuex'

    export default {
        components: {
            loExtend
        },
        data: function(){
            return {
                sources: [],
                events: [],
                mainCal: {
                    year: 2019,
                    month: 1,
                    date: 1
                },
                refCal: {
                    year: 2019,
                    month: 1,
                    date: 1
                },
                mode: 'month',
                uiVisible: {
                    control: true,
                    refCal: true,
                    source: true
                },
                lang: 'en'
            }
        },
        methods: {
            ...mapMutations([
                'pushPopUp',
                'pushToolTip',
                'pushNotification'
            ]),
            updateCal: function(cal, date){ //切換月曆(ref or main)
                console.log('calendar', cal, 'date', date);

                VueCookie.set('cal-'+ cal +'Cal', JSON.stringify(date), 1);
            },
            updateMode: function(opt){ //改變模式
                console.log('updateMode', opt);

                VueCookie.set('cal-mode', opt, 1);
            },
            initMonth: function(opt){ //第一次造訪該月
                console.log('initMonth', opt);
                // this.getEvent(opt);
            },
            errorMsg: function(msg){ //推送錯誤訊息
                console.log('errorMsg', msg);

                this.pushNotification({
                    type: 'notification',
                    content: {
                        html: msg,
                        status: 'danger'
                    }
                })
            },
            clickTime: function(time, mode){
                console.log('clickTime', time, mode);

                this.addEvent(time, mode);
            },
            dropEvent: function(event){
                console.log('dropEvent', event);

                this.pushNotification({
                    type: 'notification',
                    content: {
                        html: 'update complete',
                        status: 'success'
                    }
                });
            },
            addEvent: function(time, mode){
                console.log('addEvent', time, mode);

                let _canAdd = this.sources.find(item => item.editable);

                if( _canAdd === undefined ) {
                    this.pushPopUp({ //丟去編輯
                        type: 'alert',
                        content: {
                            html: 'pleace create a calendar first.'
                        }
                    });

                    return false;
                }

                let editableCals = this.sources.filter(item => {
                        return item.editable === true
                    });

                let $event = {
                        sn: this.$okaTool.getUUID(),
                        sub: 'new event',
                        desc: '',
                        cal: editableCals[0].sn,
                        location: ''
                    }

                if( mode === 'date' ){
                    $event.startTime = time;
                    $event.endTime = this.computedTime($event.startTime, {
                        date: 1
                    });
                }else if( mode === 'time' ){
                    $event.startTime = this.roundTime(time);
                    $event.endTime = this.computedTime($event.startTime, {
                        hour: 1
                    });
                }

                this.updateEvent($event, false); //先新增這個事件

                let $set = {
                        updateEvent: this.updateEvent,
                        computedTime: this.computedTime,
                        roundTime: this.roundTime,
                        source: this.sources,
                        close: () => { this.removeEvent($event, false) }
                    }

                this.pushPopUp({ //丟去編輯
                    type: 'editCalendarEvent',
                    content: {
                        node: $event,
                        extend: $set
                    }
                });
            },
            clickEvent: function(event, mouseEvent){ //popup 顯示 event
                console.log('clickEvent', event, mouseEvent);

                let $set = {
                        removeEvent: this.removeEvent,
                        editEvent: this.editEvent,
                        source: this.sources
                    }

                this.pushPopUp({
                    type: 'showCalendarInfo',
                    content: {
                        node: event,
                        extend: $set
                    }
                });
            },
            hoverEvent: function(event, mouseEvent){ //tooltip 顯示 event
                console.log('hoverEvent', event, mouseEvent);

                this.pushToolTip({
                    type: 'showCalendarInfo',
                    event: mouseEvent,
                    content: event,
                    pointerEvents: 'none'
                });
            },
            clickMore: function(event, mouseEvent){
                console.log('clickMore', event, mouseEvent);
            },
            hoverMore: function(event, mouseEvent){
                console.log('hoverMore', event, mouseEvent);

                let $set = {
                        clickEvent: this.clickEvent,
                        source: this.sources
                    }

                this.pushToolTip({
                    type: 'showCalendarMore',
                    event: mouseEvent,
                    content: {
                        node: event.extend.moreEvent,
                        extend: $set
                    }
                });
            },
            addSource: function(){
                console.log('addSource');

                let $set = {
                        sn: this.$okaTool.getUUID(),
                        sub: 'new calendar',
                        color: this.$okaTool.randomColor('light'),
                        active: true,
                        editable: true,
                        desc: ''
                    }

                this.clickSource($set);
            },
            importSource: function(){
                console.log('importSource');
            },
            clickSource: function(source, mouseEvent){
                console.log('clickSource', source, mouseEvent);

                this.pushPopUp({
                    type: 'editCalendarSource',
                    content: {
                        node: source,
                        extend: {
                            updateSource: this.updateSource,
                            confirmRemoveSource: this.confirmRemoveSource
                        }
                    }
                });
            },
            hoverSource: function(source, mouseEvent){
                console.log('hoverSource', source, mouseEvent);

                if( source.desc !== "" ) {
                    this.pushToolTip({
                        type: 'tooltip',
                        event: mouseEvent,
                        content: {
                            html: source.desc
                        },
                        pointerEvents: 'none'
                    });
                }
            },
            updateEvent: function(event, isFinally){
                const $events = this.events;

                let $event = this.$okaTool.copy(event);

                let _sn = $event.sn,
                    $originalEvent = $events.find(item => { return item.sn === _sn });

                if( isFinally ){
                    delete $event.extend;
                }

                if( $originalEvent ){ //如果有原本的事件

                    if( isFinally ){
                        delete $originalEvent.extend;
                    }

                    this.$okaTool.extend({
                        target: $originalEvent,
                        ref: $event,
                        copy: false,
                        hard: true
                    });
                }else {
                    $events.push($event);
                }

                if( isFinally ){

                    this.pushNotification({
                        type: 'notification',
                        content: {
                            html: 'update complete',
                            status: 'success'
                        }
                    });
                }
            },
            removeEvent: function(event, isFinally){
                let _sn = null

                if( typeof event === 'number' || typeof event === 'string' ){
                    _sn = event;
                }else if( typeof event === 'object' ){
                    _sn = event.sn;
                }

                if( _sn ){
                    let $item = null;

                    $item = this.events.find( event => {
                        return event.sn === _sn;
                    });

                    if( $item ){
                        let _index = this.events.indexOf($item);

                        this.events.splice(_index, 1);

                        if( isFinally ){

                            this.pushNotification({
                                type: 'remove complete',
                                content: {
                                    html: '事件刪除完成',
                                    status: 'success'
                                }
                            });
                        }
                    }else {
                        console.log('can\'t find this event');
                    }

                }else {
                    console.log('this sn is fall');
                }
            },
            editEvent: function(event){
                let $set = {
                        updateEvent: this.updateEvent,
                        computedTime: this.computedTime,
                        roundTime: this.roundTime,
                        source: this.sources
                    }

                this.pushPopUp({
                    type: 'editCalendarEvent',
                    content: {
                        node: event,
                        extend: $set
                    }
                });
            },
            updateSource: function(source){
                const $source = this.sources;

                let _sn = source.sn,
                    $originalSource = $source.find(item => { return item.sn === _sn });

                if( $originalSource ){ //如果有重複的 sn 代表是修改
                    this.$okaTool.extend({
                        target: $originalSource,
                        ref: source,
                        copy: false,
                        hard: true
                    });
                }else {
                    $source.push(source);
                }

                this.pushNotification({
                    type: 'notification',
                    content: {
                        html: 'update complete',
                        status: 'success'
                    }
                });
            },
            removeSource: function(source){
                let $cal = this.sources.find(cal => { return cal.sn === source.sn });

                if( $cal ) {

                    this.$set(this, 'events', this.events.filter( event => { return event.cal !== source.sn }));

                    let _index = this.sources.indexOf($cal);

                    this.sources.splice(_index, 1); //再刪除

                    this.pushNotification({
                        type: 'notification',
                        content: {
                            html: 'remove complete',
                            status: 'success'
                        }
                    });
                }
            },
            confirmRemoveSource: function(source){

                this.pushPopUp({
                    type: 'confirmRemoveSource',
                    content: {
                        node: source,
                        extend: {
                            removeSource: this.removeSource
                        }
                    }
                });
            },
            returnTime: function(time, mode){
                let _year = time.year || 0,
                    _month = time.month || 0,
                    _date = time.date || 0,
                    _hour = time.hour || 0,
                    _minutes = time.minutes || 0;

                if( mode === 'date' ){
                    return new Date(_year, _month -1, _date);
                }else if( mode === 'time' ){
                    return new Date(_year, _month -1, _date, _hour, _minutes);
                }
            },
            computedTime: function(time1, time2){ //計算時間
                let $newTime = null,
                    $time = this.$okaTool.copy(time1);

                if( typeof time2 === 'object' ){ //可傳入月曆定義時間物件
                    for( let unit in time2 ){
                        $time[unit] = $time[unit] + time2[unit];
                    }

                    $newTime = new Date($time.year, $time.month - 1, $time.date, $time.hour, $time.minutes);
                }else if( typeof time2 === 'number' ){ //也可以傳入毫秒
                    let _time = new Date($time.year, $time.month - 1, $time.date, $time.hour, $time.minutes).getTime();

                    _time += time2;

                    $newTime = new Date(_time);
                }

                return {
                    year: $newTime.getFullYear(),
                    month: $newTime.getMonth() + 1,
                    date: $newTime.getDate(),
                    hour: $newTime.getHours(),
                    minutes: $newTime.getMinutes()
                }
            },
            differenceTime: function(time1, time2, mode){ //計算兩時間之差
                return this.returnTime(time1, mode) - this.returnTime(time2, mode);
            },
            roundTime: function(time){ //給整數時間，例如 30 或 00
                let $time = this.$okaTool.copy(time);

                if( $time.minutes > 0 && $time.minutes < 30 ){
                    $time.minutes = 30;
                }else if( $time.minutes > 30 ){
                    $time.minutes = 0;

                    $time = this.computedTime($time, {
                        hour: 1
                    });
                }

                return $time;
            },
            getEvent: function(opt){ //取事件
                let _year = opt.year,
                    _month = opt.month;

                this.$http.get('/static/datas/calEvent.json').then(res => {
                    let $events = res.data;

                    $events.forEach(item => {
                        let _sn = item.sn,
                            $original = this.events.find(event => { return event.sn === _sn });

                        if( $original ){ //如果有找到這個事件
                            let _index = this.events.indexOf($original);

                            this.events.splice(_index, 1);
                        }

                        this.events.push(item);
                    });
                });
            }
        },
        created: function(){

            this.$http.get(process.env.BASE_URL +'calSource.json').then(res => {
                this.$set(this, 'sources', res.data);

                this.$http.get(process.env.BASE_URL +'calEvent.json').then(res => {
                    this.$set(this, 'events', res.data);
                });
            });

            let $cookie_mainCal = VueCookie.get('cal-mainCal');

            if ($cookie_mainCal){
                this.mainCal = JSON.parse($cookie_mainCal);
            }

            let $cookie_refCal = VueCookie.get('cal-refCal');

            if ($cookie_refCal){
                this.refCal = JSON.parse($cookie_refCal);
            }

            let $cookie_mode = VueCookie.get('cal-mode');

            if ($cookie_mode){
                this.mode = $cookie_mode;
            }

            if( this.$okaTool.checkMobile() ){
                this.mode = 'event';
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
