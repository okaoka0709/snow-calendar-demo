<template>
    <div class="lo extend">
        <gPopUp
            v-for="popUp in popUps"
            :key="'popUp'+ popUp.sn"
            :type="popUp.type"
            :sn="popUp.sn"
            :content="popUp.content"
        ></gPopUp>
        <div class="g notification">
            <gNotification
                v-for="notification in notifications"
                :key="'notification'+ notification.sn"
                :type="notification.type"
                :sn="notification.sn"
                :content="notification.content"
            ></gNotification>
        </div>
        <gToolTip
            v-for="toolTip in toolTips"
            :key="'toolTip'+ toolTip.sn"
            :type="toolTip.type"
            :sn="toolTip.sn"
            :event="toolTip.event"
            :content="toolTip.content"
            :pointerEvents="toolTip.pointerEvents"
        ></gToolTip>
    </div>
</template>

<script>
    import gToolTip from '@/components/gToolTip'
    import gPopUp from '@/components/gPopUp'
    import gNotification from '@/components/gNotification'

    import { mapState } from 'vuex'

    export default {
        components: {
            gToolTip,
            gPopUp,
            gNotification
        },
        computed: {
            ...mapState([
                'toolTips',
                'popUps',
                'notifications'
            ])
        }
    }
</script>

<style scoped lang="scss">

</style>
