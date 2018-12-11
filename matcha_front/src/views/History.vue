<template lang="pug">
    .container.history
        transition-group(name='fade' mode='out-in' appear)
            .history(v-for='user in users' :key='user.id')
                    profile_thumbnail(
                        :user_id='user.user_id',
                        :img_src='serv_addr + "/uploads/" + user.avatar',
                        :firstname='user.firstname',
                        :lastname='user.lastname',
                        :city='user.city',
                        :age='user.age',
                        :bio='user.bio'
                    )
</template>

<script>
import base from '@/mixins/base.vue';
import profile_thumbnail from '@/components/profile_thumbnail.vue'

export default {
    mixins: [base],
    components: {
        profile_thumbnail
    },
    data () {
        return {
            serv_addr: process.env.VUE_APP_SERV_ADDR,
            users: []
        }
    },
    created () {
        this.AjaxGet('/profile/history', true).then(res => {
            if (res.hasOwnProperty('success'))
                this.users = res.visits;
            else
                this.$store.dispatch('notifDanger', res.err)
        }).catch(err => {
            this.serv_err();
            this.redirect_home();
        })
    }
}
</script>

<style lang="scss">
    .history {
        max-width: 600px;
    }
</style>
