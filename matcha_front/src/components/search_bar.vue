<template lang="pug">
        .component.columns.is-multiline.is-centered
            .filters.column.is-8
                .field
                    label Between {{ age_interval[0] }} - {{ age_interval[1] }} years old
                    vue_slider(v-model='age_interval', :min=18, :max=77, :tooltip='false')
                .field
                    label Popularity score between {{ pop_interval[0] }} - {{ pop_interval[1] }}
                    vue_slider(v-model='pop_interval', :min=0, :max=100, :tooltip='false')
                .field
                    label Until {{ dist_interval }}km away
                    vue_slider(v-model='dist_interval', :min=0, :max=100, :tooltip='false')
            .sort.column.is-4
                label Sort by :
                    .vertical-radio-buttons
                        div
                            span
                                input(type='radio' v-model='sort' value='age' id='age')
                                label(for='age') Age
                        div
                            span
                                input(type='radio' v-model='sort' value='dist' id='dist')
                                label(for='dist') Distance
                        div
                            span
                                input(type='radio' v-model='sort' value='pop' id='pop')
                                label(for='pop') Popularity
                        div
                            span
                                input(type='radio' v-model='sort' value='tags' id='tags')
                                label(for='tags') Tags
            button.column.is-4.reload.c-btn(@click='reload') RELOAD
</template>

<script>
import vue_slider from 'vue-slider-component';
import base from '@/mixins/base.vue'

export default {
    mixins: [base],
    components: {
        vue_slider
    },
    data () {
        return {
            age_interval: [18, 77],
            pop_interval: [0, 100],
            dist_interval: 100,
            sort: ''
        }
    },
    methods: {
        search_user() {
            let input = this.$refs.search_input.value;
            this.AjaxCall('users/profile', 'POST', { input }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        },
        autocomplete_users() {
            // get some user names to autocomplete
        },
        reload () {
            let data = {
                age: this.age_interval,
                pop: this.pop_interval,
                dist: this.dist_interval
            }
            this.AjaxCall('/users/profiles', 'POST', data).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>


<style lang="scss">
    .component {
        padding: 0;
        border-bottom: 1px solid grey;
        padding-bottom: 2em;
    }
    .search {
        padding: 0 4em;
        margin: 0 0 2em 0;
        .searchBar {
            width: 100%;
            .bar {
                width: 50%;
            }
            .btn {
                width: 10%;
            }
        }
    }

    .sort {
        // border: 1px solid grey;
        padding: 1em 1em 1em 4em;
    }

    .filters {
        max-width: 800px;
        padding: 0.5em 4em;
        // border: 1px solid grey;
    }

    input {
        border: 0;
    }

    label {
        color: #ffffff;
    }

    .vertical-radio-buttons div {
        display: block;
        padding: 0 0 5px 5px;
        clear: both;
    }

    .vertical-radio-buttons span {
        display: block;
        padding-left: 20px;
        cursor: inherit;
    }

    .vertical-radio-buttons label {
        padding: 0;
        font-size: rem-calc(16);
    }

    .vertical-radio-buttons input {
        float: left;
        width: 20px;
        margin-left: -20px;
        margin-top: 6px;
        padding: 0;
        -webkit-appearance: radio;
    }

</style>
