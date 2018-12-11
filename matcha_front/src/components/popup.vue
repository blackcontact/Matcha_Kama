<template lang="pug">
    .popup-container(@click='delete_notif')
        div(:class='type').notification.popup {{ message }}
            button.delete(@click='delete_notif')
</template>

<script>
import store from '@/store.js'
import { mapGetters } from 'vuex';

export default {
    store,
    props: ['type', 'message'],
    computed: {
        ...mapGetters([
            'popup'
        ])
    },
    mounted () {
        setTimeout(() => {
            store.commit('POP_NOTIF', { type: 0, message: '' });
        }, 4000);
    },
    methods: {
        delete_notif () {
            store.commit('POP_NOTIF', { type: 0, message: '' });
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/custom.scss';

    .popup-container {
        margin-top: 4em;
        position: absolute;
        left: 50%;
        z-index: 999;
        cursor: pointer;
        &:hover {
            -webkit-filter: brightness(110%);
            filter: brightness(110%);
        }
    }

    .popup {
        color: $c-main-white;
        width: 80vw;
        position: relative;
        left: -50%;
        border-radius: 4px;
        z-index: 999;
    }

</style>
