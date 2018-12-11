<template lang="pug">
    .full-width
        form.column.is-4.is-offset-4.c-form(@submit.prevent='sub_form')
            div.title CHANGE PASSWORD
            .field
                .control
                    input.c-input.c-input(v-model='new_password' ref='password' type='password'  placeholder='New password')
            .field
                .control
                    input.c-input.c-input-last(v-model='confirm_new_password' type='password'  placeholder='Confirm new password')
            .field
                .control
                    input.button.is-fullwidth.c-btn(type='submit' value='SUBMIT')
</template>

<script>
import base from '@/mixins/base.vue'

export default {
    mixins: [base],
    data () {
        return {
            new_password: '',
            confirm_new_password: ''
        }
    },
    methods: {
        sub_form () {
            if (this.new_password !== this.confirm_new_password) {
                this.$store.dispatch('notifDanger', 'The 2 passwords must be identical');
                this.confirm_new_password = '';
                this.$refs.password.focus();
                return ;
            }
            let payload = {
                password: this.new_password
            }
            this.AjaxCall('/profile/password', 'PUT', payload).then(data => {
                if (data.hasOwnProperty('success'))
                    this.$store.dispatch('notifSuccess', 'Password updated with success');
                else {
                    this.$store.dispatch('notifDanger', data.err);
                    this.confirm_new_password = '';
                    this.$refs.password.focus();
                }
            }).catch(err => {
                this.$store.dispatch('notifDanger', 'Server internal error...');
            })
        }
    }
}
</script>
