<template lang="pug">
    .full-width
        .columns.is-multiline
            .column.is-4
                message_selector(
                    v-for='(c, i) in dests',
                    :user_id='c.user_id',
                    :firstname='c.firstname',
                    :lastname='c.lastname',
                    :img_src='serv_addr + c.avatar',
                    @click.native='load_msg(c.user_id)'
                )
            transition(name='slide-fadeX' mode='out-in' appear)
                .column.is-7.message_panel#msg_panel(v-if='conv_shown' ref='message_panel')
                    .columns.is-multiline
                        .message-display.columns.is-multiline
                            .column.is-12(v-for='m in conversations[conv_shown]')
                                .message-wrapper
                                    message_box(:message='m.message', :display_user='user_id', :dest_user='m.author')
                        form.send_bar.column.is-12.is-mobile(@submit.prevent='send_msg')
                            .columns
                                input.message_input.column.is-10.is-mobile(ref='send_msg_input' v-model='msg' type='text')
                                button.column.is-2.is-mobile.c-btn(type='submit' value='SEND')
                                    i.fas.fa-paper-plane
</template>

<script>
import base from '@/mixins/base.vue';
import message_selector from '@/components/message_selector.vue';
import message_box from '@/components/message_box.vue';

export default {
    mixins: [base],
    data () {
        return {
            serv_addr: process.env.VUE_APP_SERV_ADDR + '/uploads/',
            msg: '',
            dests: [],
            conversations: {},
            conv_shown: null,
            user_id: null
        }
    },
    components: {
        message_selector,
        message_box
    },
    mounted () {
        this.$socket.on('message', res => {
            if (this.$route.name !== 'messages')
                return;
            if (this.conv_shown === res.from)
                this.AjaxGet('/profile/readallmessagesfrom/' + res.from, true).then(res => {
                    this.notif_message();
                }).catch(err => {
                    this.err_redirect();
                });
            let user_id = res.from;
            let message = res.message;
            let conv = [];
            if (this.conversations[user_id] !== undefined)
                conv = this.conversations[user_id];
            else
                return;
            conv.push({ author: user_id, message });
            this.$set(this.conversations, user_id, conv);
        })
        this.$socket.on('notification', res => {
            if (res.type === 'U') {
                if (this.conv_shown === res.user_from)
                    this.conv_shown = null;
                this.dests = this.dests.filter(p => p.user_id !== res.user_from);
            }
            else if (res.type === 'M')
                this.dests.push({
                    avatar: this.serv_addr + res.user_info.avatar,
                    firstname: res.user_info.firstname,
                    lastname: res.user_info.lastname,
                    user_id: res.user_from
                })
        })
        this.AjaxGet('/profile/getmatchedusers/', true).then(res => {
            this.dests = res.matched.concat();
        }).catch(err => {
            this.err_redirect();
        })
        this.user_id = this.get_my_id();
    },
    methods: {
        send_msg () {
            if (this.msg == '')
                return;
            this.$socket.emit('message', { message: this.msg, dest: this.conv_shown });
            let conv = this.conversations[this.conv_shown];
            conv.push({ author: this.user_id, message: this.msg });
            this.$set(this.conversations, this.conv_shown, conv);
            this.msg = '';
            let el = document.querySelector('#msg_panel');
            el.scrollTop = el.scrollHeight;
            // console.log(this.$refs.message_panel.scrollTop)
            // console.log(this.$refs.message_panel.scrollHeight)
            // this.$refs['message_panel'].scrollTop = this.$refs['message_panel'].scrollHeight;
            // console.log(this.$refs.message_panel.scrollTop)
        },
        load_msg (id) {
            this.AjaxGet('/otherprofiles/message/' + id, true).then(res => {
                if (res.hasOwnProperty('err')) {
                    this.$refs.send_msg_input.disabled = true;
                    return this.$store.dispatch('notifWarning', res.err)
                }
                this.$set(this.conversations, id, res.messages);
                this.notif_message();
            }).catch(err => {
                console.log(err)
                this.err_redirect();
            })
            this.conv_shown = id;
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/custom.scss';

    .message_panel {
        position: relative;
        background-color: $c-main-black-light;
        height: 80vh;
        width: 100%;
        padding: 0;
    }

    .send_bar {
        position: absolute;
        bottom: 0;
        padding: 0;
        .message_input {
            color: $c-main-white;
            border: 0;
            background-color: $c-main-black-lighter;
        }
    }

    .message-display {
        overflow: scroll;
        overflow-x: hidden;
        height: 78vh;
        max-height: 78vh;
        width: 100%;
    }

    p {
        color: $c-main-white;
    }

    .message-wrapper {
        position: relative;
        margin: 3px 5px;
    }

    .message_input {
        &:disabled {
            cursor: not-allowed;
        }
    }
</style>
