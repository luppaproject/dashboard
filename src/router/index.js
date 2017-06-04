import Vue from 'vue'
import Router from 'vue-router'
import Discrepancy from '@/components/Discrepancy'
import DiscrepancyDetail from '@/components/DiscrepancyDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Discrepancy',
      component: Discrepancy
    },
    {
      path: '/:discrepancyDetail',
      name: 'DiscrepancyDetail',
      component: DiscrepancyDetail
    }
  ]
})
