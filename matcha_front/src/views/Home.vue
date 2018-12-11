<template lang="pug">
    .full-width
        .container
            transition(name='slide-fadeX' mode='out-in' appear)
                form_login.fade-enter-active.fade-leave-active(v-if='home_state == 1')
                form_signup(v-else-if='home_state == 2')
                form_forgot_pw(v-else-if='home_state == 3')
</template>

<script>
import form_login from '@/components/form_login.vue';
import form_signup from '@/components/form_signup.vue';
import form_forgot_pw from '@/components/form_forgot_pw.vue';
import { mapGetters } from 'vuex';
import base from '@/mixins/base.vue';

export default {
    name: 'home',
    mixins: [base],
    created () {
        if (localStorage.getItem('token')) {
            this.$store.commit('LOG', true);
            this.$router.push('dashboard');
        }
    },
    components: {
        form_login,
        form_signup,
        form_forgot_pw
    },
    computed: {
        ...mapGetters([
            'home_state'
        ])
    },
    methods: {
    }
}
</script>

<style lang="scss">
    @import '@/assets/custom.scss';

    .slide-fadeX-enter-active, .slide-fadeX-leave-active  {
        transition: all .2s ease;
    }
    .slide-fadeX-enter, .slide-fadeX-leave-to {
        transform: translateX(40px);
        opacity: 0;
    }

    .c-form {
        padding: 0;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .c-input {
        color: $c-main-white;
        padding: 5px;
        width: 100%;
        height: 40px;
        border: 0;
        border-bottom: 1px solid $c-main-black-lighter;
        background-color: $c-main-black-light;
        &:focus {
            outline: 0;
            background-color: $c-main-black-lighter;
        }
        &::placeholder {
            font-family: 'Source Code Pro', 'Monospace';
            font-weight: 200;
            color: #fcf9fb;
            opacity: 1;
        }
    }

    .c-input-first {
        border-top-right-radius: 2px;
        border-top-left-radius: 2px;
    }

    .c-input-last {
        border: 0;
        border-bottom-right-radius: 2px;
        border-bottom-left-radius: 2px;
    }

    .c-submit {
        background-color: $c-main;
        color: $c-main-white;
        border: 0;
        &:focus {
            border: 0;
            outline: none;
            color: $c-main-white;
        }
    }
</style>
