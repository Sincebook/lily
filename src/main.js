import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import global_data from './config/Global_Data'//引用文件

Vue.prototype.GLOBAL = global_data;
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')