import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Routes from "./routes";
import { store } from "./store/store";
import Vue2TouchEvents from "vue2-touch-events";

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vue2TouchEvents);

const router = new VueRouter({
  routes: Routes,
  mode: "history"
}); // OBADAJ (podstrony..?)

new Vue({
  store: store,
  el: "#app",
  render: h => h(App),
  router: router
});
