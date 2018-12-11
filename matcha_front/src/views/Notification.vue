<template lang="pug">
    .full-width
            .columns.is-multiline
                .tabs.is-boxed.column.is-12
                    ul
                        li(:class='state == 0 ? "is-active" : "non-active"')
                            a(@click='change_state(0)')
                                span VISIT
                        li(:class='state == 1 ? "is-active" : "non-active"')
                            a(@click='change_state(1)')
                                span LIKE
                        li(:class='state == 2 ? "is-active" : "non-active"')
                            a(@click='change_state(2)')
                                span MATCH
                        li(:class='state == 3 ? "is-active" : "non-active"') 
                            a(@click='change_state(3)')
                                span UNMATCH
            button.read_notifs.c-btn(@click='read_all_notifs')  Set all notifs as read
            .container
                transition(name='fade' mode='out-in')
                    .columns.is-multiline(v-if='state == 0')
                        .column.no_notif(v-if='visits.length < 1') You don't have any visit notification
                        .column.is-4(v-else, v-for='(v, i) in visits')
                            profile_thumbnail(
                                :user_id='v.from_id',
                                :is_notif='true',
                                :is_read='v.is_read',
                                :notif_id='v.id',
                                :img_src='serv_addr + "/uploads/" + v.avatar',
                                :firstname='v.firstname',
                                :lastname='v.lastname',
                                :age='v.age',
                                :bio='v.bio',
                                :city='v.city',
                                @mouseover.native='read_notif($event, v.id, i)')
                    .columns.is-multiline(v-else-if='state == 1')
                        .column.no_notif(v-if='likes.length < 1') You don't have any like notification
                        .column.is-4(v-else, v-for='(l, i) in likes')
                            profile_thumbnail(
                                :user_id='l.from_id',
                                :is_notif='true',
                                :is_read='l.is_read',
                                :notif_id='l.id',
                                :img_src='serv_addr + "/uploads/" + l.avatar',
                                :firstname='l.firstname',
                                :lastname='l.lastname',
                                :age='l.age',
                                :bio='l.bio',
                                :city='l.city'
                                @mouseover.native='read_notif($event, l.id, i)')
                    .columns.is-multiline(v-else-if='state == 2')
                        .column.no_notif(v-if='matchs.length < 1') You don't have any match notification
                        .column.is-4(v-else, v-for='(m, i) in matchs')
                            profile_thumbnail(
                                :user_id='m.from_id',
                                :is_notif='true',
                                :is_read='m.is_read',
                                :notif_id='m.id',
                                :img_src='serv_addr + "/uploads/" + m.avatar',
                                :firstname='m.firstname',
                                :lastname='m.lastname',
                                :age='m.age',
                                :bio='m.bio',
                                :city='m.city'
                                @mouseover.native='read_notif($event, m.id, i)')
                    .columns.is-multiline(v-else)
                        .column.no_notif(v-if='matchs.length < 1') You don't have any unmatch notification
                        .column.is-4(v-else, v-for='(u, i) in unmatchs')
                            profile_thumbnail(
                                :user_id='u.from_id',
                                :is_notif='true',
                                :is_read='u.is_read',
                                :notif_id='u.id',
                                :img_src='serv_addr + "/uploads/" + u.avatar',
                                :firstname='u.firstname',
                                :lastname='u.lastname',
                                :age='u.age',
                                :bio='u.bio',
                                :city='u.city'
                                @mouseover.native='read_notif($event, u.id, i)')
</template>

<script>
import base from '@/mixins/base.vue';
import profile_thumbnail from '@/components/profile_thumbnail.vue'
import { mapGetters } from 'vuex';

export default {
    mixins: [base],
    components: {
        profile_thumbnail
    },
    data () {
        return {
            serv_addr: process.env.VUE_APP_SERV_ADDR,
            visitusers: [],
            likeusers: [],
            matchusers: [],
            unmatchusers: [],
            state: '0'
        }
    },
    computed: {
        ...mapGetters([
            'visits',
            'likes',
            'matchs',
            'unmatchs'
        ])
    },
    created () {
        this.AjaxGet('/profile/visituser', true).then(res => {
            this.$store.dispatch('load_visits', res.visits);
        }).catch(err => {
            this.err_redirect();
        })
        this.AjaxGet('/profile/likeuser', true).then(res => {
            this.$store.dispatch('load_likes', res.likes);
        }).catch(err => {
            this.err_redirect();
        })
        this.AjaxGet('/profile/matchuser', true).then(res => {
            this.$store.dispatch('load_matchs', res.matchs);
        }).catch(err => {
            this.err_redirect();
        })
        this.AjaxGet('/profile/unmatchuser', true).then(res => {
            this.$store.dispatch('load_unmatchs', res.unmatchs);
        }).catch(err => {
            this.err_redirect();
        })
    },
    methods: {
        change_state(state) {
            this.state = state;
        },
        test () {
            this.$store.commit('PLUS_NOTIF', 'visit')
        },
        read_notif(event, notif_id, i) {
            if (this.state == 0 && !this.visits[i].is_read)
                this.set_notif_read(notif_id, this.visits[i]);
            if (this.state == 1 && !this.likes[i].is_read)
                this.set_notif_read(notif_id, this.likes[i]);
            if (this.state == 2 && !this.matchs[i].is_read)
                this.set_notif_read(notif_id, this.matchs[i]);
            if (this.state == 3 && !this.unmatchs[i].is_read)
                this.set_notif_read(notif_id, this.unmatchs[i]);
        },
        set_notif_read(notif_id, notif) {
            this.AjaxCall('/profile/readnotif', 'PUT', { id: notif_id }).then(res => {
                notif.is_read = 1;
                this.$store.dispatch('decrease_nb_notif');
            }).catch(err => {
                this.err_redirect();
            })
        },
        read_all_notifs() {
            this.AjaxGet('/profile/readallnotifs', true);
            this.$store.dispatch('set_nb_notifs', 0);
            this.$store.dispatch('read_all_notifs');
        },
    }
}
</script>

<style lang="scss">
    @import '@/assets/custom.scss';
    @import "~bulma/sass/utilities/_all";

    .hero-body {
        padding: 0;
    }

    .no_notif {
        color: $c-main-white;
    }

    .bodzer {
        height: 100vh;
    }

    .non-active {
        border-bottom: 1px solid $c-main;
    }

    .tabs {
        width: 100%;
        a {
            &:hover {
                transition: .5s;
            }
        }
    }

    .fa-circle {
        margin-left: 5px;
        height: 2px;
    }

    .fa {
        color: $c-main-lighter;
    }

    .read_notifs {
        width: 15em;
    }
</style>
