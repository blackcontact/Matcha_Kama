<script>
import store from '@/store.js'
import { mapGetters } from 'vuex';
import Vue from 'vue';
import socketIo_vue from 'vue-socket.io';
import io from 'socket.io-client';

export default {
    store,
    computed: {
        ...mapGetters([
            'is_loggued',
            'popup',
            'nb_notifs',
            'new_message'
        ])
    },
    mounted () {
        if (localStorage.getItem('token'))
            store.commit('LOG', true);
    },
    methods: {
        AjaxGet(route, authorization) {
            let url = process.env.VUE_APP_SERV_ADDR + route;
            if (authorization) {
                let payload = {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
                return fetch(url, payload).then(res => res.json());
            }
            return fetch(url).then(res => res.json());
        },
        AjaxCall(route, method, body) {
            let url = process.env.VUE_APP_SERV_ADDR + route;
            let payload = {
                method,
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }
            return fetch(url, payload).then(res => res.json());
        },
        err_redirect() {
            this.serv_err();
            this.redirect_home();
        },
        serv_err () {
            this.$store.dispatch('notifDanger', 'Internal server error...')
        },
        redirect_home() {
            if (this.is_loggued)
                return this.$router.push('/dashboard');
            else
                return this.$router.push('/home');
        },
        get_notifs () {
            this.AjaxGet('/profile/nbnewnotifs', true).then(res => {
                if (res.hasOwnProperty('success'))
                    this.$store.dispatch('set_nb_notifs', res.nb);
                else
                    this.$store.dispatch('notifDanger', res.err);
            }).catch(err => {
                console.log(err);
            })
        },
        io_listen_notifs () {
            if (!this.is_loggued)
                this.io_init_connection();
            this.$socket.on('notification', res => {
                let notif_id = res.notif_id;
                let notif = res.user_info;
                notif.id = notif_id;
                notif['is_read'] = 0;
                let type = res.type;
                if (type === 'V')
                    this.$store.dispatch('add_visits', notif);
                else if (type === 'L')
                    this.$store.dispatch('add_likes', notif);
                else if (type === 'M')
                    this.$store.dispatch('add_matchs', notif);
                else if (type === 'U')
                    this.$store.dispatch('add_unmatchs', notif);
            })
            this.$socket.on('message', res => {
                this.$store.dispatch('set_new_message', true);
            })
        },
        io_init_connection() {
            Vue.use(socketIo_vue, io(process.env.VUE_APP_SERV_ADDR, { query: 'auth_token=' + localStorage.getItem('token') }), store);
        },
        get_my_id () {
            return JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
        },
        notif_message() {
            this.AjaxGet('/profile/nbnewmessages', true).then(res => {
                if (res.hasOwnProperty('success'))
                    res.nb > 0 ? this.$store.dispatch('set_new_message', true) : this.$store.dispatch('set_new_message', false);
                else
                    this.err_redirect(res.err);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>
