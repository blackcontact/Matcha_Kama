<template lang="pug">
    .full-width
        form.column.is-4.is-offset-4.c-form(@submit.prevent='sub_form')
            div.title SELECT A NEW PASSWORD
            .field
                .control
                    input.c-input.c-input-first(v-model='password' ref='password' type='password' placeholder='Password')
            .field
                .control
                    input.c-input.c-input-last(v-model='cpassword' type='password' placeholder='cPassword')
            .field
                .control
                    input.button.is-fullwidth.c-submit(type='submit')
</template>

<script>
import base from '@/mixins/base.vue';

export default {
    mixins: [base],
    data () {
        return {
            password: '',
            cpassword: ''
        }
    },
    methods: {
        sub_form () {
            if (this.password !== this.cpassword)
                return this.$store.dispatch('notifDanger', 'The 2 passwords did not match, please retry');
            let route = '/reset/' + this.$route.params.id;
            let body = {
                password: this.password
            }
            this.AjaxCall(route, 'POST', body).then(data => {
                if (data.hasOwnProperty('success')) {
                    this.$store.dispatch('notifSuccess', 'Your password has been reset with success.');
                    this.$router.push('/home');
                }
                else {
                    this.$store.dispatch('notifDanger', data.err);
                    this.$router.push('/home');
                }
            }).catch(err => {
                this.$store.dispatch('notifDanger', 'Server internal error');
            })
        }
    }
}
</script>

<style lang="scss">

</style>
