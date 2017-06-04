<template>
  <div class="discrepancy">
    <div id="chart" style="width:100%; height:400px;"></div>
    <section class="discrepancy-list">
        <el-card
          v-for="discrepancy in discrepancyList"
          :key="discrepancy.id"
          class="box-card">
          <h2 class="card-title">
            {{ discrepancy.name | truncate(15) }}
          </h2>
          <h2 class="card-entity">
            {{ discrepancy.entity }}
          </h2>
          <h3 class="card-percent">{{ discrepancy.score }}%</h3>
          <router-link class="el-button el-button--primary" :to="createALinkToDiscrepancy(discrepancy.id)">
            VER MAIS
          </router-linK>
        </el-card>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import Highcharts from 'highcharts'

export default {
  name: 'Discrepancy',
  data () {
    return {
      discrepancyList: []
    }
  },
  mounted () {
    axios.get('http://52.45.44.224/bidding/')
      .then(({ data }) => {
        console.log(data)
        this.discrepancyList = data
      })
      .catch(console.log)

    Highcharts.chart('chart', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Visão geral das licitações'
      },
      series: [{
        name: 'Compras',
        colorByPoint: true,
        data: [{
          name: 'Acima do valor',
          y: 30,
          color: '#e74c3c'
        }, {
          name: 'Neutras',
          y: 20,
          color: '#8caee0'
        }, {
          name: 'Abaixo do valor',
          y: 50
        }]
      }]
    })
  },
  methods: {
    createALinkToDiscrepancy (id) {
      return `/${id}`
    }
  }
}
</script>

<style lang="stylus">

.discrepancy
  display flex
  flex-direction column

  #chart
    margin-top 20px

  .discrepancy-list
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-between
    padding 20px 50px

    > .el-card
      flex-basis 300px
      margin-right 20px
      margin-bottom 20px

      .el-card__body
        display flex
        flex-direction column
        justify-content center
        align-items center

        .card-title
          color #8caee0
          font-size 20px
          text-align center

        .card-entity
          font-size 10px
          text-align center

        .card-percent
          color #888
          font-size 50px
          margin-top 20px
          margin-bottom 20px

        .el-button--primary
          background-color #8caee0
          border-color #8caee0
          text-decoration none
          color #fff !important

          &:hover
            box-shadow 0px 0px 10px 2px #ccc
</style>
