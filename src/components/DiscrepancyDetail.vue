<template lang="html">
  <div class="discrepancy-detail">

    <!-- START Detials -->
    <el-row>
      <el-col :span="12">
        <div class="grid-content overview">
          <h1 class="details-title">Informações gerais</h1>
          <h2 class="details-manufacturer">{{ discrepancyDetail.manufacturer }}</h2>
          <p class="details-date">{{ discrepancyDetail.requestAt | moment }}</p>

          <div class="price-box">
            <div class="price-box-real">
              R$ {{ discrepancyDetail.crawlerPrice }}
            </div>
            <div class="price-box-paid">
              R$ {{ discrepancyDetail.totalPrice }}
            </div>
          </div>

          <div v-if="voted" class="voted">VOTADO</div>
          <div class="button">
            <el-button @click="vote()" v-if="!voted" type="primary">VOTAR</el-button>
          </div>
        </div>
      </el-col>

      <!-- START Product specs -->
      <el-col :span="12">
        <div class="grid-content products">
          <h1 class="details-title">Produtos</h1>
          <div
            v-for="product in products"
            class="product-panel">
            <h1 class="product-panel-title">{{ product.productName | truncate(15) }}</h1>
            <p class="price">
              Preço individual real - R$ {{ product.crawlerPrice }}
            </p>
            <p class="price">
              Valor individual gasto - R$ {{ product.price }}
            </p>
          </div>
        </div>
      </el-col>
      <!-- END Product specs -->
    </el-row>
    <!-- END Details -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DiscrepancyDetail',
  data () {
    return {
      discrepancyDetail: {},
      products: [],
      voted: false
    }
  },
  mounted () {
    const { discrepancyDetail } = this.$route.params
    console.log(discrepancyDetail)
    const URL_REQUEST = `http://52.45.44.224/bidding/${discrepancyDetail}`
    axios.get(URL_REQUEST)
      .then(({ data }) => {
        this.discrepancyDetail = data
        this.products = this.discrepancyDetail.products
        console.log(this.products)
      })
      .catch(console.log)
  },
  methods: {
    vote () {
      this.voted = !this.voted
    }
  }
}
</script>

<style lang="stylus" scoped>
.discrepancy-detail
  padding 20px 50px

  .details-title
    color #8caee0
    border-bottom 1px solid #eee

  .details-manufacturer
    font-weight 300
    position relative
    margin-top 50px
    color #888
    font-size 16px

    &::before
      font-weight 600
      position absolute
      top -29px
      content "Manofaturado"
      background-color #f4f4f4
      padding 4px
      border-radius 5px

  .details-date
    font-weight 300
    position relative
    margin-top 40px
    color #888

    &::before
      font-weight 600
      position absolute
      top -29px
      content "Data"
      background-color #f4f4f4
      padding 4px
      border-radius 5px

.button
  display flex
  margin-top 100px

  > .el-button--primary
    flex-basis 100%
    height 60px
    font-size 30px
    background-color #8caee0
    border-color #8caee0
    text-decoration none
    color #fff !important

    &:hover
      box-shadow 0px 0px 10px 2px #ccc

.voted
  display flex
  margin-top 100px
  text-align center

.price-box
  display flex
  margin-top 40px
  justify-content space-around
  // border 1px solid red

  &-real
    position relative
    flex-basis 45%
    display flex
    align-items center
    justify-content center
    height 50px
    background-color #f4f4f4
    border-radius 5px
    color #444
    font-size 28px

    &::before
      font-weight 600
      position absolute
      font-size 13px
      top -25px
      left 0px
      content "Preço do mercado"
      background-color #f4f4f4
      border 1px solid #888
      padding 4px
      border-radius 5px

  &-paid
    position relative
    flex-basis 45%
    display flex
    align-items center
    justify-content center
    height 50px
    background-color #f4f4f4
    border-radius 5px
    color #444
    font-size 28px

    &::before
      font-weight 600
      position absolute
      font-size 13px
      top -25px
      left 0px
      content "Valor solicitado"
      background-color #f4f4f4
      border 1px solid #888
      padding 4px
      border-radius 5px

.products
  margin-left 50px

  > .details-title
    margin-bottom 25px

.product-panel
  background-color #f4f4f4
  border-radius 5px
  margin-top 10px
  margin-bottom 10px

  &-title
    font-size 16px
    color #888
    padding 10px

  .price
    font-size 16px
    color #888
    padding-left 10px
</style>
