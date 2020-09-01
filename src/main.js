import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import router from './router/router.js'

// 解析过滤器
import '@/util/filter.js';
// 注册时可以配置额外的选项
import { Lazyload , Toast} from "vant";

Vue.prototype.$toast = Toast;
Vue.use(Lazyload, {
  lazyComponent: true,
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
