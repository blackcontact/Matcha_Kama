<template lang="pug">
    nav.navbar
        .navbar-brand
            router-link(class='navbar-item' to='/')
                img(src='../assets/logo.png') 
            a.navbar-burger(v-bind:class='isActive ? "is-active" : ""' role='button' aria-label='menu' aria-expanded='false' @click='toggle_burger')
                span(aria-hidden='true')
                span(aria-hidden='true')
                span(aria-hidden='true')
        .navbar-menu(v-bind:class='isActive ? "is-active" : ""')
            .navbar-start
                router-link.navbar-item(v-if='!is_loggued' to='/') HOME
                router-link.navbar-item(v-if='is_loggued' to='/dashboard') DASHBOARD
                .navbar-item.has-dropdown(v-if='is_loggued' v-bind:class='drop_settings ? "is-active" : ""' @mouseover='toggle_drop_settings' @mouseleave='toggle_drop_settings_false')
                    a.navbar-link SETTINGS
                    .navbar-dropdown(@mouseover='toggle_drop_settings' @mouseleave='toggle_drop_settings_false')
                        router-link.navbar-item(to='/settings/profile') EDIT PROFILE
                        router-link.navbar-item(to='/settings/change_password') CHANGE PASSWORD
                        router-link.navbar-item(to='/settings/change_email') CHANGE EMAIL
                        router-link.navbar-item(to='/settings/blacklist') BLACKLIST
                router-link.navbar-item(v-if='is_loggued' to='/history') HISTORY
            .navbar-end
                a.navbar-item.auth(v-if='!is_loggued && isHome' @click='home_switch(1)') LOG IN
                a.navbar-item.auth.signup(v-if='!is_loggued && isHome' @click='home_switch(2)') SIGN UP
                router-link.navbar-item(v-if='is_loggued' to='/messages')
                    i(:class='new_message ? "far fa-comment colored_message" : "far fa-comment"')
                router-link.navbar-item(v-if='is_loggued' to='/notification')
                    i(:class='nb_notifs ? "fas fa-bell" : "far fa-bell white"') {{ nb_notifs ?  ' ' + nb_notifs : '' }}
                a.navbar-item.auth(v-if='is_loggued' @click='disconnect') DISCONNECT
</template>

<script>
import base from '@/mixins/base.vue';

export default {
    mixins: [base],
    data () {
        return {
            isActive: false,
            drop_settings: false,
            isHome: false
        }
    },
    mounted () {
        if (this.$route.name === 'home')
            this.isHome = true;
    },
    methods: {
        home_switch (select) {
            this.$store.commit('AUTH_FORM_SWITCH', select);
        },
        disconnect () {
            localStorage.removeItem('token');
            this.$store.commit('LOG', false);
            this.$socket.close();
            this.$router.push('/');
        },
        toggle_burger () {
            this.isActive = !(this.isActive);
        },
        toggle_drop_settings () {
            this.drop_settings = !(this.drop_settings);
        },
        toggle_drop_settings_false () {
            this.drop_settings = false;
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/custom.scss';
    
    $navbar-burger-color: $c-main;

    .navbar-item {
        font-family: 'Source Code Pro', 'Monospace';
        font-weight: 200;
        &:hover {
            transition: .5s;
        }
    }

    .navbar-link {
        font-family: 'Source Code Pro', 'Monospace';
        font-weight: 200;
        &:hover {
            transition: .5s;
        }
    }

    .navbar {
        border-bottom: 1px solid $c-main;
    }

    .navbar-menu {
        .router-link-exact-active {
            background-color: $c-main;
        }
    }

    .navbar-dropdown {
        border: 0;
    }

    .fa-bell { 
        color: $c-main-lighter
    }

    .white {
        color: $c-main-white;
    }

    .colored_message {
        color: $c-main-lighter;
    }
</style>