<template lang="pug">
    .message_box(:class='display_user === dest_user ? "display_user" : "dest_user"') {{ message }}
</template>

<script>
export default {
    props: {
        message: String,
        display_user: Number,
        dest_user: Number
    }
}
</script>

<style lang="scss">
    @import '@/assets/custom.scss';

    .display_user {
        border-radius: 5px 5px 0 5px;
        right: 5px;
        color: $c-main-white;
        text-align: right;
        background-color: $c-main;
    }

    .dest_user {
        border-radius: 5px 5px 5px 0;
        left: 5px;
        color: $c-main-black;
        text-align: left;
        background-color: $c-main-white;
    }

</style>
