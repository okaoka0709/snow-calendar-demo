import Vue from 'vue'
import Vuex from 'vuex'
import okaTool from './okaTool'

Vue.use(Vuex)

let _isMobile = okaTool.checkMobile();

let store = new Vuex.Store({
    state: {
        isMobile: _isMobile, //給 vuex 作為判斷之用
        popUps: [],
        notifications: [],
        toolTips: []
    },
    mutations: {
        pushMessage: function(state, opt){
            const _type = opt.type,
                $object = opt.object;

            $object.sn = okaTool.getUUID();

            let $content = null;

            if( _type === 'popup' ) {
                $content = state.popUps;
            }else if( _type === 'tooltip' ) {

                if (!state.isMobile) { //手機無法使用 tooltip
                    this.commit('clearToolTip'); //推送 tooltip 之前先刪除目前的 tooltip
                    $content = state.toolTips;
                }
            }else if( _type === 'notification' ) {
                $content = state.notifications;
            }else {
                console.log('message 類別錯誤。')
            }

            if( $content ) {
                $content.push($object);
            }
        },
        clearMessage: function(state, opt){
            const _type = opt.type,
                _area = opt.area; //可能是 number、sn、Array、object 或 'all'

            let $content = null;

            if( _type === 'popup' ) {
                $content = state.popUps;
            }else if( _type === 'tooltip' ) {
                $content = state.toolTips;
            }else if( _type === 'notification' ) {
                $content = state.notifications;
            }else {
                console.log('message 類別錯誤。');
                return false;
            }

            if( _area === 'all' ) {
                $content.splice(0, $content.length);
            }else if( typeof _area === 'string' ) { //普通字串應該是 sn
                let $item = $content.find(item => { return item.sn === _area });

                if( $item ) {
                    let _index = $content.indexOf($item);

                    $content.splice(_index, 1);
                }else {
                    console.log('找不到此物件', _area);
                }
            }else if( Array.isArray(_area) ) { //一個陣列，就一個一個去帶

                _area.forEach(item => {

                    this.commit('clearMessage', {
                        type: _type,
                        area: item
                    });
                });
            }else if( typeof _area === 'object' ) { //整個物件，找到物件並刪除
                let _index = $content.indexOf(_area)

                if( _index >= 0 ) {
                    $content.splice(_index, 1);
                }else {
                    console.log('找不到此物件', _area);
                }
            }else if( typeof _area === 'number' ) { //數字代表要移除幾個
                let _num = parseInt(_area, 10);

                $content.splice($content.length - _num, _num);
            }else {
                $content.splice($content.length - 1, 1); //移除最上面的一個
            }
        }, //============= pop up =============
        pushPopUp: function(state, object){ //增加 popup
            this.commit('pushMessage', {
                type: 'popup',
                object: object
            });
        },
        alert: function(state, opt){ //增加 popup 的一種簡單模式
            let $object = { type: 'alert' }

            if( typeof opt === 'string' ) {
                $object.content = { html: opt }
            }else if( typeof opt === 'object' ) {
                $object.content = opt;
            }else {
                console.log('alert 類別錯誤。')
            }

            this.commit('pushMessage', {
                type: 'popup',
                object: $object
            });
        },
        clearPopUp: function(state, area){ //移除 popup 一個或全部(all)
            this.commit('clearMessage', {
                type: 'popup',
                area: area
            });
        }, //============= tool tip =============
        pushToolTip: function(state, object){ //增加 tooltip
            this.commit('pushMessage', {
                type: 'tooltip',
                object: object
            });
        },
        clearToolTip: function(state){ //移除全部的 tooltip 一個或全部(all)，目前邏輯永遠只有一個 toolTip
            this.commit('clearMessage', {
                type: 'tooltip',
                area: 'all'
            });
        }, //============= notification =============
        pushNotification: function(state, object){ //增加 notification
            this.commit('pushMessage', {
                type: 'notification',
                object: object
            });
        },
        clearNotification: function(state, area){ //移除全部的 notification 一個或全部(all)
            this.commit('clearMessage', {
                type: 'notification',
                area: area
            });
        }
    }
})

export default store;
