<template>
    <transition name="animate">
        <div
            ref="toolTip"
            class="g tool-tip"
            :class="className"
            :style="'top:'+ top +'px; left:'+ left +'px; pointer-events:'+ pointerEvents"
            @mouseenter="clearTimer"
            @mouseleave="setTimer"
        >
            <toolTip v-if="type === 'tooltip'" :content="content"></toolTip>
            <showCalendarInfo v-if="type === 'showCalendarInfo'" :content="content"></showCalendarInfo>
            <showCalendarMore v-if="type === 'showCalendarMore'" :content="content"></showCalendarMore>
        </div>
    </transition>
</template>

<script>
    import toolTip from '@/tooltips/toolTip'
    import showCalendarInfo from '@/tooltips/showCalendarInfo'
    import showCalendarMore from '@/tooltips/showCalendarMore'

    import { mapMutations } from 'vuex'

    export default {
        components: {
            toolTip,
            showCalendarInfo,
            showCalendarMore
        },
        data: function(){
            return {
                className: [],
                top: 0,
                left: 0,
                timer: null,
                delay: 150
            }
        },
        props: {
            type: {
                require: true
            },
            sn: {
                require: true
            },
            event: { //可以傳事件，也可以傳 target
                require: true
            },
            content: { //依照模板定義
                require: false
            },
            pointerEvents: {
                type: String,
                default: 'auto',
                require: false
            }
        },
        methods: {
            ...mapMutations([
                'clearToolTip'
            ]),
            getPos: function(node){ //計算與 content 相對的定位
                const $content = document.querySelector('body'),
                    $node = node;

                let $pos = {
                        top: 0,
                        left: 0
                    }

                if( $node ){
                    $pos.top = $node.offsetTop;
                    $pos.left = $node.offsetLeft;

                    let $parent = $node.offsetParent;

                    while ($parent !== $content){ //一直累加到 lo-footer 的共同祖先 lo-content
                        $pos.top += $parent.offsetTop;
                        $pos.top -= $parent.scrollTop;
                        $pos.left += $parent.offsetLeft;

                        $parent = $parent.offsetParent;
                    }

                    return $pos;
                }else {
                    return 0;
                }
            },
            setPos: function(){ //計算tooltip 定位
                const $toolTip = this.$refs.toolTip,
                    $content = document.querySelector('.lo.main');

                let $node = this.event;

                if( $node.target ){
                    $node = $node.target;
                }

                const $nodePos = this.getPos($node);

                const _scrollTop = window.pageYOffset,
                    _headerNavHeight = 55, //懶得取
                    _contentWidth = $content.offsetWidth,
                    _contentHeight = $content.offsetHeight,
                    _nodeTop = $nodePos.top,
                    _nodeLeft = $nodePos.left,
                    _nodeHeight = $node.offsetHeight,
                    _nodeWidth = $node.offsetWidth,
                    _toolTipHeight = $toolTip.offsetHeight,
                    _toolTipWidth = $toolTip.offsetWidth;

                if( _scrollTop < _nodeTop - _toolTipHeight - _headerNavHeight ){ //顯示在上面
                    this.top = _nodeTop - _toolTipHeight + 5; //緩衝
                    this.className.push('bottom');
                }else if( _nodeTop + _nodeHeight + _toolTipHeight - 5 < _contentHeight ){
                    this.top = _nodeTop + _nodeHeight - 5;
                    this.className.push('top');
                }else {
                    this.clearToolTip();
                    return false;
                }

                if( _nodeLeft + _toolTipWidth > _contentWidth ){
                    this.left = _nodeLeft + _nodeWidth - _toolTipWidth;
                    this.className.push('right');
                }else {
                    this.left = _nodeLeft;
                    this.className.push('left');
                }
            },
            clearTimer: function(){
                clearTimeout(this.timer);
            },
            setTimer: function(){
                this.clearTimer();

                this.timer = setTimeout(() => {
                    this.clearToolTip();
                }, this.delay);
            }
        },
        mounted: function(){
            this.setPos();

            let $target = this.event.target,
                _eventType = this.event.type,
                $childrens = $target.querySelectorAll('*');

            if( _eventType.match(/^on/) === null ) { //如果沒有 on 前輟
                _eventType = 'on'+ _eventType;
            }

            $childrens.forEach(node => { //阻止子物件冒泡
                node[_eventType] = (event) => {
                    event.stopPropagation();
                }
            });

            $target.onmouseenter = () => {
                this.clearTimer();
            }

            $target.onmouseleave = () => {

                if( this.pointerEvents === 'none' ) {
                    this.clearToolTip();
                }else if( this.pointerEvents === 'auto' ) {
                    this.setTimer();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .animate-enter-active {
        animation: animate-in .3s;
    }

    .animate-leave-active {
        animation: animate-out .2s;
    }

    @keyframes animate-in {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes animate-out {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
</style>
