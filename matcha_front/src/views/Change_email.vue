<template lang="pug">
    .full-width
        form.column.is-4.is-offset-4.c-form(@submit.prevent='sub_form')
            div.title CHANGE EMAIL
            .field
                .control
                    input.c-input.c-input-first(v-model='email' type='email' placeholder='New email')
            .field
                .control
                    input.is-fullwidth.c-btn(type='submit' value='SUBMIT')
</template>

<script>
import base from '@/mixins/base.vue';

export default {
    mixins: [base],
    data () {
        return {
            email: ''
        }
    },
    methods: {
        sub_form () {
            let payload = {
                email: this.email
            }
            this.AjaxCall('/profile/email', 'PUT', payload).then(data => {
                if (data.hasOwnProperty('success')) {
                    this.$store.dispatch('notifSuccess', data.message);
                    this.$router.push('home');
                }
                else {
                    this.$store.dispatch('notifDanger', data.err);
                    this.email = '';
                }
            }).catch(err => {
                this.$store.dispatch('notifDanger', 'Internal server error.');
            })
        }
    }
}
</script>
