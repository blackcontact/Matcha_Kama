<template lang="pug">
  .full-width
    .container
      .component.is-centered
        .columns.is-multiline
            .filters.column.is-8
                .field
                    label Between {{ age_interval[0] }} - {{ age_interval[1] }} years old
                    vue_slider(v-model='age_interval', :min=18, :max=77, :tooltip='false', @click.native='search')
                .field
                    label Popularity score between {{ pop_interval[0] }} / {{ pop_interval[1] }}
                    vue_slider(v-model='pop_interval', :min=-10000, :max=10000, :tooltip='false', @click.native='search')
                .field
                    label Maximum {{ max_dist }}km away
                    vue_slider(v-model='max_dist', :min=0, :max=100, :tooltip='false', @click.native='search')
            .sort.column.is-4
                p Sort by :
                    .vertical-radio-buttons
                        div
                            span
                                input(type='radio', v-model='sort', value='age', id='age', :checked='sort == "age" ? "checked" : ""', @click='sort_it("age")')
                                label(for='age', @click='sort_it("age")') Age
                        div
                            span
                                input(type='radio' v-model='sort' value='distance' id='dist', :checked='sort == "distance" ? "checked" : ""', @click='sort_it("distance")')
                                label(for='dist', @click='sort_it("distance")') Distance
                        div
                            span
                                input(type='radio' v-model='sort' value='popularity' id='pop', :checked='sort == "popularity" ? "checked" : ""', @click='sort_it("popularity")')
                                label(for='pop', @click='sort_it("popularity")') Popularity
                        div
                            span
                                input(type='radio', v-model='sort', value='sameTags', id='tags', :checked='sort == "sameTags" ? "checked" : ""', @click='sort_it("sameTags")')
                                label(for='tags', @click='sort_it("sameTags")') Tags
    .container.resultats
        .suggested(v-if='suggested.length > 0')
            p.little-title SUGGESTED
            .columns.is-multiline
                .column.is-4(v-for='s in suggested')
                    profile_thumbnail(
                        :user_id='s.id'
                        :img_src='serv_addr + s.avatar',
                        :firstname='s.firstname',
                        :lastname='s.lastname',
                        :age='s.age',
                        :bio='s.bio',
                        :city='s.city',
                        :suggested='1'
                    )
        .results
            p.little-title RESULTS
            .columns.is-multiline
                .column.is-4(v-for='res in results')
                    profile_thumbnail(
                        :user_id='res.id'
                        :img_src='serv_addr + res.avatar',
                        :firstname='res.firstname',
                        :lastname='res.lastname',
                        :age='res.age',
                        :bio='res.bio',
                        :city='res.city'
                    )
</template>

<script>
import base from '@/mixins/base.vue';
import vue_slider from 'vue-slider-component';
import profile_thumbnail from '@/components/profile_thumbnail.vue';

export default {
  name: 'dashboard',
  mixins: [base],
  data () {
    return {
      age_interval: [18, 30],
      pop_interval: [0, 1000],
      max_dist: 20,
      sort: 'sameTags',
      results: [],
      suggested: [],
      serv_addr: process.env.VUE_APP_SERV_ADDR + '/uploads/'
    }
  },
  components: {
    vue_slider,
    profile_thumbnail
  },
  created () {
      if (localStorage.getItem('search_pref')) {
        let sp = JSON.parse(localStorage.getItem('search_pref'));
        if (sp.age_min >= 18 && sp.age_min <= 77
        && sp.age_max >= 18 && sp.age_max <= 77
        && sp.pop_min >= -10000 && sp.pop_min <= 10000
        && sp.pop_max >= -10000 && sp.pop_max <= 10000
        && sp.dist_max >= 0 && sp.dist_max <= 100) {
            this.age_interval[0] = sp.age_min;
            this.age_interval[1] = sp.age_max;
            this.pop_interval[0] = sp.pop_min;
            this.pop_interval[1] = sp.pop_max;
            this.max_dist = sp.dist_max;
        } else {
            localStorage.removeItem('search_pref');
        }
      }
      this.search();
  },
  methods: {
    search_user() {
        let input = this.$refs.search_input.value;
        this.AjaxCall('users/profile', 'POST', { input }).then(res => {
            return;
        }).catch(err => {
            console.log(err);
        })
    },
    search () {
        let data = {
            age_min: this.age_interval[0],
            age_max: this.age_interval[1],
            pop_min: this.pop_interval[0],
            pop_max: this.pop_interval[1],
            dist_max: this.max_dist
        }
        localStorage.setItem('search_pref', JSON.stringify(data));
        this.AjaxCall('/search', 'POST', data).then(res => {
            if (res.hasOwnProperty('err')) {
                this.$store.dispatch('notifDanger', res.err)
                return this.$router.push('/settings/profile')
            }
            this.results = res.result.filter(e => e != null);
            this.choose_suggested(this.results);
        }).catch(err => {
            console.log(err);
        })
    },
    choose_suggested(results) {
        this.suggested = [];
        let tmp = [];
        for (let i = 10; i > 0; i--) {
            for (let j = 0; j < results.length; j++) {
                if (results[j].sameTags >= i) {
                    tmp.push(results[j]);
                    results.splice(j, 1);
                    j--;
                }
            }
        }
        for (let h = 0; h <= 100; h += 10) {
            for (let k = 0; k < tmp.length && this.suggested.length < 6; k++) {
                if (tmp[k].distance <= h) {
                    this.suggested.push(tmp[k])
                    tmp.splice(k, 1);
                    k--;
                }
            }
        }
        while (tmp.length) {
            this.results.unshift(tmp[0])
            tmp.splice(0, 1);
        }
    },
    sort_it(crit) {
        this.suggested = this.sort_by(this.suggested, crit);
        this.results = this.sort_by(this.results, crit);
    },
    sort_by (ar, crit) {
        let fresh = [];
        let total = ar.length;
        for(let i = 0; i < total; i++) {
            let min = ar[0];
            let i_min = 0;
            for(let j = 1; j < ar.length; j++) {
                if (ar[j][crit] < min[crit]) {
                    min = ar[j];
                    i_min = j;
                }
            }
            fresh.push(min);
            ar.splice(i_min, 1);
        }
        return fresh;
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/custom.scss";

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

    .color-logo {
      margin: 0 4px;
    }

    .resultats {
        margin-top: 3em;
        margin-bottom: 3em;
    }

</style>