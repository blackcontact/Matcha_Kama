<template lang="pug">
    div
</template>


<script>
import base from '@/mixins/base.vue';

export default {
    mixins: [base],
    created () {
        let url = '/confirm/' + this.$route.params.token;
        this.AjaxGet(url).then(res => {
            if (res.hasOwnProperty('success'))
                this.$store.dispatch('notifSuccess', 'Account confirmed with success ! You can now log in');
            else
                this.$store.dispatch('notifDanger', res);
            this.$router.push('/home');
        }).then(err => {
            this.$store.dispatch('notifDanger', err.err);
            this.$router.push('/home');
        })
    }
}
</script>
