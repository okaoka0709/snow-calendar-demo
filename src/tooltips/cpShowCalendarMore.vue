<template>
    <a
        class="date"
        v-if="event.extend.cover > 0"
        :class="[event.extend.isOver? 'is-over': '']"
        :style="'background-color:'+ cal.color +';'"
    >{{ event.sub }}</a>
    <a v-else class="time" :class="[event.extend.isOver? 'is-over': '']">
        <i :style="'background-color:'+ cal.color +';'"></i>{{ event.formatTime }} {{ event.sub }}
    </a>
</template>

<script>
    export default {
        props: {
            event: {
                require: true
            },
            source: {
                require: true
            }
        },
        computed: {
            cal: function(){
                return this.source.find(cal => { return cal.sn === this.event.cal });
            }
        }
    }
</script>

<style scoped lang="scss">

    a {
        display: block;
        transition: 200ms;
        cursor: pointer;

        &:hover {
            opacity: .8;
        }

        &.is-over {
            opacity: 0.5;
        }
    }

    .date {
        color: #fff;
        padding: 0 6px;
        border-radius: 3px;
    }

    .time {

        i {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 3px;
            display: inline-block;
            vertical-align: middle;
        }
    }
</style>
