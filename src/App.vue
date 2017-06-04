<template>
  <div id="app">
    <header class="header">
      <h1 class="title">luppa</h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'LuppaApp'
}
</script>

<style lang="stylus">
*
  margin 0
  padding 0
  box-sizing border-box
  font-family 'Roboto', sans-serif

.header
  display flex
  align-items center
  background-color #8caee0
  height 80px

  .title
    color #fff
    padding-left 50px
</style>
