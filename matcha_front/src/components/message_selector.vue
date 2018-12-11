<template lang="pug">
    .thumbnail.columns.is-mobile
        i.fas.fa-user-alt(@click='goto_profile(user_id)')
        .img_part.column.is-2.is-4-tablet
            img.is-center(:src='img_src')
        .info_part.column.is-10.is-8-tablet
            .name.text {{ firstname }} {{ lastname }}
</template>

<script>
export default {
    props: {
        user_id: {
            type: Number,
            default: 0
        },
        firstname: String,
        lastname: String,
        img_src: String
    },
    methods: {
        goto_profile (id) {
            if (id == 0)
                return this.$store.dispatch('notifWarning', 'Can\'t find user, you may have to refresh your app');
            this.$router.push('/user/' + id);
        }
    }
}
</script>


<style lang="scss" scoped>
    @import '@/assets/custom.scss';

    .thumbnail {
        position: relative;
        background-color: $c-main-black-light;
        height: 5em;
        color: $c-main-white;
        margin: 1px;
        .img_part {
            position: relative;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .info_part {
            padding: 0.5em;
        }
        .text {
            text-align: left;
        }
        .name {
            font-weight: bold;
            width: 100%;
            text-overflow: ellipsis;
            margin-bottom: 0em;
        }
        .age {
            font-size: .7em;
        }
        .msg {
            color: #888888;
            font-size: .6em;
            width: 100%;
            height: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &:hover {
            transition: 0.2s;
            background-color: $c-main-black-lighter;
            cursor: pointer;
        }
    }

    .fa-user-alt {
        position: absolute;
        border: 1px solid $c-main-white;
        padding: 2px;
        border-radius: 3px;
        top: 3px;
        right: 3px;
        color: $c-main-white;
        &:hover {
            color: $c-main-lighter;
            border-color: $c-main-lighter;
        }
    }
</style>
