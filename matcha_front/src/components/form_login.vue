<template lang="pug">
    form.column.is-4.is-offset-4.c-form(@submit.prevent='sub_form')
        div.title LOG IN
        .field
            .control
                input.c-input.c-input-first(v-model='username' type='text' placeholder='Username')
        .field
            .control
                input.c-input.c-input-last(v-model='password' ref='password' autocomplete='on' type='password' placeholder='Password')
        .field
            a(@click='home_switch(3)') Password forgotten ?
        .field
            .control
                input.button.is-fullwidth.c-submit(type='submit')
</template>

<script>
import base from '@/mixins/base.vue';
import socketIo_vue from 'vue-socket.io';
import io from 'socket.io-client';
import Vue from 'vue';

export default {
    mixins: [base],
    data () {
        return {
            username: '',
            password: '',
            geoloc_accepted: false
        }
    },
    methods: {
        async sub_form () {
            if (this.username === '' || this.password === '')
                return this.$store.dispatch('notifDanger', 'Please fill every fields.');
            let user = {
                username: this.username,
                password: this.password,
                ip: ''
            };
            let resIp;
            try {
                let rawFetch = await fetch('https://api.ipify.org?format=json');
                resIp = await rawFetch.json();
                user.ip = resIp.ip;
            } catch (err) {
                user.ip = false;
            }
            this.AjaxCall('/get_token', 'POST', user).then(data => {
                if (data.hasOwnProperty('success')) {
                    this.$store.dispatch('notifSuccess', 'You logged in with success');
                    localStorage.setItem('token', data.token);
                    //this.io_listen_notifs();
                    this.$socket.open();
                    this.$store.commit('LOG', true);
                    this.$router.push('dashboard');
                    this.get_notifs();
                    if ('geolocation' in navigator) {
                        navigator.geolocation.getCurrentPosition(position => {
                            let geoloc = {
                                lat: position.coords.latitude,
                                lon: position.coords.longitude
                            }
                            this.AjaxCall('/profile/position', 'PUT', geoloc);
                        }, () => {
                            return ;
                        })
                    }
                } else {
                    this.$store.dispatch('notifDanger', data.err);
                    this.password = '';
                    this.$refs.password.focus();
                }
            }).catch(err => {
                this.err_redirect();
            });
        },
        home_switch(select) {
            this.$store.commit('AUTH_FORM_SWITCH', select);
        }
    }
}
</script>


<style lang="scss">
    @import '@/assets/custom.scss';

    .title {
        padding-bottom: 15px;
        border-bottom: 1px solid $c-main;
        color: $c-main-white;
    }
</style>
