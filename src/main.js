import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')

require('@/assets/stylus/style.styl') // ここは読み込みを行うファイルを指定する
