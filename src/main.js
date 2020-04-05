import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "./request/http";
import api from "./request/api";
import { Message } from "element-ui";

Vue.config.productionTip = false;
Vue.prototype.$message = Message;
Vue.prototype.api = api;
Vue.prototype.http = http;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
