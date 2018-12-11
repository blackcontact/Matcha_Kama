<template lang="pug">
    div
</template>

<script>
import base from '@/mixins/base.vue';

export default {
    mixins: [base],
    created () {
        let confirm_code = this.$route.params.confirm_code;
        let route = '/profile/email/' + confirm_code;
        this.AjaxCall(route, 'PUT', {}).then(res => {
            if (!res.hasOwnProperty('success'))
                this.$store.dispatch('notifDanger', res.err);
            else
                this.$store.dispatch('notifSuccess', res.message);
            this.$router.push('/dashboard');
        }).catch(err => {
            this.$store.dispatch('notifDanger', 'Internal server error...');
            this.router.push('/dashboard');
        })
    }
}
</script>

