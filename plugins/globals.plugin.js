import Vue from 'vue'
// import VueMarkdown from 'vue-markdown'

import DateFilter from '@/common/date.filter'
import MDateFilter from '@/common/mdate.filter'

Vue.filter('date', DateFilter)
Vue.filter('mdate', MDateFilter)
