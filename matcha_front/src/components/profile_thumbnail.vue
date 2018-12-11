<template lang="pug">
    .thumbnail.columns.is-mobile(@click='goto_user', :class='suggested != 0 ? "glow" : ""')
        i(v-if='is_notif', :class='is_read == 0 ? "fa fa-circle fa-xs" : "far fa-circle fa-xs"')
        .img_part.column.is-2.is-4-tablet
            img.is-center(:src='img_src')
        .info_part.column.is-10.is-8-tablet
            .name.text {{ firstname }} {{ lastname }}
            .age.text from {{ city }}, {{ age }}
            .bio.text {{ bio }}
</template>

<script>
export default {
    props: {
        suggested: {
            type: Number,
            default: 0
        },
        like_me: {
            type: Number,
            default: 0
        },
        notif_id: {
            type: Number,
            default: null
        },
        is_notif: {
            type: Boolean,
            default: false
        },
        is_read: {
            type: Number,
            default: 0
        },
        user_id: {
            type: Number,
            default: null
        },
        img_src: {
            type: String,
            default: 'risitas.png'
        },
        firstname: String,
        lastname: String,
        city: String,
        age: Number,
        bio: String
    },
    methods: {
        goto_user () {
            if (this.user_id)
                this.$router.push('/user/' + this.user_id);
        }
    }
}
</script>


<style lang="scss" scoped>
    @import '@/assets/custom.scss';

    .thumbnail {
        position: relative;
        border: 1px solid $c-main-blacker;
        background-color: $c-main-black-light;
        max-height: 10em;
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
            padding: 0.1em;
        }
        .text {
            text-align: left;
        }
        .name {
            font-weight: bold;
            width: 100%;
            overflow: ellipsis;
            border-bottom: 1px solid #5e5f66;
            margin-bottom: 0em;
        }
        .age {
            font-size: .7em;
        }
        .bio {
            line-height: .8em;
            font-size: .8em;
            width: 100%;
            max-height: 2em;
            padding: 0.2em;
            word-wrap: break-word;
            overflow-y: auto;
            overflow-x: hidden;
        }
        &:hover {
            transition: 0.2s;
            background-color: $c-main-black-lighter;
            cursor: pointer;
        }
        .fa-circle {
            position: absolute;
            top: 3px;
            right: 3px;
        }
    }

    .glow {
        color: $c-main-black;
        background-color: #d6b626;
        &:hover {
            background-color: #e6c11f;
        }
    }
</style>