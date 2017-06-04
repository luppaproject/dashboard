import Vue from 'vue'
import ElementUI from 'element-ui'
import moment from 'moment'

import App from './App'
import router from './router'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.filter('truncate', (value, letterAmount) => {
  const LETTERS_COUNT = value.length

  if (letterAmount >= LETTERS_COUNT) {
    return value
  } else {
    const startLetters = value.substr(0, Number(letterAmount))
    const endLetters = value.substr(LETTERS_COUNT - 11)
    return `${startLetters}...${endLetters}`
  }
})

Vue.filter('moment', (value) => moment(value).format('DD/MM/YYYY'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
