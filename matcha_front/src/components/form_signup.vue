<template lang="pug">
    form.column.is-4.is-offset-4.c-form(@submit.prevent='sub_form')
        .title SIGN UP
        .field
            .control
                input.c-input.c-input-first(name='email' type='text' v-model='email' placeholder='Email')
        .field
            .control
                input.c-input(v-model='username' type='text' placeholder='Username')
        .field
            .control
                input.c-input(name='firstname' type='text' v-model='firstname' placeholder='Firstname')
        .field
            .control
                input.c-input(name='lastname' type='text' v-model='lastname' placeholder='Lastname')
        .field
            .control
                input.c-input(ref='password' name='password' type='password' v-model='password' placeholder='Password')
        .field
            .control
                input.c-input.c-input-last(name='cpassword' type='password' v-model='cpassword' placeholder='Confirm password')
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
            email: '',
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            cpassword: ''
        }
    },
    methods: {
        sub_form () {
            if (this.password !== this.cpassword)
                //return this.$store.commit('POP_NOTIF', { type: 'is_danger', message: 'The 2 password did not match, please retry' });
                return this.$store.dispatch('notifWarning', 'The 2 passwords must be identical')
            // TEST MDP
            let user = {
                email: this.email,
                username: this.username,
                firstname: this.firstname,
                lastname: this.lastname,
                password: this.password
            }
            let payload = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(user)
            }
            let url = process.env.VUE_APP_SERV_ADDR + '/register';
            fetch(url, payload).then(res => {
                return res.json();
            }).then(data => {
                if (data.hasOwnProperty('success') && data.success) {
                    this.$store.dispatch('notifSuccess','Your account has been created succesfully, a confirmation mail has been sent to activate your account.');
                    this.$router.push('home');
                } else {
                    this.$store.commit('POP_NOTIF', { type: 'is-danger', message: data.err })
                    this.password = '';
                    this.cpassword = '';
                    this.$refs.password.focus();
                }
            }).catch(err => {
                    this.$store.dispatch('notifDanger', 'Server internal error, please retry...');
            })
        }
    }
}
</script>

<style lang="scss">

</style>
