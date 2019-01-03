<template>
    <div class="g tool-tip-inner">
        <div class="g tool-tip-content">
            <div class="g tool-tip-content-inner">
                <div>
                    <div
                        class="events"
                        v-for="event in events"
                        :key="'moreEvent-'+ event.sn"
                        @click.prevent="content.extend.clickEvent(event, $event)"
                    >
                        <cpShowCalendarMore
                            :event="event"
                            :source="content.extend.source"
                        ></cpShowCalendarMore>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cpShowCalendarMore from '@/tooltips/cpShowCalendarMore'

    export default {
        components: {
            cpShowCalendarMore
        },
        props: {
            content: {
                type: Object,
                require: true
            }
        },
        computed: {
            events: function(){
                let $events = this.$okaTool.copy(this.content.node);

                $events.forEach(event => {
                    let $startTime = event.startTime,
                        _hour = this.$okaTool.doubleCount($startTime.hour),
                        _minutes = this.$okaTool.doubleCount($startTime.minutes);

                    event.formatTime = _hour +':'+ _minutes;
                });

                return $events;
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
    }

    .events {
        margin: 3px;
        font-size: 0.7rem;
    }
</style>
