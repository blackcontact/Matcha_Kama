<template lang="pug">
    .container
        .columns
            .bg-grey.column.is-6 Reporter
            .bg-grey.column.is-6 Reported
        .columns(v-for='usr in reported')
            .bg-white.column.is-6 {{ usr.user_id }}
            .bg-white.column.is-6 {{ usr.user_reported }}
</template>

<script>
import base from '@/mixins/base.vue';

export default {
    mixins: [base],
    data () {
        return {
            reported: []
        }
    },
    mounted () {
        this.AjaxGet('/reported', true).then(res => {
            this.reported = res.reported;
        }).catch(err => {
            this.$store.dispatch('notifDanger', 'You\'re not authorized to get this page.');
            this.$router.push('/dashboard');
        })
    }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/custom.scss';

    .bg-grey {
        background-color: #95989c;
        border: 1px solid $c-main-black;
    }

    .bg-white {
        background-color: $c-main-white;
        border: 1px solid $c-main-black;
    }
</style>
