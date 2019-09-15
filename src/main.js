import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import VueSocketIO from "vue-socket.io";
import "ant-design-vue/dist/antd.css";
import VueAnimated from '@codekraft-studio/vue-animated'

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(VueAnimated)

Vue.use(
  new VueSocketIO({
    connection: "http://localhost:9999"
  })
);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
